import {Document, useDoc} from '../hooks/useDocument';
import {useDocumentActions} from "../hooks/useDocumentActions";
import {useQueryParams} from "@strapi/strapi/admin";
import React from "react";
import {buildValidParams} from "../utils/api";
import {Button, Flex, Typography} from "@strapi/design-system";
import {Cross, WarningCircle} from "@strapi/icons"
import {DocumentActionConfirmDialog} from "./ActionHelper";


type DiscardButtonProps = {
  activeTab: "active" | "published" | null,
  documentId: string,
  model: string,
  collectionType: string,
  document: Document
}

const DiscardButtonConfirmation = () => {
  return (
    <Flex direction="column" gap={2}>
      <WarningCircle width="24px" height="24px" fill="danger600" />
      <Typography tag="p" variant="omega" textAlign="center">
        Are you sure you want to discard the changes to this draft? This action is irreversible.
      </Typography>
    </Flex>
  )
}

/**
 * Discards changes made to a draft document. Does not delete it
 * @param activeTab
 * @param documentId
 * @param model
 * @param collectionType
 * @param document
 * @constructor
 */
const DiscardButton = ({
                         activeTab,
                         documentId,
                         model,
                         collectionType,
                         document
                       }: DiscardButtonProps) => {
  const {schema} = useDoc();
  const {discard, isLoading} = useDocumentActions();
  const [{query}] = useQueryParams();
  const params = React.useMemo(() => buildValidParams(query), [query]);
  const [isOpen, setIsOpen] = React.useState(false);

  if (!schema?.options?.draftAndPublish) {
    return null;
  }
  const disabled = activeTab === 'published' || document?.status !== 'modified';

  const handleClick = () => {
    setIsOpen(true);
  }

  const onConfirm = async () => {
    await discard({
      collectionType,
      model,
      documentId,
      params,
    });
  }

  return (
    <>
    <Button
      flex="auto"
      startIcon={Cross}
      disabled={disabled}
      onClick={handleClick}
      justifyContent="center"
      variant={'danger'}
      paddingTop="7px"
      paddingBottom="7px"
      loading={isLoading}
      type={'button'}
    >
      Discard changes
    </Button>
      <DocumentActionConfirmDialog
        isOpen={isOpen}
        title="Discard changes"
        content={<DiscardButtonConfirmation />}
        variant="danger"
        onConfirm={onConfirm}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}

export { DiscardButton };

