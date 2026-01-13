import * as React from 'react';
import { Button } from '@strapi/design-system';
import { DocumentActionConfirmDialog } from './ActionHelper';
import { useDeleteAction } from '../hooks/useDeleteAction';

type DeleteButtonProps = {
  documentId: string;
  model: string;
  collectionType: string;
};

/**
 * Delete button component with confirmation dialog
 * Uses the useDeleteAction hook for all logic
 */
const DeleteButton = ({ documentId, model, collectionType }: DeleteButtonProps) => {
  const deleteAction = useDeleteAction(documentId, model, collectionType);

  return (
    <>
      <Button
        flex="auto"
        startIcon={deleteAction.deleteIcon}
        onClick={deleteAction.openDeleteDialog}
        justifyContent="center"
        variant={deleteAction.deleteVariant}
        paddingTop="7px"
        paddingBottom="7px"
        loading={deleteAction.isDeleting}
        type="button"
      >
        {deleteAction.deleteLabel}
      </Button>

      <DocumentActionConfirmDialog
        isOpen={deleteAction.isDeleteDialogOpen}
        title="Confirmation"
        content={deleteAction.deleteDialogContent}
        variant={deleteAction.deleteVariant}
        onConfirm={deleteAction.handleDelete}
        onClose={deleteAction.closeDeleteDialog}
        loading={deleteAction.isDeleting}
      />
    </>
  );
};

export { DeleteButton };
