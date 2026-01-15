import {useDocumentContext} from "./useDocumentContext";
import {useDoc} from "./useDocument";
import {useMatch, useNavigate, useParams} from "react-router-dom";
import {useAPIErrorHandler, useForm, useNotification, useQueryParams} from "@strapi/strapi/admin";

import {CLONE_PATH, LIST_PATH} from "../router";
import {useDocumentActions} from "./useDocumentActions";
import {usePreviewContext} from "../preview/pages/Preview";
import {useUpdateDocumentMutation} from "../services/documents";
import {PUBLISHED_AT_ATTRIBUTE_NAME} from "../constants/attributes";
import {handleInvisibleAttributes} from "../pages/EditView/utils/data";
import {SINGLE_TYPES} from "../constants/collections";
import {isBaseQueryError} from "../utils/api";
import {transformData} from "../utils/actions";
import React from "react";
import { ActionHookResult, ActionHookProps } from './types';

/**
 * Functionality for publishing a new or modified document.
 */
const usePublishAction = ({
  activeTab,
  documentId,
  model,
  collectionType,
  meta,
  document
}: ActionHookProps): ActionHookResult | null => {
  const {
    currentDocument: {schema, components},
    currentDocumentMeta
  } = useDocumentContext('usePublishAction');
  const navigate = useNavigate();
  const {toggleNotification} = useNotification();
  const {_unstableFormatValidationErrors: formatValidationErrors} = useAPIErrorHandler();
  const {id} = useParams();

  const {publish, isLoading} = useDocumentActions();
  const onPreview = usePreviewContext('usePublishAction', (state) => state.onPreview, false);

  const [{rawQuery}] = useQueryParams();

  const modified = useForm('usePublishAction', ({modified}) => modified);
  const setSubmitting = useForm('usePublishAction', ({setSubmitting}) => setSubmitting);
  const isSubmitting = useForm('usePublishAction', ({isSubmitting}) => isSubmitting);
  const validate = useForm('usePublishAction', (state) => state.validate);
  const setErrors = useForm('usePublishAction', (state) => state.setErrors);
  const formValues = useForm('usePublishAction', ({values}) => values);
  const resetForm = useForm('usePublishAction', ({resetForm}) => resetForm);

  const idToPublish = currentDocumentMeta.documentId || id;



  const isDocumentPublished =
    (document?.[PUBLISHED_AT_ATTRIBUTE_NAME] ||
      meta?.availableStatus.some((doc) => doc[PUBLISHED_AT_ATTRIBUTE_NAME] !== null)) &&
    document?.status !== 'modified';

  // Define performPublish at hook scope (was previously nested incorrectly inside a useEffect)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const performPublish = async () => {
    setSubmitting(true);

    try {
      const {data: filteredData} = handleInvisibleAttributes(transformData(formValues), {
        schema,
        components,
      });
      const {errors} = await validate(true, {
        ...filteredData,
        status: 'published',
      });
      if (errors) {
        console.error('Form validation error:', errors)
        toggleNotification({
          type: 'danger',
          message: 'Please fix the form validation errors found before saving.',
        })
        return;
      }

      // filteredData is already used for validation, so use it for publishing as well
      const data = filteredData;
      const res = await publish(
        {
          collectionType,
          model,
          documentId,
          params: currentDocumentMeta.params,
        },
        data
      );

      // Reset form with current values as new initial values (clears errors/submitting and sets modified to false)
      if ('data' in res) {
        resetForm(formValues);
      }

      if ('data' in res && collectionType !== SINGLE_TYPES) {
        if (idToPublish === 'create') {
          navigate({
            pathname: `../${collectionType}/${model}/${res.data.documentId}`,
            search: rawQuery,
          });
        }
      }
        else if (
          'error' in res &&
          isBaseQueryError(res.error) &&
          res.error.name === 'ValidationError'
        ) {
          setErrors(formatValidationErrors(res.error));
        }
      }
    finally
      {
        setSubmitting(false);
        if (onPreview) {
          onPreview();
        }
      }
    };

    if (!schema?.options?.draftAndPublish) {
      return null;
    }
    return {
      label: 'Publish',
      onClick: async () => {
        await performPublish();
      },
      loading: isLoading,
      disabled:
        isSubmitting ||
        activeTab === 'published' ||
        (!modified && isDocumentPublished) ||
        (!modified && !document?.documentId),
      variant: 'default',
    }
  }

  export {usePublishAction};
