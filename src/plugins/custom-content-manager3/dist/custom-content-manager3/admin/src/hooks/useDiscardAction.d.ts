import { Document } from "./useDocument";
import { ActionHookResult } from "./types";
declare const useDiscardAction: (activeTab: string, collectionType: string, model: string, document?: Document, documentId?: string | undefined) => ActionHookResult | null;
export { useDiscardAction };
