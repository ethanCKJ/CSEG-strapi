import {Document, useDoc} from "./useDocument";
import {ActionHookResult} from "./types";
import {useDocumentActions} from "./useDocumentActions";
import {useQueryParams} from "@strapi/strapi/admin";
import React from "react";
import {buildValidParams} from "../utils/api";
import {Cross, WarningCircle, ArrowLeft} from "@strapi/icons";
import {Flex, Typography} from "@strapi/design-system";

const useDiscardAction = (
  activeTab: string,
  collectionType: string,
  model: string,
  document?: Document,
  documentId?: string | undefined,
): ActionHookResult | null => {
  const {schema} = useDoc();
  const {discard, isLoading} = useDocumentActions();
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = React.useState(false);
  const [{query}] = useQueryParams();
  const params = React.useMemo(() => buildValidParams(query), [query]);

  if (!schema?.options?.draftAndPublish) {
    return null;
  }
  return {
    disabled: activeTab === 'published' || document?.status !== 'modified',
    label: 'Discard modifications (replace current draft with published version)',
    icon: <ArrowLeft/>,
    variant: 'warning',
    loading: isLoading,
    dialog: {
      title: 'Confirmation',
      content: (
        <Flex direction="column" gap={2}>
          <WarningCircle width="24px" height="24px" fill="danger600"/>
          <Typography tag="p" variant="omega" textAlign="center">
            Are you sure you want to discard the changes made to this document?
          </Typography>
        </Flex>
      ),
      open: () => setIsDiscardDialogOpen(true),
      close: () => setIsDiscardDialogOpen(false),
      isOpen: isDiscardDialogOpen,
    },
    onClick: async () => {
      await discard({
        collectionType,
        model,
        documentId,
        params,
      });
    },

  }
}

export {useDiscardAction};
