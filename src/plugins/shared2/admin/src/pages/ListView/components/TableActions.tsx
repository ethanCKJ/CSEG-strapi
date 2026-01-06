import * as React from 'react';

import {
  DescriptionComponentRenderer,
  useNotification,
  useStrapiApp,
  useQueryParams,
} from '@strapi/admin/strapi-admin';
import { Pencil } from '@strapi/icons';
import { stringify } from 'qs';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { useDocumentRBAC } from '../../../features/DocumentRBAC';
import { Document, useDoc } from '../../../hooks/useDocument';
import { DocumentActionsMenu } from '../../EditView/components/DocumentActions';
import { DEFAULT_HEADER_ACTIONS } from '../../EditView/components/Header';

import type {
  ContentManagerPlugin,
  DocumentActionComponent,
  DocumentActionProps,
} from '../../../content-manager';

/* -------------------------------------------------------------------------------------------------
 * TableActions
 * -----------------------------------------------------------------------------------------------*/

interface TableActionsProps {
  document: Document;
}

const TableActions = ({ document }: TableActionsProps) => {
  const { formatMessage } = useIntl();
  const { model, collectionType } = useDoc();
  const plugins = useStrapiApp('TableActions', (state) => state.plugins);

  const props: DocumentActionProps = {
    activeTab: null,
    model,
    documentId: document.documentId,
    collectionType,
    document,
  };

  // Safety check: if plugins is not available, return null or show fallback
  if (!plugins || !plugins['custom-content-manager']) {
    console.error('Custom Content Manager plugin not available in context');
    return null;
  }

  return (
    <DescriptionComponentRenderer
      props={props}
      descriptions={(plugins['custom-content-manager'].apis as ContentManagerPlugin['config']['apis'])
        .getDocumentActions('table-row')
        // We explicitly remove the PublishAction from description so we never render it and we don't make unnecessary requests.
        .filter((action) => action.name !== 'PublishAction')}
    >
      {(actions) => {
        const tableRowActions = actions.filter((action) => {
          const positions = Array.isArray(action.position) ? action.position : [action.position];
          return positions.includes('table-row');
        });

        return (
          <DocumentActionsMenu
            actions={tableRowActions}
            label={formatMessage({
              id: 'content-manager.containers.list.table.row-actions',
              defaultMessage: 'Row actions',
            })}
            variant="ghost"
          />
        );
      }}
    </DescriptionComponentRenderer>
  );
};

/* -------------------------------------------------------------------------------------------------
 * TableActionComponents
 * -----------------------------------------------------------------------------------------------*/

const EditAction: DocumentActionComponent = ({ documentId }) => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { canRead } = useDocumentRBAC('EditAction', ({ canRead }) => ({ canRead }));
  const { toggleNotification } = useNotification();
  const [{ query }] = useQueryParams<{ plugins?: object }>();

  return {
    disabled: !canRead,
    icon: <StyledPencil />,
    label: formatMessage({
      id: 'content-manager.actions.edit.label',
      defaultMessage: 'Edit',
    }),
    position: 'table-row',
    onClick: async () => {
      if (!documentId) {
        console.error(
          "You're trying to edit a document without an id, this is likely a bug with Strapi. Please open an issue."
        );

        toggleNotification({
          message: formatMessage({
            id: 'content-manager.actions.edit.error',
            defaultMessage: 'An error occurred while trying to edit the document.',
          }),
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

// Extract DeleteAction from DEFAULT_HEADER_ACTIONS
const DeleteAction = DEFAULT_HEADER_ACTIONS.find(action => action.type === 'delete')!;

const DEFAULT_TABLE_ROW_ACTIONS = [EditAction, DeleteAction];

export { TableActions, DEFAULT_TABLE_ROW_ACTIONS };
