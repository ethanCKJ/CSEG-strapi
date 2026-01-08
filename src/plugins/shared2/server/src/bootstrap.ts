import type { Core } from '@strapi/strapi';
import {getService} from "./utils";
import { prop } from 'lodash/fp';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // const displayedContentTypes = getService('content-types').findDisplayedContentTypes();
  // const contentTypesUids = displayedContentTypes.map(prop('uid'));
  // Register permission actions.
  const actions = [
    // {
    //   section: 'contentTypes',
    //   displayName: 'Create',
    //   uid: 'explorer.create',
    //   pluginName: 'custom-content-manager',
    //   subjects: contentTypesUids,
    //   options: {
    //     applyToProperties: ['fields'],
    //   },
    // },
    // {
    //   section: 'contentTypes',
    //   displayName: 'Read',
    //   uid: 'explorer.read',
    //   pluginName: 'custom-content-manager',
    //   subjects: contentTypesUids,
    //   options: {
    //     applyToProperties: ['fields'],
    //   },
    // },
    // {
    //   section: 'contentTypes',
    //   displayName: 'Update',
    //   uid: 'explorer.update',
    //   pluginName: 'custom-content-manager',
    //   subjects: contentTypesUids,
    //   options: {
    //     applyToProperties: ['fields'],
    //   },
    // },
    // {
    //   section: 'contentTypes',
    //   displayName: 'Delete',
    //   uid: 'explorer.delete',
    //   pluginName: 'custom-content-manager',
    //   subjects: contentTypesUids,
    // },
    // {
    //   section: 'contentTypes',
    //   displayName: 'Publish',
    //   uid: 'explorer.publish',
    //   pluginName: 'custom-content-manager',
    //   subjects: contentTypesUids,
    // },
    // {
    //   section: 'plugins',
    //   displayName: 'Configure view',
    //   uid: 'single-types.configure-view',
    //   subCategory: 'single types',
    //   pluginName: 'custom-content-manager',
    // },
    {
      section: 'plugins',
      displayName: 'Configure view',
      uid: 'collection-types.configure-view',
      subCategory: 'collection types',
      pluginName: 'custom-content-manager',
    },
    {
      section: 'plugins',
      displayName: 'Configure Layout',
      uid: 'components.configure-layout',
      subCategory: 'components',
      pluginName: 'custom-content-manager',
    },
  ];

  strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default bootstrap;
