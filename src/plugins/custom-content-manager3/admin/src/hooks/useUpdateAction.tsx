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
import { SINGLE_TYPES } from '../constants/collections';
import { handleInvisibleAttributes } from '../pages/EditView/utils/data';
import { isBaseQueryError } from '../utils/api';
import { transformData } from '../utils/actions';
import { ActionHookResult } from './types';

type ActiveTabType = 'draft' | 'published';

/**
 * Hook for update/save action (simplified)
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
 * const updateAction = useUpdateAction('draft', documentId, model, collectionType);
 *
 * <Button
 *   onClick={updateAction.onClick}
 *   disabled={updateAction.disabled}
 *   loading={updateAction.loading}
 * >
 *   {updateAction.label}
 * </Button>
 * ```
 */
const useUpdateAction = (
  activeTab: ActiveTabType,
  documentId: string,
  model: string,
  collectionType: string
): ActionHookResult => {
  const navigate = useNavigate();
  const { toggleNotification } = useNotification();
  const { _unstableFormatValidationErrors: formatValidationErrors } = useAPIErrorHandler();
  const { create, update, isLoading } = useDocumentActions();
  const {
    currentDocument: { components, schema },
    currentDocumentMeta,
  } = useDocumentContext('UpdateAction');
  const [{ rawQuery }] = useQueryParams();
  const onPreview = usePreviewContext('UpdateAction', (state) => state.onPreview, false);

  const isSubmitting = useForm('UpdateAction', ({ isSubmitting }) => isSubmitting);
  const modified = useForm('UpdateAction', ({ modified }) => modified);
  const setSubmitting = useForm('UpdateAction', ({ setSubmitting }) => setSubmitting);
  const initialValues = useForm('UpdateAction', ({ initialValues }) => initialValues);
  const document = useForm('UpdateAction', ({ values }) => values);
  const validate = useForm('UpdateAction', (state) => state.validate);
  const setErrors = useForm('UpdateAction', (state) => state.setErrors);
  const resetForm = useForm('UpdateAction', ({ resetForm }) => resetForm);

  const handleUpdate = async () => {
    setSubmitting(true);

    try {
      // Early return if not modified
      if (!modified) {
        return;
      }

      // Validate with draft status
      const { errors } = await validate(true, {
        status: 'draft',
      });

      if (errors) {
        toggleNotification({
          type: 'danger',
          message: 'There are validation errors in your document. Please fix them before saving.',
        });
        return;
      }

      // Handle updating existing document
      if (documentId || collectionType === SINGLE_TYPES) {
        const { data } = handleInvisibleAttributes(transformData(document), {
          schema,
          initialValues,
          components,
        });
        const res = await update(
          {
            collectionType,
            model,
            documentId,
            params: currentDocumentMeta.params,
          },
          data
        );

        if ('error' in res && isBaseQueryError(res.error) && res.error.name === 'ValidationError') {
          setErrors(formatValidationErrors(res.error));
        } else {
          resetForm(document);
        }
      }
      // Handle creating new document
      else {
        const { data } = handleInvisibleAttributes(transformData(document), {
          schema,
          initialValues,
          components,
        });
        const res = await create(
          {
            model,
            params: currentDocumentMeta.params,
          },
          data
        );

        if ('data' in res && collectionType !== SINGLE_TYPES) {
          // Navigate to the newly created document
          navigate(
            {
              pathname: `../${res.data.documentId}`,
              search: rawQuery,
            },
            { replace: true, relative: 'path' }
          );
        } else if (
          'error' in res &&
          isBaseQueryError(res.error) &&
          res.error.name === 'ValidationError'
        ) {
          setErrors(formatValidationErrors(res.error));
        }
      }
    } finally {
      setSubmitting(false);

      // Trigger preview refresh if enabled
      if (onPreview) {
        onPreview();
      }
    }
  };

  return {
    label: 'Save draft',
    onClick: handleUpdate,
    loading: isLoading,
    disabled: isSubmitting || !modified || activeTab === 'published',
    variant: 'tertiary',
  };
};

export { useUpdateAction };
