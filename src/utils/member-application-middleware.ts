import type {Core} from '@strapi/strapi';
import {env} from "@strapi/utils";
import {escapeHTML} from "./helper-functions";

/**
 * Middleware to handle member application processing.
 * - On create: Sends email notification to administrators
 * - On update (when approved): Creates a new member record
 */
export const memberApplicationMiddleware = () => {
  const pageActions = ['create','update']
  return async (context, next) => {
    // Only process member applications
    if (!(context.uid === 'api::member-application.member-application' && pageActions.includes(context.action))) {
      return next();
    }

    const applicationData = context.params.data;

    // Handle new member approval.
    if (context.action === 'update' && applicationData.applicationStatus === 'approved') {
      try {
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
        });
      } catch (error) {
        strapi.log.error('Failed to create member from approved application:', error);
        // Continue with update even if member creation fails
      }
    }

    // Execute the create/update operation
    const result = await next();
    // Handle new application - send notification email after creation
    if (context.action === 'create') {
      try {
        const subject = `CSEG Member application from ${escapeHTML(applicationData.fullName)}`;
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
CSEG Website System`;

        await strapi.plugin('email').service('email').send({
          to: env('MEMBER_APPLICATION_REVIEWER'),
          subject: subject,
          html: html.replace(/\r\n|\r|\n/g, "<br/>"),
        });
      } catch (error) {
        strapi.log.error('Failed to send member application notification email:', error);
      }
    }

    return result;
  };
};
