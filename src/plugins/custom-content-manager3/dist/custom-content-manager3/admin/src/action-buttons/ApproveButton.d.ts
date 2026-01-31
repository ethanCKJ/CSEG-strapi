type ApproveButtonProps = {
    documentId: string | undefined;
    model: string;
    membershipTypeId: number;
    membershipTypeDocumentId: string;
};
/**
 * Approves member application.
 */
declare const ApproveButton: ({ documentId, model, membershipTypeId, membershipTypeDocumentId }: ApproveButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export { ApproveButton };
