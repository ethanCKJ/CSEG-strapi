import {env, errors} from "@strapi/utils";
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

    let previousApplicationStatus: string | undefined;
    if (context.action === 'update' && context.params.documentId) {
      try {
        const existingApplication = await strapi.documents('api::member-application.member-application').findOne({
          documentId: context.params.documentId,
          fields: ['applicationStatus'],
        });
        previousApplicationStatus = existingApplication?.applicationStatus;
      } catch (error) {
        strapi.log.error('Failed to read existing member application before update:', error);
      }
    }

    const isApprovalUpdate =
      context.action === 'update' &&
      context.params.documentId &&
      applicationData.applicationStatus === 'approved' &&
      previousApplicationStatus !== 'approved';

    if (isApprovalUpdate) {
      let candidateEmail = applicationData.email;

      if (!candidateEmail) {
        const existingApplicationForEmail = await strapi.documents('api::member-application.member-application').findOne({
          documentId: context.params.documentId,
          fields: ['email'],
        });
        candidateEmail = candidateEmail ?? existingApplicationForEmail?.email;
      }

      try {
        const subject = `Welcome to CSEG`;
        const html = `Dear applicant,
          
          Congratulations! Your application to join CSEG has been approved. 
          
          Looking forward to see you at our next event.
          Regards,
          CSEG Organisers`;

        await strapi.plugin('email').service('email').send({
          to: candidateEmail,
          subject: subject,
          html: html.replace(/\r\n|\r|\n/g, "<br/>"),
        });
      } catch (error) {
        strapi.log.error('Failed to send member approval email. Aborting approval update:', error);
        throw new errors.ApplicationError('Member application was not approved because the confirmation email could not be sent.');
      }
    }

    // Execute the create/update operation
    const result = await next();

    // Handle new member approval after successful update.
    if (isApprovalUpdate) {
      try {
        const approvedApplication = await strapi.documents('api::member-application.member-application').findOne({
          documentId: context.params.documentId,
          populate: ['member_type'],
        });

        if (!approvedApplication) {
          strapi.log.warn(`Approved member application ${context.params.documentId} not found after update`);
          return result;
        }

        await strapi.documents('api::member.member').create({
          data: {
            fullName: approvedApplication.fullName,
            preferredName: approvedApplication.preferredName ?? '',
            affiliations: approvedApplication.affiliations ?? '',
            email: approvedApplication.email ?? '',
            aboutYou: approvedApplication.aboutYou ?? '',
            topics: approvedApplication.topics ?? '',
            member_type: approvedApplication.member_type ?? undefined,
          }
        });
      } catch (error) {
        strapi.log.error('Failed to create member from approved application:', error);
        // Keep the application update successful even if member/email side effects fail.
      }
    }

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
