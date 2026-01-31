/**
 * Constants for membership application management
 */
/**
 * The content type UID for member applications
 */
export declare const MEMBER_APPLICATION_MODEL = "api::member-application.member-application";
/**
 * The content type UID for approved members
 */
export declare const MEMBER_MODEL = "api::member.member";
/**
 * Application status values
 */
export declare const APPLICATION_STATUS: {
    readonly PENDING: "pending";
    readonly APPROVED: "approved";
    readonly REJECTED: "rejected";
};
/**
 * Type for application status
 */
export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];
/**
 * Fields to hide from the admin panel for member applications
 * These fields are managed programmatically through approve/reject actions
 */
export declare const ADMIN_HIDDEN_FIELDS: string[];
export declare const EVENT_MODEL = "api::event.event";
