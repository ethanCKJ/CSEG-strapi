import * as React from 'react';
import { Button } from '@strapi/design-system';
import { useUpdateAction } from '../hooks/useUpdateAction';
import {MEMBER_APPLICATION_MODEL} from "../constants/specialModels";
import {useHandleApplicationAction} from "../hooks/useHandleApplicationAction";

type ApproveButtonProps = {
  documentId: string | undefined;
  model: string;
  membershipTypeId: number,
  membershipTypeDocumentId: string
};

/**
 * Approves member application.
 */
const  ApproveButton = ({ documentId, model, membershipTypeId, membershipTypeDocumentId }: ApproveButtonProps) => {
  // Normalize nullable activeTab locally and pass it to the hook

  const approveAction = useHandleApplicationAction(documentId, model)

  if (!approveAction) {
    console.error('useHandleApplicationAction returned null');
    return null;
  }

  return (
    <Button
      flex="auto"
      onClick={() => approveAction.onClick(membershipTypeId, membershipTypeDocumentId, 'approved')}
      justifyContent="center"
      variant={"success"}
      paddingTop="7px"
      paddingBottom="7px"
      loading={approveAction.loading}
      type="button"
      disabled={approveAction.disabled}
    >
      Approve application
    </Button>
  );
};

export { ApproveButton };
