type UpdateButtonProps = {
    activeTab: 'draft' | 'published' | null;
    documentId?: string;
    model: string;
    collectionType: string;
};
/**
 * Update (Save) button component with handler from `useUpdateAction`.
 * Mirrors the DeleteButton style but without a confirmation dialog.
 */
declare const UpdateButton: ({ activeTab, documentId, model, collectionType }: UpdateButtonProps) => import("react/jsx-runtime").JSX.Element | null;
export { UpdateButton };
