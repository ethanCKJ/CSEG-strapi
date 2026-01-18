import * as React from 'react';
import { Button } from '@strapi/design-system';
import { useUpdateAction } from '../hooks/useUpdateAction';
import {MEMBER_APPLICATION_MODEL} from "../constants/specialModels";
import {useHandleApplicationAction} from "../hooks/useHandleApplicationAction";

type RejectButtonProps = {
  documentId: string | undefined;
  model: string;
  membershipTypeId: number,
  membershipTypeDocumentId: string
};

/**
 * Approves member application.
 */
const  RejectButton = ({ documentId, model, membershipTypeId, membershipTypeDocumentId }: RejectButtonProps) => {
  // Normalize nullable activeTab locally and pass it to the hook

  const applicationAction = useHandleApplicationAction(documentId, model)

  if (!applicationAction) {
    console.error('useHandleApplicationAction returned null');
    return null;
  }

  return (
    <Button
      flex="auto"
      onClick={() => applicationAction.onClick(membershipTypeId, membershipTypeDocumentId, 'rejected')}
      justifyContent="center"
      variant={"danger"}
      paddingTop="7px"
      paddingBottom="7px"
      loading={applicationAction.loading}
      type="button"
      disabled={applicationAction.disabled}
    >
      Reject Application
    </Button>
  );
};

export { RejectButton };
