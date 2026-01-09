import type { Core } from '@strapi/strapi';

const bootstrap = ({ strapi }: { strapi: Core.Strapi }) => {
  // Register permission actions.
  // console.error("tester-plugin: registering permission actions"); // This does not work here!
};

export default bootstrap;
