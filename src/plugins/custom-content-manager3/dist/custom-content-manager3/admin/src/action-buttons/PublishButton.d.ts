import type { DocumentMetadata } from "../../../shared/contracts/collection-types";
import type { Document } from "../hooks/useDocument";
type PublishButtonProps = {
    activeTab: "draft" | "published" | null;
    collectionType: string;
    document?: Document;
    documentId?: string;
    meta?: DocumentMetadata;
    model: string;
};
declare const PublishButton: ({ documentId, model, collectionType, meta, document, activeTab }: PublishButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export { PublishButton };
