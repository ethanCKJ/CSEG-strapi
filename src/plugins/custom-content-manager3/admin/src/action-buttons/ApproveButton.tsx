import * as React from 'react';
import { Button } from '@strapi/design-system';
import { useUpdateAction } from '../hooks/useUpdateAction';
import {MEMBER_APPLICATION_MODEL} from "../constants/memberApplications";
import {useApproveAction} from "../hooks/useApproveAction";

type ApproveButtonProps = {
  documentId: string | undefined;
  model: string;
};

/**
 * Approves member application.
 */
const  ApproveButton = ({ documentId, model }: ApproveButtonProps) => {
  // Normalize nullable activeTab locally and pass it to the hook

  const approveAction = useApproveAction(documentId, model)

  if (!approveAction) {
    console.error('useApproveAction returned null');
    return null;
  }

  return (
    <Button
      flex="auto"
      onClick={approveAction.onClick}
      justifyContent="center"
      variant={"success"}
      paddingTop="7px"
      paddingBottom="7px"
      loading={approveAction.loading}
      type="button"
      disabled={approveAction.disabled}
    >
      {approveAction.label}
    </Button>
  );
};

export { ApproveButton };
