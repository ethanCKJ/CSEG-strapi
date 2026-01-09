import type { Core } from '@strapi/strapi';

import history from './history';
const destroy = async ({ strapi }: { strapi: Core.Strapi }) => {
  // destroy phase
  await history.destroy?.({ strapi });
};

export default destroy;
