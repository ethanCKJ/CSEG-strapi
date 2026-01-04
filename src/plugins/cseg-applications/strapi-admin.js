'use strict';
import {IconWithText} from "./icon-with-text";

const pluginId = 'cseg-applications';

export default {
  register(app) {
    console.log('called register');

    // Add menu link
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: IconWithText,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'New member application',
      },
      Component: async () => {
        return await import('./admin/src/pages/HomePage.tsx');
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