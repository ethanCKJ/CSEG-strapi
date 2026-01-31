import { ActionHookResult, ActionHookProps } from './types';
/**
 * Functionality for publishing a new or modified document.
 */
declare const usePublishAction: ({ activeTab, documentId, model, collectionType, meta, document }: ActionHookProps) => ActionHookResult | null;
export { usePublishAction };
