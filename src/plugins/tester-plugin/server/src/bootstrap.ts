import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // Register permission actions.
  const actions = [
    {
      section: 'plugins',
      displayName: 'Increment Counter',
      uid: 'increment',
      pluginName: 'tester-plugin',
    },
  ];

  strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default bootstrap;
