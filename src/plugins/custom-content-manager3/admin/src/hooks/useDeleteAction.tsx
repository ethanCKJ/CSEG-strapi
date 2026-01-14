import * as React from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { useForm, useNotification } from '@strapi/strapi/admin';
import { Trash, WarningCircle } from '@strapi/icons';
import { Flex, Typography } from '@strapi/design-system';
import { useDocumentActions } from './useDocumentActions';
import { LIST_PATH } from '../router';
import { SINGLE_TYPES } from '../constants/collections';

/**
 * Return type for useDeleteAction hook
 * Provides everything needed to render a delete button and confirmation dialog
 */
type DeleteActionResult = {
  // Button properties
  deleteLabel: string;
  deleteIcon: React.ReactNode;
  deleteVariant: 'danger';

  // State
  isDeleting: boolean;
  isDeleteDialogOpen: boolean;

  // Dialog control
  openDeleteDialog: () => void;
  closeDeleteDialog: () => void;

  // Action handler
  handleDelete: () => Promise<void>;

  // Dialog content
  deleteDialogContent: React.ReactNode;
};

/**
 * Hook for delete action with confirmation dialog
 *
 * Handles:
 * - Delete API call via useDocumentActions
 * - Navigation after successful delete
 * - Form submitting state management
 * - Error handling and notifications
 * - Confirmation dialog state
 *
 * @example
 * ```tsx
 * const deleteAction = useDeleteAction(documentId, model, collectionType);
 *
 * // Use in a button
 * <Button onClick={deleteAction.openDeleteDialog} variant={deleteAction.deleteVariant}>
 *   {deleteAction.deleteLabel}
 * </Button>
 *
 * // Or in a menu
 * <Menu.Item onSelect={deleteAction.openDeleteDialog}>
 *   {deleteAction.deleteLabel}
 * </Menu.Item>
 *
 * // Render the dialog
 * <DocumentActionConfirmDialog
 *   isOpen={deleteAction.isDeleteDialogOpen}
 *   onClose={deleteAction.closeDeleteDialog}
 *   onConfirm={deleteAction.handleDelete}
 *   content={deleteAction.deleteDialogContent}
 *   variant={deleteAction.deleteVariant}
 * />
 * ```
 */
const useDeleteAction = (
  documentId: string,
  model: string,
  collectionType: string
): DeleteActionResult => {
  const navigate = useNavigate();
  const listViewPathMatch = useMatch(LIST_PATH);
  const { delete: deleteAction, isLoading } = useDocumentActions();
  const { toggleNotification } = useNotification();
  const setSubmitting = useForm('DeleteAction', (state) => state.setSubmitting);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  console.log("listViewPathMatch", listViewPathMatch);

  const handleDelete = async () => {
    /**
     * If we have a match, we're in the list view page
     * and therefore not in a form and shouldn't be
     * trying to set the submitting value.
     */
    if (!listViewPathMatch) {
      setSubmitting(true);
    }

    try {
      if (!documentId && collectionType !== SINGLE_TYPES) {
        console.error(
          "You're trying to delete a document without an id, this is likely a bug with Strapi. Please open an issue."
        );

        toggleNotification({
          message: 'An error occurred while trying to delete the document.',
          type: 'danger',
        });
        return;
      }

      const res = await deleteAction({
        documentId,
        model,
        collectionType,
        params: {
          locale: '*',
        },
      });

      if (!('error' in res)) {
        navigate({ pathname: `../${collectionType}/${model}` }, { replace: true });
      }
    } finally {
      if (!listViewPathMatch) {
        setSubmitting(false);
      }
      setIsDeleteDialogOpen(false);
    }
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };

  // Dialog content
  const deleteDialogContent = (
    <Flex direction="column" gap={2}>
    <WarningCircle width="24px" height="24px" fill="danger600" />
    <Typography tag="p" variant="omega" textAlign="center">
      Are you sure you want to delete this item? This action is irreversible.
    </Typography>
    </Flex>
  );


  return {
    deleteLabel: 'Delete item',
    deleteIcon: <Trash/>,
    deleteVariant: 'danger',
    isDeleting: isLoading,
    isDeleteDialogOpen,
    openDeleteDialog,
    closeDeleteDialog,
    handleDelete,
    deleteDialogContent,
  };
};

export { useDeleteAction };
