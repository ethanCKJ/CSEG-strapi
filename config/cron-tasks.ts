import type {Core} from '@strapi/strapi';

const CRON_INTERVAL = 10 // Minutes

/**
 * Input string is escaped to prevent XSS attacks.
 * Note the escaped string should not be used in <script> tags but can
 * be used in HTML body.
 */
const escapeHTML = (str: string | null | undefined) => {
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

export default {
  /**
   * Simple example.
   * Every monday at 1am.
   */

  myJob: {
    task: async ({strapi}: { strapi: Core.Strapi }) => {

      // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
      const now = new Date();
      const past = new Date();
      past.setHours(past.getHours() - 12)
      const scheduledEmailsToSend = await strapi.documents('api::scheduled-email.scheduled-email').findMany({
        filters: {
          sent: {
            $eq: false,
          },
          isSending: {
            $eq: false,
          },
          scheduledDatetime: {
            $between: [past.toISOString(), now.toISOString()]
          }
        }
      });
      if (Array.isArray(scheduledEmailsToSend) && scheduledEmailsToSend.length > 0) {
        console.log('Preparing to send', scheduledEmailsToSend.length, 'emails');
        for (const scheduledEmail of scheduledEmailsToSend) {
          for (const email of scheduledEmail.emails.split(",")) {
            try {
              await strapi.documents('api::scheduled-email.scheduled-email').update({
                documentId: scheduledEmail.documentId,
                data: {
                  isSending: true
                }
              });
              await strapi.plugin('email').service('email').send({
                to: email,
                subject: scheduledEmail.subject,
                html: escapeHTML(scheduledEmail.body).replace(/\r\n|\r|\n/g, "<br/>"),
              });
              console.log(`Successfully sent ${scheduledEmail.emailId} to ${scheduledEmail.emails}`)
              await strapi.documents('api::scheduled-email.scheduled-email').update({
                documentId: scheduledEmail.documentId,
                data: {
                  sent: true,
                }
              });
            } catch (e) {
              console.error('Unable to set email to sending', e);
              await strapi.documents('api::scheduled-email.scheduled-email').update({
                documentId: scheduledEmail.documentId,
                data: {
                  failedAttempts: scheduledEmail.failedAttempts + 1
                }
              });
            } finally {
              await strapi.documents('api::scheduled-email.scheduled-email').update({
                documentId: scheduledEmail.documentId,
                data: {
                  isSending: false,
                }
              });
            }

          }


        }
      }
    },
    options: {
      // rule: "10 * * * * *", // debugging
      rule: `0 ${CRON_INTERVAL} * * * *`,
    },
  },
};