import { prop } from 'lodash/fp';
import { contentTypes as contentTypesUtils } from '@strapi/utils';

import type { Core, Struct } from '@strapi/types';
import { getService } from '../utils';

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  canConfigureContentType({
    userAbility,
    contentType,
  }: {
    userAbility: any;
    contentType: Struct.ContentTypeSchema;
  }) {
    const action = contentTypesUtils.isSingleType(contentType)
      ? 'plugin::custom-content-manager2.single-types.configure-view'
      : 'plugin::custom-content-manager2.collection-types.configure-view';

    return userAbility.can(action);
  },

  async registerPermissions() {
    const displayedContentTypes = getService('content-types').findDisplayedContentTypes();
    const contentTypesUids = displayedContentTypes.map(prop('uid'));

    const actions = [
      {
        section: 'contentTypes',
        displayName: 'Create',
        uid: 'explorer.create',
        pluginName: 'custom-content-manager2',
        subjects: contentTypesUids,
        options: {
          applyToProperties: ['fields'],
        },
      },
      {
        section: 'contentTypes',
        displayName: 'Read',
        uid: 'explorer.read',
        pluginName: 'custom-content-manager2',
        subjects: contentTypesUids,
        options: {
          applyToProperties: ['fields'],
        },
      },
      {
        section: 'contentTypes',
        displayName: 'Update',
        uid: 'explorer.update',
        pluginName: 'custom-content-manager2',
        subjects: contentTypesUids,
        options: {
          applyToProperties: ['fields'],
        },
      },
      {
        section: 'contentTypes',
        displayName: 'Delete',
        uid: 'explorer.delete',
        pluginName: 'custom-content-manager2',
        subjects: contentTypesUids,
      },
      {
        section: 'contentTypes',
        displayName: 'Publish',
        uid: 'explorer.publish',
        pluginName: 'custom-content-manager2',
        subjects: contentTypesUids,
      },
      {
        section: 'plugins',
        displayName: 'Configure view',
        uid: 'single-types.configure-view',
        subCategory: 'single types',
        pluginName: 'custom-content-manager2',
      },
      {
        section: 'plugins',
        displayName: 'Configure view',
        uid: 'collection-types.configure-view',
        subCategory: 'collection types',
        pluginName: 'custom-content-manager2',
      },
      {
        section: 'plugins',
        displayName: 'Configure Layout',
        uid: 'components.configure-layout',
        subCategory: 'components',
        pluginName: 'custom-content-manager2',
      },
    ];

    await strapi.service('admin::permission').actionProvider.registerMany(actions);
  },
});
