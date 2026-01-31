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
declare const useUpdateAction: (activeTab: ActiveTabType, documentId: string, model: string, collectionType: string) => ActionHookResult;
export { useUpdateAction };
