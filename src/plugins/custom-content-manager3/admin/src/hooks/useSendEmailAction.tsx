import * as React from 'react';
import {useFetchClient, useForm, useNotification} from '@strapi/strapi/admin';
import {Flex, Typography} from '@strapi/design-system';
import {Mail, WarningCircle} from '@strapi/icons';
import {useUpdateAction} from './useUpdateAction';
import {ActionHookResult} from './types';

type ActiveTabType = 'draft' | 'published';

/**
 * Hook for sending email notifications for a document. Hook returns
 * disabled=true on the /create page.
 *
 * This action:
 * - Saves the document first (using `useUpdateAction`)
 * - Sends email notifications via the API
 * - Shows a confirmation dialog with warning if emails were previously sent
 * - Handles loading states and errors
 *
 * @example
 * ```tsx
 * const sendEmailAction = useSendEmailAction('draft', documentId, model, collectionType);
 *
 * <Button
 *   onClick={sendEmailAction.dialog?.open}
 *   disabled={sendEmailAction.disabled}
 *   loading={sendEmailAction.loading}
 * >
 *   {sendEmailAction.label}
 * </Button>
 * ```
 */
const useSendEmailAction = (
  documentId: string | undefined,
  model: string,
  collectionType: string
): ActionHookResult | null => {
  const {post} = useFetchClient();
  const {toggleNotification} = useNotification();

  // Normalize nullable activeTab
  const updateAction = useUpdateAction('draft', documentId || '', model, collectionType);

  const [isMailDialogOpen, setIsMailDialogOpen] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);

  // Extract model name from format "api::event.event" -> "event"
  const modelSingular = model.substring(5, model.indexOf('.'));

  // Get form state
  const modified = useForm('sendEmailAction', ({modified}) => modified);
  const documentForm = useForm('sendEmailAction', ({values}) => values);
  const emailCount = (documentForm?.emailCount as number) || 0;
  // Early return if model parsing failed
  if (!modelSingular) {
    console.error('useSendEmailAction: Unable to parse model name from:', model);
    return null;
  }

  // Early return if updateAction is unavailable
  if (!updateAction) {
    console.error('useSendEmailAction: useUpdateAction returned null');
    return null;
  }

  /**
   * Handles the email send action:
   * 1. Saves the document if modified
   * 2. Sends email notifications via API
   * 3. Shows success/error notifications
   * 4. Closes dialog on success
   */
  const handleSend = async () => {
    setIsSending(true);
    if (modified) {
      await updateAction.onClick();
    }
    try {
      const res = await post(`/api/${modelSingular}/send-email`, {documentId})
      if ('data' in res) {
        toggleNotification({
          type: 'success',
          message: 'Successfully sent emails'
        })
        setIsMailDialogOpen(false);
      } else {
        throw new Error('An unknown error occurred sending emails')
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'An unknown error occurred sending emails';
      toggleNotification({
        type: 'danger',
        message: errorMsg
      })
    } finally {
      setIsSending(false);
    }
  };

  /**
   * Dialog content warning user about email send action
   */
  const sendEmailDialogContent = (
    <Flex direction="column" gap={3} alignItems="center">
      <WarningCircle width="24px" height="24px"/>
      <Typography tag="p" variant="omega" textAlign="center">
        Are you sure you want to send email notifications for this document?
      </Typography>
      {emailCount > 0 && (
        <Typography textColor="danger600" textAlign="center">
          You have previously sent {emailCount} notification(s).
          Are you sure you want to send more?
        </Typography>
      )}
      {modified && (
        <Typography textColor="neutral600" textAlign="center" variant="pi">
          Note: The document will be saved before sending emails.
        </Typography>
      )}
    </Flex>
  );

  return {
    label: 'Send notification emails',
    onClick: handleSend,
    loading: isSending || updateAction.loading,
    disabled: !documentId || isSending,
    icon: <Mail/>,
    variant: 'secondary',
    dialog: {
      isOpen: isMailDialogOpen,
      open: () => setIsMailDialogOpen(true),
      close: () => setIsMailDialogOpen(false),
      content: sendEmailDialogContent,
      title: 'Send Email Notifications',
    },
  };
};

export {useSendEmailAction};
