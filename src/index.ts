import type {Core} from '@strapi/strapi';
import {contactMiddleware} from "./utils/contact-middleware";
import {memberApplicationMiddleware} from "./utils/member-application-middleware";
import {eventNotificationMiddleware} from "./utils/document-service-middlewares";
import {eventICSMiddleware} from "./utils/eventICSMiddleware";
import {validateRelations} from "./utils/required-relations-custom";

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
    strapi.documents.use(eventICSMiddleware());

  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi } ) {
    strapi.db.lifecycles.subscribe({
      async beforeCreate(event) {
        await validateRelations(event, strapi);
      },
      async beforeUpdate(event) {
        await validateRelations(event, strapi);
      },
    });
  }
};




