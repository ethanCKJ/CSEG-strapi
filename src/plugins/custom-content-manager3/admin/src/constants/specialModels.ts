/**
 * Constants for membership application management
 */

/**
 * The content type UID for member applications
 */
export const MEMBER_APPLICATION_MODEL = 'api::member-application.member-application';

/**
 * The content type UID for contact messages
 */
export const CONTACT_MODEL = 'api::contact.contact';

/**
 * The content type UID for approved members
 */
export const MEMBER_MODEL = 'api::member.member';

/**
 * Application status values
 */
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

/**
 * Type for application status
 */
export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

/**
 * Fields to hide from the admin panel for member applications
 * These fields are managed programmatically through approve/reject actions
 */
export const ADMIN_HIDDEN_FIELDS = ['applicationStatus'];

export const EVENT_MODEL = "api::event.event";
// TODO: Simplify file to end with export {A,B,C} etc




