export declare function renderLodashStyleTemplate(template: string, values: object): string;
/**
 * Monday 26th January
 * @param date
 */
export declare const formatDate: (date: Date) => string;
/**
 * Monday 26th Jan, 12 pm
 * @param date
 */
export declare const formatSubjectDate: (date: Date) => string;
/**
 * Returns form string if non-empty string. Otherwise returns
 * default value
 * @param value
 * @param defaultValue
 */
export declare const extractFormString: (value: any, defaultValue: string) => string;
/**
 * Extracts and validates a date from form value.
 * Returns null if date is not valid, otherwise returns Date object.
 * @param value - The form value to extract date from
 * @returns Date object if valid, null otherwise
 */
export declare const extractValidDate: (value: any) => Date | null;
export declare function extractlocationFormatted(eventFormat: string, physicalLocation: string, teamsLink: string): string;
