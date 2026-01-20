import * as React from 'react';
import { useQueryParams, useNotification } from '@strapi/strapi/admin';
import { Cross, WarningCircle } from '@strapi/icons';
import { Flex, Typography, Radio } from '@strapi/design-system';
import {Document, useDoc} from './useDocument';
import { useDocumentActions } from './useDocumentActions';
import { buildValidParams } from '../utils/api';
import { SINGLE_TYPES } from '../constants/collections';
import { ActionHookResult, ActionHookProps } from './types';


const UNPUBLISH_DRAFT_OPTIONS = {
  KEEP: 'keep',
  DISCARD: 'discard',
};

/**
 * Hook for unpublish action with optional draft handling dialog
 *
 * Handles:
 * - Unpublishing documents
 * - Managing draft state when unpublishing modified documents
 * - Dialog for choosing whether to keep or discard draft changes
 *
 * @example
 * ```tsx
 * const unpublishAction = useUnpublishAction({
 *   activeTab: status,
 *   collectionType,
 *   document,
 *   documentId,
 *   meta,
 *   model
 * });
 *
 * if (!unpublishAction) {
 *   console.error('useUnpublishAction returned null');
 *   return null;
 * }
 *
 * // Use in a menu
 * <Menu.Item onSelect={unpublishAction.dialog?.open || unpublishAction.onClick}>
 *   {unpublishAction.label}
 * </Menu.Item>
 *
 * // Render the dialog if present
 * {unpublishAction.dialog && (
 *   <DocumentActionConfirmDialog
 *     isOpen={unpublishAction.dialog.isOpen}
 *     onClose={unpublishAction.dialog.close}
 *     onConfirm={unpublishAction.onClick}
 *     content={unpublishAction.dialog.content}
 *     variant={unpublishAction.variant}
 *   />
 * )}
 * ```
 */
const useUnpublishAction = (
  activeTab: string,
  collectionType: string,
  model: string,
  document?: Document,
  documentId?: string | undefined,
): ActionHookResult | null => {
  const { schema } = useDoc();
  const { unpublish } = useDocumentActions();
  const [{ query }] = useQueryParams();
  const params = React.useMemo(() => buildValidParams(query), [query]);
  const { toggleNotification } = useNotification();
  const [shouldKeepDraft, setShouldKeepDraft] = React.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const isDocumentModified = document?.status === 'modified';

  const handleChange = (value: string) => {
    setShouldKeepDraft(value === UNPUBLISH_DRAFT_OPTIONS.KEEP);
  };

  const handleUnpublish = async () => {
    /**
     * Return if there's no id & we're in a collection type
     */
    if (!documentId && collectionType !== SINGLE_TYPES) {
      console.error(
        "You're trying to unpublish a document without an id, this is likely a bug with Strapi. Please open an issue."
      );
      console.log("documentId", documentId, "collectionType", collectionType);

      toggleNotification({
        message: 'An error occurred while trying to unpublish the document.',
        type: 'danger',
      });
      return;
    }

    await unpublish(
      {
        collectionType,
        model,
        documentId,
        params,
      },
      !shouldKeepDraft
    );

    // Close dialog after unpublish
    setIsDialogOpen(false);
  };

  const handleClick = () => {
    // If document is modified, show dialog. Otherwise, unpublish directly.
    if (isDocumentModified) {
      setIsDialogOpen(true);
    } else {
      handleUnpublish();
    }
  };

  if (!schema?.options?.draftAndPublish) {
    return null;
  }

  const dialogContent = (
    <Flex alignItems="flex-start" direction="column" gap={6}>
      <Flex width="100%" direction="column" gap={2}>
        <WarningCircle width="24px" height="24px" fill="danger600" />
        <Typography tag="p" variant="omega" textAlign="center">
          Are you sure you want to unpublish this document?<br/>
          This draft is modified. Would you like to keep the modified draft
          or the version that was published?
        </Typography>
      </Flex>
      <Radio.Group
        defaultValue={UNPUBLISH_DRAFT_OPTIONS.KEEP}
        name="discard-options"
        aria-label="Choose an option to unpublish the document."
        onValueChange={handleChange}
      >
        <Radio.Item checked={shouldKeepDraft} value={UNPUBLISH_DRAFT_OPTIONS.KEEP}>
          Keep modified draft
        </Radio.Item>
        <Radio.Item checked={!shouldKeepDraft} value={UNPUBLISH_DRAFT_OPTIONS.DISCARD}>
          Replace draft with published version
        </Radio.Item>
      </Radio.Group>
    </Flex>
  );

  return {
    label: 'Unpublish',
    onClick: handleUnpublish,
    loading: false,
    disabled:
      activeTab === 'published' ||
      (document?.status !== 'published' && document?.status !== 'modified'),
    icon: <Cross />,
    variant: 'danger',
    dialog: {
      isOpen: isDialogOpen,
      open: handleClick,
      close: () => setIsDialogOpen(false),
      content: dialogContent,
    },
  };
};

export { useUnpublishAction };
