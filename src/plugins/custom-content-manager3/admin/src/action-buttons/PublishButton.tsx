import {usePublishAction} from "../hooks/usePublishAction";
import type {DocumentMetadata} from "../../../shared/contracts/collection-types";
import type { Document } from "../hooks/useDocument";
import {Button} from "@strapi/design-system";
import * as React from "react";

type PublishButtonProps = {
  activeTab: "draft" | "published" | null
  collectionType: string
  document?: Document
  documentId?: string
  meta?: DocumentMetadata
  model: string
};


const PublishButton = ({ documentId, model, collectionType, meta, document, activeTab }: PublishButtonProps) => {
  const publishAction = usePublishAction({
    activeTab: activeTab ?? 'draft',
    documentId,
    model,
    collectionType,
    meta,
    document,
  });

  if (!publishAction) {
    console.error('usePublishAction returned null');
    return null;
  }

  return (
    <Button
      flex="auto"
      startIcon={publishAction.icon}
      onClick={publishAction.onClick}
      justifyContent="center"
      paddingTop="7px"
      paddingBottom="7px"
      loading={publishAction.loading}
      type="button"
      disabled={publishAction.disabled}
      variant={publishAction.variant}
    >
      {publishAction.label}
    </Button>
    )
}

export { PublishButton };
