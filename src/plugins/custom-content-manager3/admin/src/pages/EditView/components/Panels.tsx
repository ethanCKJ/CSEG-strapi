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
import {EVENT_MODEL, MEMBER_APPLICATION_MODEL} from "../../../constants/specialModels";
import {useLazySearchRelationsQuery, useSearchRelationsQuery} from "../../../services/relations";
import { Radio } from "@strapi/design-system";
import {RelationResult} from "../../../../../shared/contracts/relations";
import {RejectButton} from "../../../action-buttons/RejectButton";
import {Document} from "../../../hooks/useDocument";

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

/**
 * Actions for event data type
 */
const EventActionPanel = ({
  model,
  documentId,
  document,
  status,
  meta,
  collectionType,
}) => {
  return (
    <>
      <StandardActionPanel
        model={model}
        documentId={documentId}
        document={document}
        status={status}
        meta={meta}
        collectionType={collectionType}
      />
      <Typography>Special actions</Typography>
    </>
  )

}

/**
 * Actions for most data types except member applications and events
 */
const StandardActionPanel: React.FC<StandardActionPanelProps> = ({
  model,
  documentId,
  document,
  status,
  meta,
  collectionType,
}) => {
  const deleteAction = useDeleteAction(documentId, model, collectionType);
  const unpublishAction = useUnpublishAction(status, collectionType, model, document, documentId);
  const discardAction = useDiscardAction(status, collectionType, model, document, documentId);

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
  document: Document
}
const Radios = ({memberTypes, documentId, model}: {memberTypes: RelationResult[],
  documentId: string | undefined,
  model: string}) => {
  const [selectedMemberType, setSelectedMemberType] = React.useState<RelationResult>(memberTypes[0]);

  const handleGroupChange = (id: number) => {
    const found = memberTypes.find((mt) => mt.id === id);
    if (found){
      setSelectedMemberType(found);
    }
  }
  return (
    <>
      <Radio.Group aria-label="member type" value={selectedMemberType.id} onValueChange={handleGroupChange}>
        <Typography tag="label" variant="pi" fontWeight="bold">
          Select type of new member
        </Typography>
        {memberTypes.map((item) => (<Radio.Item key={item.id} value={item.id}>{item.membershipName || "Unknown membership type"}</Radio.Item>))}
      </Radio.Group>
      <Flex gap={2} justifyContent="center" alignItems="center" width={"50%"}>
        <ApproveButton documentId={documentId} model={model} membershipTypeId={selectedMemberType.id} membershipTypeDocumentId={selectedMemberType.documentId}/>
        <RejectButton documentId={documentId} model={model} membershipTypeId={selectedMemberType.id} membershipTypeDocumentId={selectedMemberType.documentId}/>
      </Flex>
      <Flex alignItems="center" width="100%" gap={8}>
      </Flex>
    </>
  )
}

const MemberApplicationActionPanel = ({documentId, model, document}: MemberApplicationActionPanelProps) => {
  const {data, error, isLoading} = useSearchRelationsQuery({
    model: MEMBER_APPLICATION_MODEL,
    targetField: 'member_type',
    params: {
      pageSize: 100,
      page:1
    }
  });
  if (isLoading || !data || !data.results){
    return <div>Loading...</div>
  } else if (error){
    return <div>Error loading member types.</div>
  }

  if (document.applicationStatus && document.applicationStatus !== 'pending'){
    return <Typography>No actions available. Application is already {document.applicationStatus}.</Typography>;
  }
  return (
    <>
      <Radios memberTypes={data.results} model={model} documentId={documentId}/>
    </>
  )
}

const CustomPanel = () => {
  const [
    {
      query: { status = 'draft' },
    },
  ] = useQueryParams<{ status: 'draft' | 'published' }>();
  const { model, id: documentId, document, meta, collectionType } = useDoc();

  // Select action panel based on type of data (model).
  let panel: React.ReactNode;
  if (model === MEMBER_APPLICATION_MODEL){
    panel = <MemberApplicationActionPanel documentId={documentId} model={model} document={document}/>
  }
  else if (model === EVENT_MODEL){
    panel = <EventActionPanel model={model}
                                 documentId={documentId}
                                 document={document}
                                 status={status}
                                 meta={meta}
                                 collectionType={collectionType}/>
  }
  else{
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
