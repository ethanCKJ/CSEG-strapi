import type {Core} from '@strapi/strapi';
import {contactMiddleware} from "./utils/contact-middleware";
import {memberApplicationMiddleware} from "./utils/member-application-middleware";
import {eventNotificationMiddleware} from "./utils/document-service-middlewares";
import {handleEventICS} from "./utils/helper-functions";

// ============================================================================
// OLD CODE - COMMENTED OUT FOR REFERENCE
// Refactored into separate middleware files in src/utils/
// ============================================================================

/*
import {env} from "@strapi/utils";
import {collectTargetEmails, escapeHTML, syncScheduledEmailSlot} from "./utils/helper-functions";

async function handleMemberApplication(context, strapi: Core.Strapi) {
  const applicationData = context.params.data;
  if (context.action === 'update' && context.params.data.applicationStatus === 'approved') {
    await strapi.documents('api::member.member').create({
      data: {
        fullName: applicationData.fullName,
        preferredName: applicationData.preferredName ?? '',
        affiliations: applicationData.affiliations ?? '',
        email: applicationData.email ?? '',
        aboutYou: applicationData.aboutYou ?? '',
        topics: applicationData.topics ?? '',
        member_type: applicationData.member_type ?? undefined,
      }
    })
  } else if (context.action === 'create') {
    const subject = `CSEG Member application from ${escapeHTML(applicationData.fullName)}`
    const html = `Dear administrator,

Kindly review this membership application:

fullname: ${escapeHTML(applicationData.fullName)}

Preferred name: ${escapeHTML(applicationData.preferredName)}

Affiliations: ${escapeHTML(applicationData.affiliations)}

Email: ${escapeHTML(applicationData.email)}

About you: ${escapeHTML(applicationData.aboutYou)}

Topics of interest: ${escapeHTML(applicationData.topics)}

Please login to the Strapi admin panel to approve or reject this application.

Regards,
CSEG Website System`
    await strapi.plugin('email').service('email').send({
      to: env('MEMBER_APPLICATION_REVIEWER'),
      subject: subject,
      html: html.replace(/\r\n|\r|\n/g, "<br/>"),
    });
  }
}

async function handleContact(context, strapi: Core.Strapi) {
  const messageData = context.params.data;
  const subject = `CSEG Contact message from ${escapeHTML(messageData.name)}`
  const html = `Dear administrator,

You have received a new contact message:

Full name: ${escapeHTML(messageData.name)}

Email: ${escapeHTML(messageData.email)}

Subject: ${escapeHTML(messageData.subject)}

Message:
${escapeHTML(messageData.message)}

Do not reply to this email directly. Instead, kindly respond to the sender's email address
and mark the message as resolved in the admin panel.

Regards,
CSEG Website System`
  await strapi.plugin('email').service('email').send({
    to: env('CONTACT_MESSAGE_REVIEWER'),
    subject: subject,
    html: html.replace(/\r\n|\r|\n/g, "<br/>"),
  });
}

const escapeICSText = (str: string | null | undefined): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r\n|\r|\n/g, '\\n');
};

const foldICSLine = (line: string): string => {
  const maxLength = 75;
  if (line.length <= maxLength) return line;

  const parts: string[] = [];
  let remaining = line;
  let isFirst = true;

  while (remaining.length > 0) {
    const chunkLength = isFirst ? maxLength : maxLength - 1;
    const chunk = remaining.slice(0, chunkLength);
    parts.push(isFirst ? chunk : ' ' + chunk);
    remaining = remaining.slice(chunkLength);
    isFirst = false;
  }

  return parts.join('\r\n');
};

async function handleEventICS(documentId: string, strapi: Core.Strapi,
                              eventStartTime: string,
                              eventEndTime: string,
                              eventDate: string,
                              speaker: string,
                              abstract: string,
                              eventFormat: string,
                              location: string,
                              teamsLink: string,
                              title: string
                              ) {
  if (!eventStartTime || !eventEndTime || !eventDate || !title) {
    return;
  }
  const eventFormatLower = (eventFormat || '').toLowerCase();
  let locationFormatted: string;
  if (eventFormatLower.includes('hybrid')) {
    locationFormatted = `Hybrid: in person at ${location || 'TBA'} and online at ${teamsLink || 'TBA'}`;
  } else if (eventFormatLower.includes('online')) {
    locationFormatted = `Online at ${teamsLink || 'TBA'}`;
  } else if (eventFormatLower.includes('person')) {
    locationFormatted = `In person at ${location || 'TBA'}`;
  } else {
    locationFormatted = 'To Be Announced';
  }

  const description = `Speaker: ${speaker || 'TBA'}\n\nAbstract: ${abstract || 'TBA'}\n\nLocation: ${locationFormatted}`;

  const datePart = eventDate.split('T')[0];
  const startTimePart = eventStartTime.split('.')[0];
  const endTimePart = eventEndTime.split('.')[0];

  const startDateTime = new Date(`${datePart}T${startTimePart}Z`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDateTime = new Date(`${datePart}T${endTimePart}Z`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const currentTimestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CSEG//CSEG Events Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${documentId}@cseg.ed.ac.uk`,
    `DTSTAMP:${currentTimestamp}`,
    `DTSTART:${startDateTime}`,
    `DTEND:${endDateTime}`,
    `SUMMARY:${escapeICSText(title)}`,
    `DESCRIPTION:${escapeICSText(description)}`,
    `LOCATION:${escapeICSText(locationFormatted)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  const icsContent = lines.map(foldICSLine).join('\r\n');
  console.log('Generated ICS content:', icsContent);

  await strapi.documents('api::event.event').update({
    documentId: documentId,
    data: {
      ics: icsContent,
    },
  });
}

async function handleEvent(context, next, strapi: Core.Strapi) {
  const result = await next();
  const eventDocumentId = context.params.documentId || result.documentId;
  console.log('Handling event update for eventDocumentId:', eventDocumentId, 'action:', context.action);

  console.log('Event updated, syncing scheduled emails for eventDocumentId:', eventDocumentId, 'result:', result);

  try {
    const updatedEvent = await strapi.documents('api::event.event').findOne({
      documentId: eventDocumentId,
      populate: {
        open_to: {
          fields: ['documentId', 'mailingList'],
        },
        public_event_mailing_lists: {
          fields: ['documentId', 'mailingList'],
        }
      },
    });

    if (!updatedEvent) {
      return result;
    }

    const openToMemberTypes = updatedEvent.open_to || [];
    const publicEventMailingLists = updatedEvent.public_event_mailing_lists || [];
    const targetEmails = await collectTargetEmails(
        strapi,
        updatedEvent.publicEvent,
        openToMemberTypes,
        publicEventMailingLists,
    );

    await syncScheduledEmailSlot(
        strapi,
        eventDocumentId,
        1,
        updatedEvent.disableEmail1,
        updatedEvent.emailSubject1,
        updatedEvent.emailBody1,
        updatedEvent.emailDate1,
        targetEmails
    );

    await syncScheduledEmailSlot(
        strapi,
        eventDocumentId,
        2,
        updatedEvent.disableEmail2,
        updatedEvent.emailSubject2,
        updatedEvent.emailBody2,
        updatedEvent.emailDate2,
        targetEmails
    );

    await syncScheduledEmailSlot(
        strapi,
        eventDocumentId,
        3,
        updatedEvent.disableEmail3,
        updatedEvent.emailSubject3,
        updatedEvent.emailBody3,
        updatedEvent.emailDate3,
        targetEmails
    );
  } catch (error) {
    strapi.log.error('Failed to sync scheduled emails for event:', error);
  }

  if (context.action === 'update' || context.action === 'create') {
    const eventData = result;
    console.log(eventData);
    await handleEventICS(
        eventDocumentId,
        strapi,
        eventData.eventStartTime,
        eventData.eventEndTime,
        eventData.eventDate,
        eventData.speaker,
        eventData.abstract,
        eventData.eventFormat,
        eventData.location,
        eventData.teamsLink,
        eventData.title
    );
  }

  return result;
}
*/

// ============================================================================
// END OF OLD CODE
// ============================================================================

/**
 * Middleware to handle ICS file generation for events.
 * Generates calendar files after event creation/update.
 */
const eventICSMiddleware = () => {
  return async (context, next) => {
    // Only process events
    if (context.uid !== 'api::event.event') {
      return next();
    }

    // Only process create and update actions
    if (context.action !== 'create' && context.action !== 'update') {
      return next();
    }

    // Execute the create/update operation first
    const result = await next();

    // Extract documentId
    const documentId = context.params.documentId || result.documentId;

    if (!documentId) {
      strapi.log.warn('No documentId available for ICS generation');
      return result;
    }

    try {
      // Use result data if available, otherwise fetch fresh
      const eventData = result;

      await handleEventICS(
        documentId,
        strapi,
        String(eventData.eventStartTime || ''),
        String(eventData.eventEndTime || ''),
        String(eventData.eventDate || ''),
        String(eventData.speaker || ''),
        String(eventData.abstract || ''),
        String(eventData.eventFormat || ''),
        String(eventData.location || ''),
        String(eventData.teamsLink || ''),
        String(eventData.title || '')
      );
    } catch (error) {
      strapi.log.error('Failed to generate ICS file for event:', error);
      // Don't fail the operation if ICS generation fails
    }

    return result;
  };
};

export default {
  /**
   * Document service middleware.
   * https://strapi.io/blog/what-are-document-service-middleware-and-what-happened-to-lifecycle-hooks-1
   * https://docs.strapi.io/cms/api/document-service#method-overview (context.action options)
   * https://docs.strapi.io/cms/api/document-service/middlewares#context
   */
  register({ strapi }: { strapi: Core.Strapi } ) {
    // Register all middlewares using factory pattern
    strapi.documents.use(contactMiddleware());
    strapi.documents.use(memberApplicationMiddleware());
    strapi.documents.use(eventNotificationMiddleware());
    // strapi.documents.use(eventICSMiddleware());

    // OLD REGISTRATION CODE - COMMENTED OUT
    /*
    strapi.documents.use(async (context, next) => {
      if (context.uid === 'api::member-application.member-application' && (context.action === 'update' || context.action === 'create')) {
        await handleMemberApplication(context, strapi);
      }

      if (context.uid === 'api::contact.contact' && context.action === 'create'){
        await handleContact(context, strapi);
      }

      if (context.uid === 'api::event.event' && (context.action === 'update' ||  context.action === 'create')) {
        return await handleEvent(context, next, strapi);
      }

      return next();
    });
    */
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
