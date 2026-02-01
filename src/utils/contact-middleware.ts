import type {Core} from '@strapi/strapi';
import {env} from "@strapi/utils";
import {escapeHTML} from "./helper-functions";

/**
 * Middleware to send email notifications when contact messages are created.
 * Sends email to administrator to handle contact message.
 */
export const contactMiddleware = () => {
  return async (context, next) => {
    // Only process contact message creation
    if (!(context.uid === 'api::contact.contact' && context.action === 'create')) {
      return next();
    }

    // Execute the create operation first to guarantee emails only sent for contact requests successfully
    // saved to database.
    const result = await next();

    try {
      const messageData = context.params.data;
      const subject = `CSEG Contact message from ${escapeHTML(messageData.name)}`;
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
CSEG Website System`;

      await strapi.plugin('email').service('email').send({
        to: env('CONTACT_MESSAGE_REVIEWER'),
        subject: subject,
        html: html.replace(/\r\n|\r|\n/g, "<br/>"),
      });
    } catch (error) {
      strapi.log.error('Failed to send contact message notification email:', error);
      // Don't fail the operation if email fails
    }

    return result;
  };
};
