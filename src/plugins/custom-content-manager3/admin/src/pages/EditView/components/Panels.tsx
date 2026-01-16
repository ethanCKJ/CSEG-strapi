import * as React from 'react';

import {
  useQueryParams,
} from '@strapi/strapi/admin';
import { Flex, Typography } from '@strapi/design-system';

import { InjectionZone } from '../../../components/InjectionZone';
import { useDoc } from '../../../hooks/useDocument';

import type {
  DocumentActionProps,
  PanelComponent,
} from '../../../content-manager';
import {PublishButton} from "../../../action-buttons/PublishButton";
import {UpdateButton} from "../../../action-buttons/UpdateButton";
import { SimpleMenu } from "@strapi/design-system";
import { MenuItem } from "@strapi/design-system";
import {useDeleteAction} from "../../../hooks/useDeleteAction";
import {DocumentActionConfirmDialog} from "../../../action-buttons/ActionHelper";
import {useUnpublishAction} from "../../../hooks/useUnpublishAction";
import {useDiscardAction} from "../../../hooks/useDiscardAction";
import {ApproveButton} from "../../../action-buttons/ApproveButton";
import {MEMBER_APPLICATION_MODEL} from "../../../constants/memberApplications";

interface PanelDescription {
  title: string;
  content: React.ReactNode;
}



/* -------------------------------------------------------------------------------------------------
 * Default Action Panels (CE)
 * -----------------------------------------------------------------------------------------------*/

const ActionsPanel: PanelComponent = () => {
  console.log("In ActionsPanel");
  return {
    title: 'Entry',
    content: <ActionsPanelContent />,
  };
};

ActionsPanel.type = 'actions';

const ActionsPanelContent = () => {

  const [
    {
      query: { status = 'draft' },
    },
  ] = useQueryParams<{ status: 'draft' | 'published' }>();
  const { model, id, document, meta, collectionType } = useDoc();

  const props = {
    activeTab: status,
    model,
    documentId: id,
    document: document,
    meta: meta,
    collectionType,
  } satisfies DocumentActionProps;

  return (
    <Flex direction="column" gap={2} width="100%" alignItems="stretch">
      <PublishButton {...props}/>
      <div>HASDFASDFAfd</div>
      <InjectionZone area="editView.right-links" slug={model} />
    </Flex>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Panel
 * -----------------------------------------------------------------------------------------------*/

interface PanelProps extends Pick<PanelDescription, 'title'> {
  children: React.ReactNode;
}

const Panel = React.forwardRef<any, PanelProps>(({ children, title }, ref) => {
  return (
    <Flex
      ref={ref}
      tag="aside"
      aria-labelledby="additional-information"
      background="neutral0"
      borderColor="neutral150"
      hasRadius
      paddingBottom={4}
      paddingLeft={4}
      paddingRight={4}
      paddingTop={4}
      shadow="tableShadow"
      gap={3}
      direction="column"
      justifyContent="stretch"
      alignItems="flex-start"
    >
      <Typography tag="h2" variant="sigma" textTransform="uppercase" textColor="neutral600">
        {title}
      </Typography>
      {children}
    </Flex>
  );
});

/* -------------------------------------------------------------------------------------------------
 * Panels
 * -----------------------------------------------------------------------------------------------*/
/**
 * Side panel of the EditViewPage
 * @constructor
 */
const Panels = () => {
  const description = {
    title: "Entry"
  }
  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      <Panel {...description}>
        <ActionsPanelContent />
      </Panel>
    </Flex>
  );
 };

interface StandardActionPanelProps {
  model: string;
  documentId?: string;
  document?: any;
  status: 'draft' | 'published';
  meta?: any;
  collectionType: string;
}

const StandardActionPanel: React.FC<StandardActionPanelProps> = ({
  model,
  documentId,
  document,
  status,
  meta,
  collectionType,
}) => {
  const deleteAction: any = useDeleteAction(documentId, model, collectionType) as any;
  const unpublishAction: any = useUnpublishAction(status, collectionType, model, document, documentId) as any;
  const discardAction: any = useDiscardAction(status, collectionType, model, document, documentId) as any;

  // Return the exact snippet requested by the user (inner Flex + dialogs)
  return (
    <>
      <Flex alignItems="center" width="100%" gap={8}>
        <Flex gap={2} justifyContent="center" alignItems="center" width={"50%"}>
          <PublishButton documentId={documentId} activeTab={status} model={model} collectionType={collectionType} meta={meta} document={document}/>
          <UpdateButton activeTab={status} documentId={documentId} model={model} collectionType={collectionType}  />
        </Flex>
        <SimpleMenu label={"More actions"} variant={"tertiary"} >
          <MenuItem onSelect={deleteAction.dialog?.open} variant={deleteAction.variant} startIcon={deleteAction.icon}>{deleteAction.label}</MenuItem>
          {unpublishAction && <MenuItem onSelect={unpublishAction.dialog?.open}  startIcon={unpublishAction.icon}>{unpublishAction.label}</MenuItem>}
          {discardAction && <MenuItem onSelect={discardAction.dialog?.open} variant={discardAction.variant} startIcon={discardAction.icon}>{discardAction.label}</MenuItem>}
        </SimpleMenu>
      </Flex>

      {deleteAction && <DocumentActionConfirmDialog title={"Confirmation"} onClose={deleteAction.dialog.close} onConfirm={deleteAction.onClick} isOpen={deleteAction.dialog.isOpen} content={deleteAction.dialog.content} key={"delete"}/>}
      {unpublishAction &&  <DocumentActionConfirmDialog title={"Confirmation"} onClose={unpublishAction.dialog.close} onConfirm={unpublishAction.onClick} isOpen={unpublishAction.dialog.isOpen} content={unpublishAction.dialog.content} key={"unpublish"}/> }
      {discardAction && <DocumentActionConfirmDialog title={discardAction.dialog?.title} onClose={discardAction.dialog?.close} onConfirm={discardAction.onClick} isOpen={discardAction.dialog?.isOpen} content={discardAction.dialog?.content} key={"discard"}/> }
    </>
  );
};
interface MemberApplicationActionPanelProps {
  documentId: string | undefined,
  model: string
}
const MemberApplicationActionPanel = ({documentId, model}: MemberApplicationActionPanelProps) => {
  return (
    <Flex alignItems="center" width="100%" gap={8}>
      <Flex gap={2} justifyContent="center" alignItems="center" width={"50%"}>
        <ApproveButton documentId={documentId} model={model}/>
      </Flex>
    </Flex>
  )
}

const CustomPanel = () => {
  const [
    {
      query: { status = 'draft' },
    },
  ] = useQueryParams<{ status: 'draft' | 'published' }>();
  const { model, id: documentId, document, meta, collectionType } = useDoc();

  let panel: React.ReactNode;
  if (model === MEMBER_APPLICATION_MODEL){
    panel = <MemberApplicationActionPanel documentId={documentId} model={model}/>
  } else{
    panel = <StandardActionPanel
      model={model}
      documentId={documentId}
      document={document}
      status={status}
      meta={meta}
      collectionType={collectionType}
    />
  }

  return (
    <Flex
      tag="aside"
      aria-labelledby="additional-information"
      background="neutral0"
      borderColor="neutral150"
      hasRadius
      paddingBottom={4}
      paddingLeft={4}
      paddingRight={4}
      paddingTop={4}
      shadow="tableShadow"
      gap={3}
      direction="column"
      justifyContent="stretch"
      alignItems="flex-start"
    >
      <Typography tag="h2" variant="sigma" textTransform="uppercase" textColor="neutral600">
        Actions
      </Typography>
      {panel}
    </Flex>
  );
};

export { Panels, ActionsPanel, CustomPanel };
export type { PanelDescription };
