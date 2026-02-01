import {handleEventICS} from "./helper-functions";
import slugify from "slugify";

/**
 * Middleware to handle ICS file generation for events.
 * Generates calendar files after event creation/update.
 */
export const eventICSMiddleware = () => {
  const pageActions = ['create', 'update']
  return async (context, next) => {
    // Early return
    if (!(context.uid === 'api::event.event' && pageActions.includes(context.action))) {
      return next();
    }
    const eventData = context.params.data;
    // UID is a URL safe 255 character slug based on title+date+starttime
    const icsUID = slugify(`${eventData.title}${eventData.eventDate}${eventData.eventStartTime} `|| 'event').substring(0,255);

    const ics = handleEventICS(
        icsUID,
        String(eventData.eventStartTime || ''),
        String(eventData.eventEndTime || ''),
        String(eventData.eventDate || ''),
        String(eventData.speaker || ''),
        String(eventData.abstract || ''),
        String(eventData.eventFormat || ''),
        String(eventData.location || ''),
        String(eventData.teamsLink || ''),
        String(eventData.title || '')
    );
    context.params.data.ics = ics;
    return next();
  };
};