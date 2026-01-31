import * as React from 'react';

import {useFetchClient, useForm, useQueryParams,} from '@strapi/strapi/admin';
import {Button, Flex, MenuItem, Radio, SimpleMenu, Typography} from '@strapi/design-system';
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
import qs from "qs";
import {
  extractFormString,
  extractlocationFormatted,
  extractValidDate,
  formatDate,
  formatSubjectDate,
  renderLodashStyleTemplate
} from "../utils/panelUtil";
import {useGetAllDocumentsQuery} from "../../../services/documents";
import { Accordion } from "@strapi/design-system";

interface PanelDescription {
  title: string;
  content: React.ReactNode;
}


/* -------------------------------------------------------------------------------------------------
 * Default Action Panels (CE)
 * -----------------------------------------------------------------------------------------------*/

/* -------------------------------------------------------------------------------------------------
 * Panel
 * -----------------------------------------------------------------------------------------------*/

interface PanelProps extends Pick<PanelDescription, 'title'> {
  children: React.ReactNode;
}
React.forwardRef<any, PanelProps>(({children, title}, ref) => {
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

interface StandardActionPanelProps {
  model: string;
  documentId?: string;
  document?: any;
  status: 'draft' | 'published';
  meta?: any;
  collectionType: string;
}

/**
 * Custom hook for fetching and rendering email templates
 */
const useEmailTemplates = () => {
  const { get } = useFetchClient();

  const fetchTemplate = async (
    templateName: string,
    variables: Record<string, string>
  ): Promise<string> => {
    // TODO: Consider replacing with useGetAllDocuments
    const query = qs.stringify({
      filters: {
        templateName: {
          $eq: templateName
        }
      }
    });

    const res = await get(`/content-manager/collection-types/api::text-email-template.text-email-template?${query}`);

    if (Array.isArray(res.data?.results) && res.data.results.length > 0 && res.data.results[0].template) {
      const textTemplate = res.data.results[0].template;
      return renderLodashStyleTemplate(textTemplate, variables);
    }

    throw new Error(`Template '${templateName}' not found`);
  };

  return { fetchTemplate };
};

/**
 * Wrapper around useGetAllDocumentsQuery to fetch scheduled emails
 * @param model - model sending the emails e.g. api::event.event
 * @param documentId
 * @param sequence
 */
const useScheduledEmails = (model: string, documentId: string, sequence: number[]) => {
  const modelName = model.substring(5, model.indexOf('.'));
  return useGetAllDocumentsQuery({
    model: 'api::scheduled-email.scheduled-email',
    params: {
      page: '1',
      pageSize: '100',
      filters: {
        emailId: {
          $in: sequence.map((num) => `${modelName}-${documentId}-${num}`),
        }
      },
      sort: 'scheduledDatetime:asc',
    }
  });
}

const ScheduledEmails = ({model, documentId}: {model: string, documentId: string | undefined}) => {
  if (!documentId) {
    return <Typography>No scheduled emails as document is not saved</Typography>
  }
  const {data, error, isLoading, refetch, isFetching} = useScheduledEmails(model, documentId, [1,2,3]);

  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return <Typography>Loading scheduled emails...</Typography>
  } else if (error) {
    return <Typography variant={"danger"}>Error loading scheduled emails.</Typography>
  } else if (Array.isArray(data?.results) && data.results.length === 0) {
    return (
      <Flex direction="column" gap={2} alignItems="start">
        <Typography>No scheduled emails found. Make sure you selected mailing lists or types of members allowed to attend</Typography>
        <Button onClick={handleRefresh} loading={isFetching} size="S" variant="secondary">
          Refresh
        </Button>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap={2} padding={2} alignItems="start" background="neutral100" width="100%">
      <Typography>Note you cannot disable an email that has already been sent. Disable emails using the toggles in the main form above</Typography>
      <Button onClick={handleRefresh} loading={isFetching} size="S">
        Refresh
      </Button>
      {data && data.results.map((email) => (
        <Flex key={email.id} direction="column" padding={2} borderColor="neutral150" borderWidth="1px" hasRadius  width={"100%"} alignItems="start">
          <Typography><strong>Subject:</strong> {email.subject}</Typography>
          <Typography><strong>Body:</strong> {email.body}</Typography>
          <Typography><strong>Scheduled Date:</strong> {new Date(email.scheduledDatetime).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })}</Typography>
          <Typography><strong>Scheduled emails:</strong> {email.emails.replace(',', ', ')}</Typography>
          <Typography><strong>Sent:</strong> {email.sent ? 'Yes' : 'No'}</Typography>
        </Flex>
      ))}
    </Flex>
  )
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
  const onChange = useForm("EventActionPanel", ({onChange}) => onChange);
  const formValues = useForm("EventActionPanel", ({values}) => values);
  const { fetchTemplate } = useEmailTemplates();
  const emailTemplateName = ['event-announcement-email', 'event-first-reminder-email', 'event-final-reminder-email']
  const daysBefore = [7, 3, 0];
  const [loadingTemplates, setLoadingTemplates] = React.useState<boolean>(false);

  const handleEmailTemplates = async () => {
    // Load email templates
    setLoadingTemplates(true);
    onChange('showDisableToggles', true);

    // Populate subject and dates
    const title = extractFormString(formValues.title, '[Please insert title here]');
    const abstract = extractFormString(formValues.abstract, '[Please insert abstract here]');

    const eventDateObj = extractValidDate(formValues.eventDate);
    const eventDateFormatted = eventDateObj ? formatDate(eventDateObj) : '[Please insert date here]';

    const eventStartTimeRaw = extractFormString(formValues.eventStartTime, '[Please insert start time here]');
    const eventStartTime = eventStartTimeRaw === '[Please insert start time here]'
      ? eventStartTimeRaw
      : eventStartTimeRaw.substring(0, 5);

    const eventEndTimeRaw = extractFormString(formValues.eventEndTime, '[Please insert end time here]');
    const eventEndTime = eventEndTimeRaw === '[Please insert end time here]'
      ? eventEndTimeRaw
      : eventEndTimeRaw.substring(0, 5);

    const speaker = extractFormString(formValues.speaker, '[Please insert speaker here]');

    let eventTypeFormatted = 'event';
    const eventTypeStr = extractFormString(formValues.eventType, '');
    if (eventTypeStr && !eventTypeStr.toLowerCase().includes('other')) {
      eventTypeFormatted = eventTypeStr;
    }

    const physicalLocation = extractFormString(formValues.location, '');
    const teamsLink = extractFormString(formValues.teamsLink, '');
    const eventFormat = extractFormString(formValues.eventFormat, '');
    let locationFormatted = extractlocationFormatted(eventFormat, physicalLocation, teamsLink);

    // Prepare template variables
    const templateVariables = {
      abstract,
      eventDate: eventDateFormatted,
      eventStartTime,
      eventEndTime,
      locationFormatted,
      eventTypeFormatted,
      title,
      speaker
    };

    for (let i = 0; i < emailTemplateName.length; i++) {
      onChange(`disableEmail${i+1}`, false);
      // Fill in default time to send emails as X days before eventDate at 9 am.
      if (eventDateObj) {
        const emailDate = new Date(eventDateObj);
        emailDate.setDate(eventDateObj.getDate() - daysBefore[i]);
        emailDate.setHours(9, 0, 0, 0);
        onChange(`emailDate${i+1}`, emailDate.toISOString());
      }
      // Fill in subject
      onChange(`emailSubject${i+1}`, `${eventTypeFormatted} - ${eventDateObj ? formatSubjectDate(eventDateObj) : '[Please insert event date here]'} - ${title}`);
    }

    try {
      for (let i = 0; i < emailTemplateName.length; i++) {
        const templateName = emailTemplateName[i];
        const result = await fetchTemplate(templateName, templateVariables);
        onChange(`emailBody${i+1}`, result);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error';
      console.error('Error loading email templates:', message);
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
      <Accordion.Root variant="primary">
        <Accordion.Item value="acc-01">
          <Accordion.Header>
            <Accordion.Trigger description="Your personal information">
              Show scheduled and sent emails (updated after saving document and refreshing)
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content padding={2}>
            <ScheduledEmails model={model} documentId={documentId} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion.Root>

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

export {CustomPanel};
