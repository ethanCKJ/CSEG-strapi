import { Document } from '../hooks/useDocument';
type DiscardButtonProps = {
    activeTab: "active" | "published" | null;
    documentId: string;
    model: string;
    collectionType: string;
    document: Document;
};
/**
 * Discards changes made to a draft document. Does not delete it
 * @param activeTab
 * @param documentId
 * @param model
 * @param collectionType
 * @param document
 * @constructor
 */
declare const DiscardButton: ({ activeTab, documentId, model, collectionType, document }: DiscardButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export { DiscardButton };
