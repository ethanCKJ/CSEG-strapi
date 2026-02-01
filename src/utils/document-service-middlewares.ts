import {collectTargetEmails, syncScheduledEmailSlot} from "./helper-functions";

/**
 * Middleware to sync scheduled emails for events.
 * Prepares scheduled emails when events are created or updated.
 */
export const eventNotificationMiddleware = () => {
  const pageActions = ["create", "update"];
  return async (context, next) => {
    // Early return if this middleware does nothing
    if (!(context.uid === 'api::event.event' && pageActions.includes(context.action))) {
      return next();
    }

    // Execute the create/update operation first
    const result = await next();

    // Extract documentId (for create, it's in result; for update, it's in params)
    const documentId = context.params.documentId || result.documentId;

    if (!documentId) {
      strapi.log.warn('No documentId available for event notification middleware');
      return result;
    }

    try {
      // Fetch the updated event with relations to get complete data
      const updatedEvent = await strapi.documents('api::event.event').findOne({
        documentId: documentId,
        populate: {
          open_to: {
            fields: ['documentId', 'mailingList'],
          },
          public_event_mailing_lists: {
            fields: ['documentId', 'mailingList'],
          }
        },
      });

      if (updatedEvent) {
        const nonPublicEventMailingLists = updatedEvent.open_to || [];
        const publicEventMailingLists = updatedEvent.public_event_mailing_lists || [];
        const targetEmails = collectTargetEmails(
            strapi,
            updatedEvent.publicEvent,
            nonPublicEventMailingLists,
            publicEventMailingLists,
        );

        // Sync each of the 3 email slots
        await syncScheduledEmailSlot(
            strapi,
            documentId,
            1,
            updatedEvent.disableEmail1,
            updatedEvent.emailSubject1,
            updatedEvent.emailBody1,
            updatedEvent.emailDate1,
            targetEmails
        );

        await syncScheduledEmailSlot(
            strapi,
            documentId,
            2,
            updatedEvent.disableEmail2,
            updatedEvent.emailSubject2,
            updatedEvent.emailBody2,
            updatedEvent.emailDate2,
            targetEmails
        );

        await syncScheduledEmailSlot(
            strapi,
            documentId,
            3,
            updatedEvent.disableEmail3,
            updatedEvent.emailSubject3,
            updatedEvent.emailBody3,
            updatedEvent.emailDate3,
            targetEmails
        );
      }
    } catch (e) {
      strapi.log.error('Failed to sync scheduled emails for event:', e);
      // Don't fail the operation if email sync fails
    }

    return result;
  };
};

