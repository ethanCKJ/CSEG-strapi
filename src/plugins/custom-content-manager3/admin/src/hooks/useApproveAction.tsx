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

type ActiveTabType = 'draft' | 'published';

/**
 * Hook for approving member application. Similar to useApproveAction
 *
 * Handles:
 * - Creating new documents
 * - Updating existing documents
 * - Form validation and error handling
 * - Navigation after successful operations
 * - Preview context integration
 *
 * @example
 * ```tsx
 * const useApproveAction = useApproveAction('draft', documentId, model, collectionType);
 *
 * <Button
 *   onClick={useApproveAction.onClick}
 *   disabled={useApproveAction.disabled}
 *   loading={useApproveAction.loading}
 * >
 *   {useApproveAction.label}
 * </Button>
 * ```
 */
const useApproveAction = (
  documentId: string | undefined,
  model: string,
): ActionHookResult | null => {
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
    currentDocument: { components, schema },
    currentDocumentMeta,
  } = useDocumentContext('useApproveAction');

  const isSubmitting = useForm('useApproveAction', ({ isSubmitting }) => isSubmitting);
  const setSubmitting = useForm('useApproveAction', ({ setSubmitting }) => setSubmitting);
  const initialValues = useForm('useApproveAction', ({ initialValues }) => initialValues);
  const document = useForm('useApproveAction', ({ values }) => values);

  const handleApprove = async () => {
    setSubmitting(true);

    try {
      // Handle updating existing document
      if (documentId) {
        const { data } = handleInvisibleAttributes(transformData(document), {
          schema,
          initialValues,
          components,
        });
        console.log("useApproveAction data",data)
        if ('applicationStatus' in data){
          if (data['applicationStatus'] !== 'pending'){
            toggleNotification({
              type: "warning",
              message: `Cannot approve application with status "${data['applicationStatus']}". Must be pending.`
            })
            return;
          }
        } else {
          console.error(`The field ${APPLICATION_STATUS} does not exist on the document data.`);
        }
          data['applicationStatus'] = 'approved';
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
          toggleNotification({
            type: "success",
            message: "Approved member application"
          })
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    label: 'Approve application',
    onClick: handleApprove,
    loading: isLoading,
    disabled: isSubmitting,
    variant: 'success',
  };
};

export { useApproveAction };
