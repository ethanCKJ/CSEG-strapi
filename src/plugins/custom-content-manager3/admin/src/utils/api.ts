import { ApiError, type UnknownApiError } from '@strapi/strapi/admin';

interface Query {
  plugins?: Record<string, unknown>;
  _q?: string;
  [key: string]: any;
}

/**
 * This type extracts the plugin options from the query
 * and appends them to the root of the query
 */
type TransformedQuery<TQuery extends Query> = Omit<TQuery, 'plugins'> & {
  [key: string]: string;
};

/**
 * @description
 * Creates a valid query params object for get requests
 * ie. plugins[i18n][locale]=en becomes locale=en
 */
const buildValidParams = <TQuery extends Query>(query: TQuery): TransformedQuery<TQuery> => {
  if (!query) return query;

  // Extract pluginOptions from the query, they shouldn't be part of the URL
  const { plugins: _, ...validQueryParams } = {
    ...query,
    ...Object.values(query?.plugins ?? {}).reduce<Record<string, string>>(
      (acc, current) => Object.assign(acc, current),
      {}
    ),
  };

  return validQueryParams;
};

type BaseQueryError = ApiError | UnknownApiError;

// Accept `unknown` here so the guard works on any value (e.g. RTK SerializedError,
// network errors, or arbitrary unknowns). Perform a safe runtime check for a
// string `name` property to narrow to `BaseQueryError`.
const isBaseQueryError = (error: unknown): error is BaseQueryError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    // use 'in' to check for presence, then confirm it's a string
    'name' in error &&
    typeof (error as { name?: unknown }).name === 'string'
  );
};

export { isBaseQueryError, buildValidParams };
export type { BaseQueryError, UnknownApiError };
