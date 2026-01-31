type DeleteButtonProps = {
    documentId: string;
    model: string;
    collectionType: string;
};
/**
 * Delete button component with confirmation dialog
 * Uses the useDeleteAction hook for all logic
 */
declare const DeleteButton: ({ documentId, model, collectionType }: DeleteButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export { DeleteButton };
