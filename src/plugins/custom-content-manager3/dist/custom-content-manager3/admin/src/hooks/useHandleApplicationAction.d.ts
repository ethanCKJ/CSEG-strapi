/**
 * Hook for approving or rejecting member application. Similar to useUpdateAction
 */
declare const useHandleApplicationAction: (documentId: string | undefined, model: string) => {
    onClick: (membershipTypeId: number, membershipTypeDocumentId: string, decision: 'approved' | 'rejected') => Promise<void>;
    loading: boolean;
    disabled: boolean;
    variant: string;
} | null;
export { useHandleApplicationAction };
