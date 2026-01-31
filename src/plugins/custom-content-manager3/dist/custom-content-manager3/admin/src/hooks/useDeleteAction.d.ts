import { DeleteActionResult } from './types';
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
 * <Button onClick={deleteAction.dialog.open} variant={deleteAction.variant}>
 *   {deleteAction.label}
 * </Button>
 *
 * // Or in a menu
 * <Menu.Item onSelect={deleteAction.dialog.open}>
 *   {deleteAction.label}
 * </Menu.Item>
 *
 * // Render the dialog
 * <DocumentActionConfirmDialog
 *   isOpen={deleteAction.dialog.isOpen}
 *   onClose={deleteAction.dialog.close}
 *   onConfirm={deleteAction.onClick}
 *   content={deleteAction.dialog.content}
 *   variant={deleteAction.variant}
 * />
 * ```
 */
declare const useDeleteAction: (documentId: string | undefined, model: string, collectionType: string) => DeleteActionResult;
export { useDeleteAction };
