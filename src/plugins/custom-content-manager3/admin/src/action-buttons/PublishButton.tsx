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
  const nonNullActiveTab = activeTab ?? 'draft';
  const publishAction = usePublishAction(nonNullActiveTab, documentId, model, collectionType, meta, document);
  return (
    <Button
      flex="auto"
      startIcon={null}
      onClick={publishAction?.handlePublish}
      justifyContent="center"
      paddingTop="7px"
      paddingBottom="7px"
      loading={publishAction?.isPublishing}
      type="button"
      disabled={publishAction?.isPublishDisabled}
    >
      {publishAction?.publishLabel}
    </Button>
    )
}

export { PublishButton };
