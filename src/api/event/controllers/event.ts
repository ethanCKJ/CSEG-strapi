/**
 * event controller
 */

import {factories} from '@strapi/strapi'

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

export default factories.createCoreController('api::event.event', ({strapi}) => ({
      /**
       * Sends email for event to every mailing list in emailTarget fields
       * @param ctx
       */
  async sendEmail(ctx) {
    console.log(ctx.request.body);
    // try {
    //   const {documentId} = ctx.request.body;
    //   if (!documentId){
    //     return ctx.badRequest('ID is required');
    //   }
    //
    //   // Get event from database
    //   const event = await strapi.documents('api::event.event').findOne({
    //     documentId,
    //     status: 'draft',
    //     fields: ["emailSubject","emailBody", "emailCount", "emailTarget1", "emailTarget2", "emailTarget3", "emailTarget4"]
    //   });
    //   const targetEmails = [event.emailTarget1, event.emailTarget2, event.emailTarget3, event.emailTarget4].filter(Boolean);
    //   if (targetEmails.length === 0){
    //     return ctx.badRequest('No target emails found for this event');
    //   } else if (!event.emailSubject){
    //     return ctx.badRequest('Email subject required');
    //   } else if (!event.emailBody){
    //     return ctx.badRequest('Email content required');
    //   }
    //
    //
    //   const emailBody = escapeHTML(event.emailBody || '')
    //
    //   // Send email
    //   await strapi.plugin('email').service('email').send({
    //     to: targetEmails,
    //     subject: event.emailSubject,
    //     // Regex means replace all occurrances of CRLF OR CR OR LF with <br/>. CRLF is newline in windows
    //     // and LF is newline in modern unix/Mac.
    //     html: emailBody.replace(/\r\n|\r|\n/g, "<br/>"),
    //   });
    //   // Update email count
    //   await strapi.documents('api::event.event').update({
    //     documentId,
    //     data: {
    //       emailCount: (event.emailCount || 0) + 1,
    //     },
    //   });
    //   return ctx.send({message: 'Email sent successfully' });
    // } catch (e){
    //   console.error(e);
    //   return ctx.internalServerError('An error occurred while sending email', e);
    // }
    return ctx.internalServerError({message: 'Not yet implemented sent successfully' });
  }
})
);
