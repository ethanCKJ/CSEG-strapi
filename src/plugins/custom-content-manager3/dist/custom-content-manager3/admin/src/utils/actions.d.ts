/**
 * Transform data by extracting apiData if present, recursively
 * Used by action hooks to prepare form data before API submission
 */
declare const transformData: (data: Record<string, any>) => any;
export { transformData };
