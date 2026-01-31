import * as React from 'react';

import {useFetchClient, useForm, useQueryParams,} from '@strapi/strapi/admin';
import {Button, Flex, MenuItem, Radio, SimpleMenu, Typography} from '@strapi/design-system';
import template from 'lodash/template'
import {InjectionZone} from '../../../components/InjectionZone';
import {Document, useDoc} from '../../../hooks/useDocument';

import type {DocumentActionProps, PanelComponent,} from '../../../content-manager';
import {PublishButton} from "../../../action-buttons/PublishButton";
import {UpdateButton} from "../../../action-buttons/UpdateButton";
import {useDeleteAction} from "../../../hooks/useDeleteAction";
import {DocumentActionConfirmDialog} from "../../../action-buttons/ActionHelper";
import {useUnpublishAction} from "../../../hooks/useUnpublishAction";
import {useDiscardAction} from "../../../hooks/useDiscardAction";
import {ApproveButton} from "../../../action-buttons/ApproveButton";
import {EVENT_MODEL, MEMBER_APPLICATION_MODEL} from "../../../constants/specialModels";
import {useSearchRelationsQuery} from "../../../services/relations";
import {RelationResult} from "../../../../../shared/contracts/relations";
import {RejectButton} from "../../../action-buttons/RejectButton";
import {SendEmailButton} from "../../../action-buttons/SendEmailButton";
import qs from "qs";

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
    content: <ActionsPanelContent/>,
  };
};

ActionsPanel.type = 'actions';

const ActionsPanelContent = () => {

  const [
    {
      query: {status = 'draft'},
    },
  ] = useQueryParams<{ status: 'draft' | 'published' }>();
  const {model, id, document, meta, collectionType} = useDoc();

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
      <InjectionZone area="editView.right-links" slug={model}/>
    </Flex>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Panel
 * -----------------------------------------------------------------------------------------------*/

interface PanelProps extends Pick<PanelDescription, 'title'> {
  children: React.ReactNode;
}

const Panel = React.forwardRef<any, PanelProps>(({children, title}, ref) => {
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
        <ActionsPanelContent/>
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


function renderLodashStyleTemplate(template: string, values: object) {
  return template.replace(
    /<%=\s*([\w.]+)\s*%>/g,
    (_, keyPath) => {
      return keyPath
      .split('.')
      .reduce((acc, key) => acc?.[key], values) ?? '';
    }
  );
}

const getOrdinal = (d: number) => {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
};
/**
 * Monday 26th January
 * @param date
 */
const formatDate = (date: Date) => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // Monday
  const monthName = date.toLocaleDateString('en-US', { month: 'long' }); // January
  const dayNumber = date.getDate(); // 26
  const suffix = getOrdinal(dayNumber); // th

  return `${dayName} ${dayNumber}${suffix} ${monthName}`;
};
/**
 * Monday 26th Jan, 12 pm
 * @param date
 */
const formatSubjectDate = (date: Date) => {
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];

  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? "pm" : "am";

  const suffix = getOrdinal(day);

  return `${dayName} ${day}${suffix} ${month}, ${hours12}${ampm}`;

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
                          }: StandardActionPanelProps) => {
  const deleteAction = useDeleteAction(documentId, model, collectionType);
  const unpublishAction = useUnpublishAction(status, collectionType, model, document, documentId);
  const discardAction = useDiscardAction(status, collectionType, model, document, documentId);
  const onChange = useForm("EventActionPanel", ({onChange}) => onChange);
  const formValues = useForm("EventActionPanel", ({values}) => values);
  const {get} = useFetchClient();

  // q4enok6b2tgm3td9l7voh4hk is event 7 days before
  // qoq891lngymb8o99jbtwat1e is on days of event before

  const emailTemplateName = ['q4enok6b2tgm3td9l7voh4hk', 'y4fjycg0agtpz4leq2qr74y6', 'qoq891lngymb8o99jbtwat1e']
  const daysBefore = [7, 3, 0];
  const DEFAULT_TIME = ['09:00:00']
  const [loadingTemplates, setLoadingTemplates] = React.useState<boolean>(false);

  const handleEmailTemplates = async () => {
    // Load email templates
    setLoadingTemplates(true);
    onChange('showDisableToggles', true);

    // Populate subject and dates
    const parsedEventDate = new Date(formValues.eventDate);
    // Extract and validate form values
    let title = '[Please insert title here]';
    if (typeof formValues.title === 'string' && formValues.title.trim() !== '') {
      title = formValues.title.trim();
    }

    let abstract = '[Please insert abstract here]';
    if (typeof formValues.abstract === 'string' && formValues.abstract.trim() !== '') {
      abstract = formValues.abstract.trim();
    }

    let eventDateRaw = null;
    let eventDate = '[Please insert date here]';
    if (typeof formValues.eventDate === 'string' && formValues.eventDate.trim() !== '') {
      const parsedDate = new Date(formValues.eventDate.trim());
      if (!isNaN(parsedDate.getTime())) {
        eventDate = formatDate(parsedDate);
        eventDateRaw = parsedDate;
      }
    }

    let eventStartTime = '[Please insert start time here]';
    if (typeof formValues.eventStartTime === 'string' && formValues.eventStartTime.trim() !== '') {
      eventStartTime = formValues.eventStartTime.trim().substring(0,5);
    }

    let eventEndTime = '[Please insert end time here]';
    if (typeof formValues.eventEndTime === 'string' && formValues.eventEndTime.trim() !== '') {
      eventEndTime = formValues.eventEndTime.trim().substring(0,5);
    }

    let speaker = '[Please insert speaker here]';
    if (typeof formValues.speaker === 'string' && formValues.speaker.trim() !== '') {
      speaker = formValues.speaker.trim();
    }

    let eventTypeFormatted = 'event';
    if (typeof formValues.eventType === 'string' && formValues.eventType.trim() !== '') {
      const trimmedType = formValues.eventType.trim();
      if (!trimmedType.toLowerCase().includes('other')) {
        eventTypeFormatted = trimmedType;
      }
    }

    let physicalLocation = '';
    if (typeof formValues.location === 'string' && formValues.location.trim() !== '') {
      physicalLocation = formValues.location.trim();
    }

    let teamsLink = '';
    if (typeof formValues.teamsLink === 'string' && formValues.teamsLink.trim() !== '') {
      teamsLink = formValues.teamsLink.trim();
    }

    let locationFormatted = '[Please enter location and microsoft teams link here]';
    if (physicalLocation && teamsLink) {
      locationFormatted = `hybrid - both in person in ${physicalLocation}, and online on MS Teams at ${teamsLink}`;
    } else if (physicalLocation) {
      locationFormatted = `in person in ${physicalLocation}`;
    } else if (teamsLink) {
      locationFormatted = `online on MS Teams at ${teamsLink}`;
    }

    for (let i = 0; i < emailTemplateName.length; i++) {
      onChange(`disableEmail${i+1}`, false);
      // Fill in default time to send emails as X days before eventDate at 9 am.
      if (!isNaN(parsedEventDate.getTime())) {
        const parsedEventDateCopy = new Date(parsedEventDate);
        parsedEventDateCopy.setDate(parsedEventDate.getDate()  - daysBefore[i]);
        parsedEventDateCopy.setHours(9,0,0,0);
        onChange(`emailDate${i+1}`, parsedEventDateCopy.toISOString());
      }
      onChange(`emailSubject${i+1}`, `${eventTypeFormatted} - ${eventDateRaw ? formatSubjectDate(eventDateRaw) : '[Please insert event date here]'} - ${title}`);
    }
    let templateName = '';
    try {
      for (let i = 0; i < emailTemplateName.length; i++) {
        // Fill in body using template
        templateName = emailTemplateName[i];
        const res = await get(`/content-manager/collection-types/api::text-email-template.text-email-template/${templateName}`);
        if (res.data.data && res.data.data.template){
          const textTemplate = res.data.data.template;

          // Format the location
          const result = renderLodashStyleTemplate(textTemplate, {
            abstract,
            eventDate,
            eventStartTime,
            eventEndTime,
            locationFormatted,
            eventTypeFormatted,
            title,
            speaker
          })
          onChange(`emailBody${i+1}`, result);
        } else {
          throw new Error('Template not found');
        }

      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error loading template', templateName, 'with message', message);
    } finally {
      setLoadingTemplates(false);
    }
  }


  return (
    <>
      {<Button onClick={handleEmailTemplates} loading={loadingTemplates}>Generate Email Templates</Button>}
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
const StandardActionPanel = ({
                               model,
                               documentId,
                               document,
                               status,
                               meta,
                               collectionType,
                             }: StandardActionPanelProps) => {
  const deleteAction = useDeleteAction(documentId, model, collectionType);
  const unpublishAction = useUnpublishAction(status, collectionType, model, document, documentId);
  const discardAction = useDiscardAction(status, collectionType, model, document, documentId);

  // Return the exact snippet requested by the user (inner Flex + dialogs)
  return (
    <>
      <Flex alignItems="center" width="100%" gap={8}>
        <Flex gap={2} justifyContent="center" alignItems="center" width={"50%"}>
          <PublishButton documentId={documentId} activeTab={status} model={model}
                         collectionType={collectionType} meta={meta} document={document}/>
          <UpdateButton activeTab={status} documentId={documentId} model={model}
                        collectionType={collectionType}/>
        </Flex>
        <SimpleMenu label={"More actions"} variant={"tertiary"}>
          <MenuItem onSelect={deleteAction.dialog?.open} variant={deleteAction.variant}
                    startIcon={deleteAction.icon}>{deleteAction.label}</MenuItem>
          {unpublishAction && <MenuItem onSelect={unpublishAction.dialog?.open}
                                        startIcon={unpublishAction.icon}>{unpublishAction.label}</MenuItem>}
          {discardAction &&
            <MenuItem onSelect={discardAction.dialog?.open} variant={discardAction.variant}
                      startIcon={discardAction.icon}>{discardAction.label}</MenuItem>}
        </SimpleMenu>
      </Flex>

      {deleteAction &&
        <DocumentActionConfirmDialog title={"Confirmation"} onClose={deleteAction.dialog.close}
                                     onConfirm={deleteAction.onClick}
                                     isOpen={deleteAction.dialog.isOpen}
                                     content={deleteAction.dialog.content} key={"delete"}/>}
      {unpublishAction &&
        <DocumentActionConfirmDialog title={"Confirmation"} onClose={unpublishAction.dialog.close}
                                     onConfirm={unpublishAction.onClick}
                                     isOpen={unpublishAction.dialog.isOpen}
                                     content={unpublishAction.dialog.content} key={"unpublish"}/>}
      {discardAction && <DocumentActionConfirmDialog title={discardAction.dialog?.title}
                                                     onClose={discardAction.dialog?.close}
                                                     onConfirm={discardAction.onClick}
                                                     isOpen={discardAction.dialog?.isOpen}
                                                     content={discardAction.dialog?.content}
                                                     key={"discard"}/>}
    </>
  );
};

interface MemberApplicationActionPanelProps {
  documentId: string | undefined,
  model: string
  document: Document
}

const Radios = ({memberTypes, documentId, model}: {
  memberTypes: RelationResult[],
  documentId: string | undefined,
  model: string
}) => {
  const [selectedMemberType, setSelectedMemberType] = React.useState<RelationResult>(memberTypes[0]);

  const handleGroupChange = (id: number) => {
    const found = memberTypes.find((mt) => mt.id === id);
    if (found) {
      setSelectedMemberType(found);
    }
  }
  return (
    <>
      <Radio.Group aria-label="member type" value={selectedMemberType.id}
                   onValueChange={handleGroupChange}>
        <Typography tag="label" variant="pi" fontWeight="bold">
          Select type of new member
        </Typography>
        {memberTypes.map((item) => (<Radio.Item key={item.id}
                                                value={item.id}>{item.membershipName || "Unknown membership type"}</Radio.Item>))}
      </Radio.Group>
      <Flex gap={2} justifyContent="center" alignItems="center" width={"50%"}>
        <ApproveButton documentId={documentId} model={model}
                       membershipTypeId={selectedMemberType.id}
                       membershipTypeDocumentId={selectedMemberType.documentId}/>
        <RejectButton documentId={documentId} model={model} membershipTypeId={selectedMemberType.id}
                      membershipTypeDocumentId={selectedMemberType.documentId}/>
      </Flex>
      <Flex alignItems="center" width="100%" gap={8}>
      </Flex>
    </>
  )
}

const MemberApplicationActionPanel = ({
                                        documentId,
                                        model,
                                        document
                                      }: MemberApplicationActionPanelProps) => {
  const {data, error, isLoading} = useSearchRelationsQuery({
    model: MEMBER_APPLICATION_MODEL,
    targetField: 'member_type',
    params: {
      pageSize: 100,
      page: 1
    }
  });
  if (isLoading || !data || !data.results) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Error loading member types.</div>
  }

  if (document.applicationStatus && document.applicationStatus !== 'pending') {
    return <Typography>No actions available. Application is
      already {document.applicationStatus}.</Typography>;
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
      query: {status = 'draft'},
    },
  ] = useQueryParams<{ status: 'draft' | 'published' }>();
  const {model, id: documentId, document, meta, collectionType} = useDoc();

  // Select action panel based on type of data (model).
  let panel: React.ReactNode;
  if (model === MEMBER_APPLICATION_MODEL) {
    panel =
      <MemberApplicationActionPanel documentId={documentId} model={model} document={document}/>
  } else if (model === EVENT_MODEL) {
    panel = <EventActionPanel model={model}
                              documentId={documentId}
                              document={document}
                              status={status}
                              meta={meta}
                              collectionType={collectionType}/>
  } else {
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

export {Panels, ActionsPanel, CustomPanel};
export type {PanelDescription};
