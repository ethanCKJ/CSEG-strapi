import mapValues from 'lodash/fp/mapValues';

/**
 * Transform data by extracting apiData if present, recursively
 * Used by action hooks to prepare form data before API submission
 */
const transformData = (data: Record<string, any>): any => {
  if (Array.isArray(data)) {
    return data.map(transformData);
  }

  if (typeof data === 'object' && data !== null) {
    if ('apiData' in data) {
      return data.apiData;
    }

    return mapValues(transformData)(data);
  }

  return data;
};

export { transformData };
