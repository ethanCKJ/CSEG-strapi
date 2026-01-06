import React, {useMemo} from "react";
import {useQueryParams, useNotification, useAPIErrorHandler} from "@strapi/admin/strapi-admin";
import {buildValidParams} from "../../utils/api";
import {useGetAllDocumentsQuery} from "../../services/documents";
import {getTranslation} from "../../utils/translations";
import {useNavigate} from "react-router-dom";
import { useIntl } from 'react-intl';
import {stringify} from "qs";
import {ListFieldLayout} from "@strapi/content-manager/strapi-admin";
import {convertListLayoutToFieldLayouts, useDocumentLayout} from "../../hooks/useDocumentLayout";
import {useDoc} from "../../hooks/useDocument";
import {usePrev} from "../../hooks/usePrev";
import {isEqual} from "lodash";

export const ListViewPage = () => {
  const {toggleNotification} = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const {collectionType, model, schema} = useDoc();
  const { list } = useDocumentLayout(model);

  const [displayedHeaders, setDisplayedHeaders] = React.useState<ListFieldLayout[]>([]);

  const listLayout = usePrev(list.layout);
  React.useEffect(() => {
    /**
     * ONLY update the displayedHeaders if the document
     * layout has actually changed in value.
     */
    if (!isEqual(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);

  const handleSetHeaders = (headers: string[]) => {
    setDisplayedHeaders(
        convertListLayoutToFieldLayouts(headers, schema!.attributes, list.metadatas)
    );
  };

  const [{ query }] = useQueryParams<{
    plugins?: Record<string, unknown>;
    page?: string;
    pageSize?: string;
    sort?: string;
  }>({
    page: '1',
    pageSize: '10',
    sort: 'id:ASC',
  });
  console.log('query params', query);
  const params = useMemo(() => buildValidParams(query), [query]);
  const { data, error, isLoading } = useGetAllDocumentsQuery({
    model:model,
    params,
  });



  /**
   * If the API returns an error, display a notification
   */
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: 'danger',
        message: formatAPIError(error),
      });
    }
  }, [error, formatAPIError, toggleNotification]);

  const { results = [], pagination } = data ?? {};

  React.useEffect(() => {
    if (pagination && pagination.pageCount > 0 && pagination.page > pagination.pageCount) {
      navigate(
          {
            search: stringify({
              ...query,
              page: pagination.pageCount,
            }),
          },
          { replace: true }
      );
    }
  }, [pagination, formatMessage, query, navigate]);

  // No need canCreate. Just set true.

  /**
   * Format the table headers without injecting additional columns.
   */
  const tableHeaders = React.useMemo(() => {
    const headers = { displayedHeaders, layout: list };

    const formattedHeaders = headers.displayedHeaders.map<ListFieldLayout>((header) => {
      /**
       * When the header label is a string, it is an attribute on the current content-type:
       * Use the attribute name value to compute the translation.
       * Otherwise, it should be a  translation object coming from a plugin that injects into the table (ie i18n, content-releases, review-workflows):
       * Use the translation object as is.
       */
      const translation =
          typeof header.label === 'string'
              ? {
                id: `content-manager.content-types.${model}.${header.name}`,
                defaultMessage: header.label,
              }
              : header.label;

      return {
        ...header,
        label: formatMessage(translation),
        name: `${header.name}${header.mainField?.name ? `.${header.mainField.name}` : ''}`,
      };
    });

    if (schema?.options?.draftAndPublish) {
      formattedHeaders.push({
        attribute: {
          type: 'custom',
        },
        name: 'status',
        label: formatMessage({
          id: getTranslation(`containers.list.table-headers.status`),
          defaultMessage: 'status',
        }),
        searchable: false,
        sortable: false,
      } satisfies ListFieldLayout);
    }

    return formattedHeaders;
  }, [
    displayedHeaders,
    formatMessage,
    list,
    schema?.options?.draftAndPublish,
    model,
  ]);
  console.log('tableHeaders', tableHeaders);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading documents</div>;
  }
  console.log('data', data, 'error', error, 'isLoading', isLoading);

  return (<div>List View Page</div>);
}