import { get, isEmpty, transform } from 'lodash';
import { Event } from '@strapi/database/dist/lifecycles';
import { BaseAttribute,  } from '@strapi/database/dist/types';
import { errors } from '@strapi/utils';
import {Core} from "@strapi/strapi";

type Condition = {
  visible?: Comparator,
}
type Comparator = Partial<Record<"==" | "!==", [VarReference, boolean]>>
type VarReference = {
  var: string;
}
type Attribute = BaseAttribute & { fieldName: string };

type ExtendedBaseAttribute = BaseAttribute & {conditions? : Condition}
// This function will validate if the required relations are present
// based on https://github.com/teguru-labs/strapi-plugin-required-relation-field/blob/main/server/src/bootstrap.ts

async function validateRelations(event: Event, strapi: Core.Strapi) {
  const requiredRelations = transform(
      event.model.attributes,
      (acc: Attribute[], attr: ExtendedBaseAttribute, fieldName: string) => {


        if (attr.type === 'relation' && attr.required) {
          // This only works for visibility based on Boolean fields. Untested on Enumerations.
          if (attr.conditions && attr.conditions.visible) {
            // This field has a visibility condition. We ignore checking 'required' on not invisible fields
            if (attr.conditions.visible["=="]){
              const referencedConditionField = attr.conditions.visible["=="][0].var;
              if (event.params.data[referencedConditionField] === attr.conditions.visible["=="][1]){
                acc.push({ ...attr, fieldName });
              }
            } else if (attr.conditions.visible["!="]) {
              const referencedConditionField = attr.conditions.visible["!="][0].var;
              if (event.params.data[referencedConditionField] !== attr.conditions.visible["!="][1]){
                acc.push({ ...attr, fieldName });
              }
            }
          } else{
            // Field has no visibility condition. Always check 'required'
            acc.push({ ...attr, fieldName });

          }
        }
        return acc;
      },
      []
  );


  if (isEmpty(requiredRelations)) return;

  for (const relation of requiredRelations) {
    const { fieldName: field } = relation;
    const data = event.params.data[field];

    const failedMsg = `Please ensure that the '${field}' field is not left empty.`;
    const validationError = new errors.ValidationError(failedMsg, {
      errors: [
        {
          path: [field],
          message: 'This value is required.',
          type: 'ValidationError',
          value: null,
        },
      ],
    });

    // When creating/publishing, check if the relation is empty:
    const isEmptyOnCreate = event.action === 'beforeCreate' && isEmpty(get(data, 'connect'));
    const isEmptyOnPublish = event.action === 'beforeCreate' && isEmpty(get(data, 'set'));
    if (isEmptyOnCreate && isEmptyOnPublish) {
      throw validationError;
    }

    if (event.action === 'beforeUpdate') {
      // If there are no change in the relation, skip the validation
      if (isEmpty(get(data, 'connect')) && isEmpty(get(data, 'disconnect'))) {
        continue;
      }

      // Check the current number of records in the DB
      const existingEntry = await strapi.db
      .query(event.model.uid)
      .findOne({ where: event.params.where });

      const currentRelations = existingEntry?.[field] || [];
      const disconnecting = data.disconnect || [];
      const remainingCount = currentRelations.length - disconnecting.length;

      // If there are no remaining relations, and no new ones are being connected, throw an error
      if (remainingCount <= 0 && isEmpty(data.connect)) {
        throw validationError;
      }
    }
  }
}
export {validateRelations}