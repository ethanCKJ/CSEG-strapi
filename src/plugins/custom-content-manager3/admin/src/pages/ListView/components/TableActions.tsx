import * as React from 'react';

import {
  DescriptionComponentRenderer,
  useNotification,
  useStrapiApp,
  useQueryParams,
} from '@strapi/strapi/admin';
import {Button, IconButton, LinkButton, MenuItem, Modal, SimpleMenu} from '@strapi/design-system';
import {Duplicate, More, Pencil} from '@strapi/icons';
import { stringify } from 'qs';
import { NavLink, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { useDocumentRBAC } from '../../../features/DocumentRBAC';
import { Document, useDoc } from '../../../hooks/useDocument';
import { useDocumentActions } from '../../../hooks/useDocumentActions';
import { isBaseQueryError } from '../../../utils/api';
import { DocumentActionsMenu } from '../../EditView/components/DocumentActions';



import type { ProhibitedCloningField } from '../../../../../shared/contracts/collection-types';
import type {
  ContentManagerPlugin,
  DocumentActionComponent,
  DocumentActionProps,
} from '../../../content-manager';
import {DeleteButton} from "../../../action-buttons/DeleteButton";
import { Menu } from "@strapi/design-system";
import {useDeleteAction} from "../../../hooks/useDeleteAction";
import {DocumentActionConfirmDialog} from "../../../action-buttons/ActionHelper";
import {useEditAction} from "../../../hooks/useEditAction";

/* -------------------------------------------------------------------------------------------------
 * TableActions
 * -----------------------------------------------------------------------------------------------*/

interface TableActionsProps {
  document: Document;
}

const TableActions = ({ document }: TableActionsProps) => {
  const { model, collectionType } = useDoc();
  const deleteAction = useDeleteAction(document.documentId, model, collectionType);
  const editAction = useEditAction(document.documentId);

  if (!deleteAction) {
    console.error('useDeleteAction returned null');
    return null;
  }

  if (!editAction) {
    console.error('useEditAction returned null');
    return null;
  }

  return (
    <Menu.Root>
      <Menu.Trigger
        size="S"
        endIcon={null}
        paddingTop="4px"
        paddingLeft="7px"
        paddingRight="7px"
      >
        <More aria-hidden focusable={false} />
      </Menu.Trigger>
      <Menu.Content maxHeight={undefined} popoverPlacement="bottom-end">
            <Menu.Item
              display="block"
              onSelect={deleteAction.dialog.open}
              startIcon={deleteAction.icon}
              variant={deleteAction.variant}
            >
              {deleteAction.label}
            </Menu.Item>
        <Menu.Item
              display="block"
              onSelect={editAction.onClick}
              startIcon={editAction.icon}
            >
              {editAction.label}
            </Menu.Item>
      </Menu.Content>
        <DocumentActionConfirmDialog title={"Confirmation"} onClose={deleteAction.dialog.close} isOpen={deleteAction.dialog.isOpen} onConfirm={deleteAction.onClick} content={deleteAction.dialog.content}/>
    </Menu.Root>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TableActionComponents
 * -----------------------------------------------------------------------------------------------*/

const EditAction: DocumentActionComponent = ({ documentId }) => {
  const navigate = useNavigate();
  const { toggleNotification } = useNotification();
  const [{ query }] = useQueryParams<{ plugins?: object }>();

  return {
    icon: <StyledPencil />,
    label: "Edit",
    position: 'table-row',
    onClick: async () => {
      if (!documentId) {
        console.error(
          "You're trying to edit a document without an id, this is likely a bug with Strapi. Please open an issue."
        );

        toggleNotification({
          message: "An error occurred while trying to edit the document.",
          type: 'danger',
        });

        return;
      }

      navigate({
        pathname: documentId,
        search: stringify({
          plugins: query.plugins,
        }),
      });
    },
  };
};

EditAction.type = 'edit';
EditAction.position = 'table-row';

/**
 * Because the icon system is completely broken, we have to do
 * this to remove the fill from the cog.
 */
const StyledPencil = styled(Pencil)`
  path {
    fill: currentColor;
  }
`;

/**
 * Because the icon system is completely broken, we have to do
 * this to remove the fill from the cog.
 */
const StyledDuplicate = styled(Duplicate)`
  path {
    fill: currentColor;
  }
`;

const DEFAULT_TABLE_ROW_ACTIONS = [EditAction];

export { TableActions, DEFAULT_TABLE_ROW_ACTIONS };
