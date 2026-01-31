import { ActionHookResult } from './types';
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
declare const useSendEmailAction: (documentId: string | undefined, model: string, collectionType: string) => ActionHookResult | null;
export { useSendEmailAction };
