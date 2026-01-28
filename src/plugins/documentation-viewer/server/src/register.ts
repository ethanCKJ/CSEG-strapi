import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  strapi.customFields.register({
    name: "doc-viewer",
    plugin: "documentation-viewer",
    type: "string",
  });
};

export default register;
