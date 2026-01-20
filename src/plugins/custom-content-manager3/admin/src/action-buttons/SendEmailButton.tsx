import * as React from 'react';
import { Button } from '@strapi/design-system';
import { useSendEmailAction } from '../hooks/useSendEmailAction';
import { DocumentActionConfirmDialog } from './ActionHelper';

type SendEmailButtonProps = {
  documentId?: string;
  model: string;
  collectionType: string;
};

/**
 * Send Email button component with confirmation dialog.
 * Uses `useSendEmailAction` hook for logic and state management.
 */
const SendEmailButton = ({ documentId, model, collectionType }: SendEmailButtonProps) => {
  const sendEmailAction = useSendEmailAction(documentId, model, collectionType);

  if (!sendEmailAction) {
    console.error('useSendEmailAction returned null');
    return null;
  }

  const { dialog } = sendEmailAction;

  return (
    <>
      <Button
        flex="auto"
        startIcon={sendEmailAction.icon}
        onClick={dialog ? dialog.open : sendEmailAction.onClick}
        justifyContent="center"
        variant={sendEmailAction.variant}
        paddingTop="7px"
        paddingBottom="7px"
        loading={sendEmailAction.loading}
        type="button"
        disabled={sendEmailAction.disabled}
      >
        {sendEmailAction.label}
      </Button>

      {dialog && (
        <DocumentActionConfirmDialog
          title={dialog.title}
          onClose={dialog.close}
          onConfirm={sendEmailAction.onClick}
          isOpen={dialog.isOpen}
          content={dialog.content}
        />
      )}
    </>
  );
};

export { SendEmailButton };
