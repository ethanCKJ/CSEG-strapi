import * as React from 'react';
import { Button } from '@strapi/design-system';
import { useUpdateAction } from '../hooks/useUpdateAction';

type UpdateButtonProps = {
  activeTab: 'draft' | 'published' | null;
  documentId?: string;
  model: string;
  collectionType: string;
};

/**
 * Update (Save) button component with handler from `useUpdateAction`.
 * Mirrors the DeleteButton style but without a confirmation dialog.
 */
const UpdateButton = ({ activeTab, documentId, model, collectionType }: UpdateButtonProps) => {
  // Normalize nullable activeTab locally and pass it to the hook
  const nonNullActiveTab = activeTab ?? 'draft';
  const updateAction = useUpdateAction(nonNullActiveTab, documentId, model, collectionType);

  if (!updateAction) {
    console.error('useUpdateAction returned null');
    return null;
  }

  return (
    <Button
      flex="auto"
      startIcon={updateAction.icon}
      onClick={updateAction.onClick}
      justifyContent="center"
      variant={updateAction.variant}
      paddingTop="7px"
      paddingBottom="7px"
      loading={updateAction.loading}
      type="button"
      disabled={updateAction.disabled}
    >
      {updateAction.label}
    </Button>
  );
};

export { UpdateButton };
