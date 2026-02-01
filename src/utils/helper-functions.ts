import type {Core} from "@strapi/strapi";

/**
 * Input string is escaped to prevent XSS attacks.
 * Note the escaped string should not be used in <script> tags but can
 * be used in HTML body.
 * @param str
 */
export const escapeHTML = (str: string | null | undefined) => {
  // .replace(/\r\n|\r|\n/g, "<br/>") Regex means replace all occurrances of CRLF OR CR OR LF with <br/>. CRLF is newline in windows
  // and LF is newline in modern unix/Mac.
  if (typeof str === 'string') {
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
 * @param publicEventMailingLists - Array of mailing-list objects for public events
 * @returns Comma-separated string of mailing list emails
 */
export function collectTargetEmails(
    strapi: Core.Strapi,
    publicEvent: boolean,
    openToMemberTypes: Array<{ mailingList?: string | null }> | null,
    publicEventMailingLists: Array<{ mailingList?: string | null }> | null,
): string {
  let mailingLists: Array<{ mailingList?: string | null }> = [];

  if (publicEvent) {
    // Use ONLY public event mailing lists for public events
    mailingLists = publicEventMailingLists || [];
  } else if (openToMemberTypes && openToMemberTypes.length > 0) {
    // Use ONLY open_to member types for non-public events
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
export async function syncScheduledEmailSlot(
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
    filters: {emailId: {$eq: emailId}},
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
 * Escapes text for ICS format according to RFC 5545.
 * Escapes backslashes, semicolons, commas, and converts newlines to \n
 */
export const escapeICSText = (str: string | null | undefined): string => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/\\/g, '\\\\')     // Escape backslashes first
    .replace(/;/g, '\\;')       // Escape semicolons
    .replace(/,/g, '\\,')       // Escape commas
    .replace(/\r\n|\r|\n/g, '\\n'); // Convert newlines to literal \n
};

/**
 * Folds long lines according to ICS spec (max 75 octets per line).
 * Continuation lines start with a space.
 */
export const foldICSLine = (line: string): string => {
  const maxLength = 75;
  if (line.length <= maxLength) return line;

  const parts: string[] = [];
  let remaining = line;
  let isFirst = true;

  while (remaining.length > 0) {
    const chunkLength = isFirst ? maxLength : maxLength - 1; // Account for leading space on continuation
    const chunk = remaining.slice(0, chunkLength);
    parts.push(isFirst ? chunk : ' ' + chunk);
    remaining = remaining.slice(chunkLength);
    isFirst = false;
  }

  return parts.join('\r\n');
};

/**
 * Generates ICS calendar file content for an event.
 * @param documentId - Event document ID
 * @param strapi - Strapi instance
 * @param eventStartTime - Event start time string
 * @param eventEndTime - Event end time string
 * @param eventDate - Event date string
 * @param speaker - Speaker name
 * @param abstract - Event abstract
 * @param eventFormat - Event format (hybrid/online/in-person)
 * @param location - Physical location
 * @param teamsLink - MS Teams link
 * @param title - Event title
 */
export async function handleEventICS(
  documentId: string,
  strapi: Core.Strapi,
  eventStartTime: string,
  eventEndTime: string,
  eventDate: string,
  speaker: string,
  abstract: string,
  eventFormat: string,
  location: string,
  teamsLink: string,
  title: string
): Promise<void> {
  if (!eventStartTime || !eventEndTime || !eventDate || !title) {
    // Missing essential data; skip ICS generation
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

  // Extract date part from ISO string (YYYY-MM-DD)
  // eventDate format: '2026-01-20T00:00:00.000Z'
  const datePart = eventDate.split('T')[0]; // '2026-01-20'

  // Extract time part from time strings (HH:MM:SS)
  // eventStartTime format: '02:15:00.000'
  const startTimePart = eventStartTime.split('.')[0]; // '02:15:00'
  const endTimePart = eventEndTime.split('.')[0]; // '09:30:00'

  // Combine date and time, then convert to ICS format (YYYYMMDDTHHMMSSZ)
  const startDateTime = new Date(`${datePart}T${startTimePart}Z`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const endDateTime = new Date(`${datePart}T${endTimePart}Z`).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const currentTimestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // Build ICS content with proper escaping and line folding
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

  // Apply line folding to each line and join with CRLF (ICS standard)
  const icsContent = lines.map(foldICSLine).join('\r\n');

  await strapi.documents('api::event.event').update({
    documentId: documentId,
    data: {
      ics: icsContent,
    },
  });
}

