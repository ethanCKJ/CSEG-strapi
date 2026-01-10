import { adminApi } from '@strapi/strapi/admin';

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

export { contentManagerApi };
