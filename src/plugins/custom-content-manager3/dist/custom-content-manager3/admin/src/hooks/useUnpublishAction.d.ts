import { Document } from './useDocument';
import { ActionHookResult } from './types';
/**
 * Hook for unpublish action with optional draft handling dialog
 *
 * Handles:
 * - Unpublishing documents
 * - Managing draft state when unpublishing modified documents
 * - Dialog for choosing whether to keep or discard draft changes
 *
 * @example
 * ```tsx
 * const unpublishAction = useUnpublishAction({
 *   activeTab: status,
 *   collectionType,
 *   document,
 *   documentId,
 *   meta,
 *   model
 * });
 *
 * if (!unpublishAction) {
 *   console.error('useUnpublishAction returned null');
 *   return null;
 * }
 *
 * // Use in a menu
 * <Menu.Item onSelect={unpublishAction.dialog?.open || unpublishAction.onClick}>
 *   {unpublishAction.label}
 * </Menu.Item>
 *
 * // Render the dialog if present
 * {unpublishAction.dialog && (
 *   <DocumentActionConfirmDialog
 *     isOpen={unpublishAction.dialog.isOpen}
 *     onClose={unpublishAction.dialog.close}
 *     onConfirm={unpublishAction.onClick}
 *     content={unpublishAction.dialog.content}
 *     variant={unpublishAction.variant}
 *   />
 * )}
 * ```
 */
declare const useUnpublishAction: (activeTab: string, collectionType: string, model: string, document?: Document, documentId?: string | undefined) => ActionHookResult | null;
export { useUnpublishAction };
