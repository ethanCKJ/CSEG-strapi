type RejectButtonProps = {
    documentId: string | undefined;
    model: string;
    membershipTypeId: number;
    membershipTypeDocumentId: string;
};
/**
 * Approves member application.
 */
declare const RejectButton: ({ documentId, model, membershipTypeId, membershipTypeDocumentId }: RejectButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export { RejectButton };
