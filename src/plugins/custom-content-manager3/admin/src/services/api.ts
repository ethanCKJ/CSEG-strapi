import { adminApi } from '@strapi/strapi/admin';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const contentManagerApi = adminApi.enhanceEndpoints({
  addTagTypes: [
    'ComponentConfiguration',
    'ContentTypesConfiguration',
    'ContentTypeSettings',
    'Document',
    'InitialData',
    'HistoryVersion',
    'Relations',
    'UidAvailability',
    'RecentDocumentList',
    'GuidedTourMeta',
    'CountDocuments',
    'UpcomingReleasesList',
    'AILocalizationJobs',
  ],
});

const baseApi = createApi({
  reducerPath:'custom-content-manager-api',
  baseQuery: fetchBaseQuery({baseUrl:"/admin"}),
  tagTypes:[
    'ComponentConfiguration',
    'ContentTypesConfiguration',
    'ContentTypeSettings',
    'Document',
    'InitialData',
    'HistoryVersion',
    'Relations',
    'UidAvailability',
    'RecentDocumentList',
    'GuidedTourMeta',
    'CountDocuments',
    'UpcomingReleasesList',
    'AILocalizationJobs',
  ],
  // We inject them later
  endpoints: () => ({})
})


export { contentManagerApi };
