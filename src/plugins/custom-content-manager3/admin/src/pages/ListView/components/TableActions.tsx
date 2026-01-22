import * as React from 'react';

import {
  useQueryParams,
} from '@strapi/strapi/admin';
import {IconButton, Flex} from '@strapi/design-system';
import {Pencil, Trash} from '@strapi/icons';
import { stringify } from 'qs';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Document, useDoc } from '../../../hooks/useDocument';
import {useDeleteAction} from "../../../hooks/useDeleteAction";
import {DocumentActionConfirmDialog} from "../../../action-buttons/ActionHelper";
import {ContentType} from "../../../../../shared/contracts/content-types";

/* -------------------------------------------------------------------------------------------------
 * TableActions
 * -----------------------------------------------------------------------------------------------*/

interface TableActionsProps {
  document: Document;
  schema?: ContentType;
}

/**
 * Because the icon system is completely broken, we have to do
 * this to remove the fill from the pencil.
 */
const StyledPencil = styled(Pencil)`
  path {
    fill: currentColor;
  }
`;

const TableActions = ({ document, schema }: TableActionsProps) => {
  const { model, collectionType } = useDoc();
  const navigate = useNavigate();
  const [{ query }] = useQueryParams<{ plugins?: object }>();
  const deleteAction = useDeleteAction(document.documentId, model, collectionType);

  const handleEdit = () => {
    if (!document.documentId) {
      console.error(
        "You're trying to edit a document without an id, this is likely a bug with Strapi. Please open an issue."
      );
      return;
    }

    // If you enter EditViewPage without status=draft or status=published in the URL, the useDocumentContext.ts
    // may incorrectly attach relations meant for published to the draft document and vice versa leading to potential
    // database corruption. To avoid this, always pass the status param when navigating to the EditViewPage.
    const status = schema?.options?.draftAndPublish ? 'draft' : 'published';

    navigate({
      pathname: document.documentId,
      search: stringify({ status }),
    });
  };

  return (
    <>
      <Flex gap={2}>
        <IconButton
          onClick={handleEdit}
          label="Edit"
          variant="ghost"
        >
          <StyledPencil />
        </IconButton>
        <IconButton
          onClick={deleteAction.dialog.open}
          label={deleteAction.label}
          variant={deleteAction.variant}
        >
          {deleteAction.icon}
        </IconButton>
      </Flex>
      <DocumentActionConfirmDialog
        title={"Confirmation"}
        onClose={deleteAction.dialog.close}
        isOpen={deleteAction.dialog.isOpen}
        onConfirm={deleteAction.onClick}
        content={deleteAction.dialog.content}
      />
    </>
  );
};

export { TableActions };
