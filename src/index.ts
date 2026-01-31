import type { Core } from '@strapi/strapi';
import {env} from "@strapi/utils";

/**
 * Input string is escaped to prevent XSS attacks.
 * Note the escaped string should not be used in <script> tags but can
 * be used in HTML body.
 * @param str
 */
const escapeHTML = (str: string | null| undefined) => {
  // .replace(/\r\n|\r|\n/g, "<br/>") Regex means replace all occurrances of CRLF OR CR OR LF with <br/>. CRLF is newline in windows
  // and LF is newline in modern unix/Mac.
  if (typeof str === 'string'){
    return str.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
  }
  return '';
}

/**
 * Collects mailing list emails based on event visibility settings.
 * @param strapi - Strapi instance
 * @param publicEvent - Whether the event is public
 * @param openToMemberTypes - Array of member-type objects with mailingList field (for non-public events)
 * @returns Comma-separated string of mailing list emails
 */
function collectTargetEmails(
  strapi: Core.Strapi,
  publicEvent: boolean,
  openToMemberTypes: Array<{ mailingList?: string | null }> | null,
  publicEventMailingLists: Array<{ mailingList?: string | null }> | null,
): string {
  let mailingLists: Array<{ mailingList?: string | null }> = [];

  if (publicEvent) {
    // Fetch ALL member types and their mailing lists
    const result = publicEventMailingLists;
    mailingLists = result;
  } else if (openToMemberTypes && openToMemberTypes.length > 0) {
    // Use the already-populated member types from open_to relation
    mailingLists = openToMemberTypes;
  }

  // Collect non-empty mailing list emails
  const emails = mailingLists
    .map(mt => mt.mailingList)
    .filter((email): email is string => !!email && email.trim() !== '');

  return emails.join(',');
}

/**
 * Syncs a single scheduled email slot based on event data.
 * @param strapi - Strapi instance
 * @param eventDocumentId - The event's documentId
 * @param slotNumber - 1, 2, or 3
 * @param disabled - Whether the email slot is disabled
 * @param subject - Email subject
 * @param body - Email body
 * @param scheduledDatetime - When to send the email
 * @param targetEmails - Comma-separated target emails
 */
async function syncScheduledEmailSlot(
  strapi: Core.Strapi,
  eventDocumentId: string,
  slotNumber: 1 | 2 | 3,
  disabled: boolean,
  subject: string | null | undefined,
  body: string | null | undefined,
  scheduledDatetime: string | Date | null | undefined,
  targetEmails: string
): Promise<void> {
  const emailId = `event-${eventDocumentId}-${slotNumber}`;

  // Convert Date to ISO string if needed
  const datetimeValue = scheduledDatetime instanceof Date
    ? scheduledDatetime.toISOString()
    : scheduledDatetime || new Date().toISOString();

  // Find existing scheduled email by emailId
  const existingEmails = await strapi.documents('api::scheduled-email.scheduled-email').findMany({
    filters: { emailId: { $eq: emailId } },
    fields: ['documentId', 'sent'],
  });

  const existingEmail = existingEmails.length > 0 ? existingEmails[0] : null;
  if (disabled || targetEmails.trim() === '') {
    // EMAIL IS DISABLED or all mailing lists were removed
    if (existingEmail && !existingEmail.sent) {
      // Delete unsent scheduled email
      await strapi.documents('api::scheduled-email.scheduled-email').delete({
        documentId: existingEmail.documentId,
      });
    }
    // If sent or doesn't exist, do nothing
  } else {
    // EMAIL IS ENABLED
    if (existingEmail) {
      if (!existingEmail.sent) {
        // Update existing unsent scheduled email
        await strapi.documents('api::scheduled-email.scheduled-email').update({
          documentId: existingEmail.documentId,
          data: {
            subject: subject || '',
            body: body || '',
            emails: targetEmails,
            scheduledDatetime: datetimeValue,
            isSending: false,
            failedAttempts: 0,
          },
        });
      }
      // If sent, leave it alone
    } else {
      // Create new scheduled email
      await strapi.documents('api::scheduled-email.scheduled-email').create({
        data: {
          targetDocumentId: eventDocumentId,
          targetModel: 'api::event.event',
          subject: subject || '',
          body: body || '',
          emails: targetEmails,
          scheduledDatetime: datetimeValue,
          emailId: emailId,
          sent: false,
          isSending: false,
          failedAttempts: 0,
        },
      });
    }
  }
}

/**
 * If member application is new, send email to organisers to view it
 * If application is approved, add member to membership list database (api::member.member)
 * @param context
 * @param strapi
 */
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
        // member_type may be a relation; preserve whatever structure came from the application data
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

/**
 * Send email to administrator to handle contact message
 * @param context
 * @param strapi
 */
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

/**
 * When an event is updated, sync scheduled emails based on email slot settings.
 * Creates, updates, or deletes scheduled-email records for each of the 3 email slots.
 */
async function handleEvent(context, next, strapi: Core.Strapi) {
  const eventDocumentId = context.params.documentId;

  // Execute the update first so we can fetch the complete persisted data
  const result = await next();

  try {
    // Fetch the updated event with relations to get complete data
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

    // Collect target emails based on visibility settings
    const openToMemberTypes = updatedEvent.open_to || [];
    const publicEventMailingLists = updatedEvent.public_event_mailing_lists || [];
    const targetEmails = await collectTargetEmails(
        strapi,
        updatedEvent.publicEvent,
        openToMemberTypes,
        publicEventMailingLists,
    );

    // Sync each of the 3 email slots
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
    // Log but don't fail the update operation
    strapi.log.error('Failed to sync scheduled emails for event:', error);
  }

  return result;
}

export default {
  /**
   * Document service middleware.
   * https://strapi.io/blog/what-are-document-service-middleware-and-what-happened-to-lifecycle-hooks-1
   */
  register({ strapi }: { strapi: Core.Strapi } ) {
    strapi.documents.use(async (context, next) => {
      // The api::member-application.member-application content type
      if (context.uid === 'api::member-application.member-application' && (context.action === 'update' || context.action === 'create')) {
        await handleMemberApplication(context, strapi);
      }

      if (context.uid === 'api::contact.contact' && context.action === 'create'){
        await handleContact(context, strapi);
      }

      if (context.uid === 'api::event.event' && (context.action === 'update' || context.action ===  'publish' || context.action === 'create')) {
        return await handleEvent(context, next, strapi);
      }

      return next();
    });

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
