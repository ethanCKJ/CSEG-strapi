import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi } ) {
    strapi.documents.use(async (context, next) => {
      // target the 'create' action on articles
      if (context.uid == 'api::member-application.member-application' && context.action == 'update') {
        console.log("context", context);
        if (context.action === 'update' && context.params.data.applicationStatus === 'approved'){
          const applicationData = context.params.data;
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
