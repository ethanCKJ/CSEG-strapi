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

  if (!deleteAction) {
    console.error('useDeleteAction returned null');
    return null;
  }

  return (
    <>
      <Button
        flex="auto"
        startIcon={deleteAction.icon}
        onClick={deleteAction.dialog.open}
        justifyContent="center"
        variant={deleteAction.variant}
        paddingTop="7px"
        paddingBottom="7px"
        loading={deleteAction.loading}
        type="button"
      >
        {deleteAction.label}
      </Button>

      <DocumentActionConfirmDialog
        isOpen={deleteAction.dialog.isOpen}
        title="Confirmation"
        content={deleteAction.dialog.content}
        variant={deleteAction.variant}
        onConfirm={deleteAction.onClick}
        onClose={deleteAction.dialog.close}
        loading={deleteAction.loading}
      />
    </>
  );
};

export { DeleteButton };
