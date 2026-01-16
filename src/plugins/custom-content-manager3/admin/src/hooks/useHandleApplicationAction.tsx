import { useNavigate } from 'react-router-dom';
import {
  useForm,
  useNotification,
  useAPIErrorHandler,
  useQueryParams,
} from '@strapi/strapi/admin';

import { useDocumentContext } from './useDocumentContext';
import { useDocumentActions } from './useDocumentActions';
import { usePreviewContext } from '../preview/pages/Preview';
import {COLLECTION_TYPES, SINGLE_TYPES} from '../constants/collections';
import { handleInvisibleAttributes } from '../pages/EditView/utils/data';
import { isBaseQueryError } from '../utils/api';
import { transformData } from '../utils/actions';
import { ActionHookResult } from './types';
import {APPLICATION_STATUS, MEMBER_APPLICATION_MODEL} from "../constants/memberApplications";


/**
 * Hook for approving or rejecting member application. Similar to useUpdateAction
 */
const useHandleApplicationAction = (
  documentId: string | undefined,
  model: string,
) => {
  if (model !== MEMBER_APPLICATION_MODEL){
    console.error("This hook only applies to ", MEMBER_APPLICATION_MODEL)
    return null;
  }
  if (!documentId){
    console.error("DocumentId must be string ");
    return null;
  }
  const { toggleNotification } = useNotification();
  const { update, isLoading } = useDocumentActions();
  const {
    currentDocument: { components, schema, document: rawDocument },
    currentDocumentMeta,
  } = useDocumentContext('useHandleApplicationAction');
  console.log("rawDocument in useHandleApplicationAction",rawDocument);

  const isSubmitting = useForm('useHandleApplicationAction', ({ isSubmitting }) => isSubmitting);
  const setSubmitting = useForm('useHandleApplicationAction', ({ setSubmitting }) => setSubmitting);
  const initialValues = useForm('useHandleApplicationAction', ({ initialValues }) => initialValues);
  const document = useForm('useHandleApplicationAction', ({ values }) => values);
  const handleApprove = async (membershipTypeId: number, membershipTypeDocumentId: string, decision: 'approved' | 'rejected') => {
    setSubmitting(true);

    try {
      // Handle updating existing document
      if (documentId) {

        const { data } = handleInvisibleAttributes(transformData(document), {
          schema,
          initialValues,
          components,
        });
        if ('applicationStatus' in data){
          if (data['applicationStatus'] !== 'pending'){
            toggleNotification({
              type: "danger",
              message: `Only applications in 'pending' state can be approved or rejected. To manually add or remove members, use the membership list.`
            })
            return;
          }
          data['applicationStatus'] = decision;
          if (decision === 'approved'){
            data.member_type = {
              ...data.member_type,
              connect: [
                {
                  id: membershipTypeId,
                  documentId: membershipTypeDocumentId
                }
              ]
            }
          }
          const res = await update(
            {
              collectionType: COLLECTION_TYPES,
              model,
              documentId,
              params: currentDocumentMeta.params,
            },
            data
          );
          if (!('error' in res)){
            if (decision === 'rejected'){
              toggleNotification({
                type: "success",
                message: "Rejected member application"
              })
            } else {
              toggleNotification({
                type: "success",
                message: "Approved member application"
              })
            }
          }
        } else {
          console.error(`The field ${APPLICATION_STATUS} does not exist on the document data.`);
        }

      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    onClick: handleApprove,
    loading: isLoading,
    disabled: isSubmitting,
    variant: 'success',
  };
};

export { useHandleApplicationAction };
