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

export default {
  /**
   * Document service middleware.
   * https://strapi.io/blog/what-are-document-service-middleware-and-what-happened-to-lifecycle-hooks-1
   */
  register({ strapi }: { strapi: Core.Strapi } ) {
    strapi.documents.use(async (context, next) => {
      // target the 'create' action on articles
      if (context.uid === 'api::member-application.member-application' && (context.action === 'update' || context.action === 'create')) {
        const applicationData = context.params.data;
        if (context.action === 'update' && context.params.data.applicationStatus === 'approved'){
          await strapi.documents('api::member.member').create({
            data: {
              fullName: applicationData.fullName,
              preferredName: applicationData.preferredName ?? '',
              affiliations: applicationData.affiliations ?? '',
              email: applicationData.email ?? '',
              aboutYou: applicationData.aboutYou ?? '',
              topics: applicationData.topics ?? '',
              // member_type may be a relation; preserve whatever structure came from the application data
              member_type: applicationData.member_type ??  undefined,
            }
          })
        } else if (context.action === 'create'){
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

      // always return next()
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
