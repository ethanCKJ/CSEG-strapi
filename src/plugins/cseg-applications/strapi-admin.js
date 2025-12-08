'use strict';
import { Walk } from '@strapi/icons';

const pluginId = 'cseg-applications';

export default {
  register(app) {
    console.log('called register');

    // Add menu link
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: Walk,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'New Member Applications',
      },
      Component: async () => {
        const component = await import('./admin/src/pages/HomePage.tsx');
        return component;
      },
      permissions: [],
    });
    console.log('called addMenuLink');

    app.registerPlugin({
      id: pluginId,
      name: 'CSEG Applications',
    });
    console.log('called registerPlugin');
  },

  bootstrap(app) {
    console.log('called bootstrap');
  },


};