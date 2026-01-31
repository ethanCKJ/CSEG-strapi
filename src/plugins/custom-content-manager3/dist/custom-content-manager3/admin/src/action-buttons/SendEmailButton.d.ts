type SendEmailButtonProps = {
    documentId?: string;
    model: string;
    collectionType: string;
};
/**
 * Send Email button component with confirmation dialog.
 * Uses `useSendEmailAction` hook for logic and state management.
 */
declare const SendEmailButton: ({ documentId, model, collectionType }: SendEmailButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export { SendEmailButton };
