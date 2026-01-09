import type { Core } from '@strapi/strapi';
import history from './history';
import preview from './preview';

const register = async ({ strapi }: { strapi: Core.Strapi }) => {
  // register phase
  await history.register?.({ strapi });
  await preview.register?.({ strapi });
};

export default register;
