import React, {useMemo} from "react";
import {useQueryParams} from "@strapi/admin/strapi-admin";
import {buildValidParams} from "../../utils/api";
import {useGetAllDocumentsQuery} from "../../services/documents";

export const ListViewPage = () => {
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
    model:'api::event.event',
    params,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading documents</div>;
  }
  console.log('data', data, 'error', error, 'isLoading', isLoading);
  return (<div>List View Page</div>);
}