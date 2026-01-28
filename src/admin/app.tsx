import type { StrapiApp } from '@strapi/strapi/admin';
import './overrides.css'

export default {
  config: {
    tutorials: false,
    notifications: { releases: false },

    locales: [
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
        'en-GB',
    ],
  },
  register(app: StrapiApp) {
    const indexRoute = app.router.routes.find(({index}) => index);
    if (!indexRoute){
      throw new Error("Unable to find index page");
    }
    indexRoute.lazy = async () => {
      const {CustomDashboard} = await import(
          './extensions/CustomDashboard'
          );
      return {Component: CustomDashboard}
    }
  },
  // This does not print but it may get called.
  bootstrap(app: StrapiApp) {
  },
};
