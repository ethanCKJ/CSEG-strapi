import type {StrapiApp} from '@strapi/strapi/admin';

// Inject CSS overrides dynamically
const injectStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    @media(min-width: 1080px) {
      html body div#strapi > div > div > nav {
        width: 180px !important;
      }
    }
    a[href="/admin/content-manager"] {
      display: none;
    }
    a[href="/admin/plugins/cloud"] {
      display: none;
    }
    html {
      height: 100%;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
};
injectStyles();

// Suppress MISSING_TRANSLATION errors for en-GB since Strapi falls back
// to en.json meaning text is rendered correctly even if the translation is missing.
//
// Strapi hard codes en-US time format (mm/dd/yyyy) which requires setting locale to
// en-GB. However, many translations are missing for en-GB causing numerous console errors.

// Hopefully, strapi will fix this in future releases as this is well complained
// https://feedback.strapi.io/customization/p/option-to-change-the-date-format-in-the-admin-dashboard
//

const originalError = console.error;
console.error = (...args: any[]) => {
  // Handle both string and Error object
  const message = typeof args[0] === 'string'
      ? args[0]
      : args[0]?.message || String(args[0]);

  // Filter out formatjs MISSING_TRANSLATION errors for en-GB
  if (
      message.includes('[@formatjs/intl Error MISSING_TRANSLATION]') &&
      message.includes('en-GB')
  ) {
    return; // Suppress this error
  }

  // Let all other errors through
  originalError.apply(console, args);
};
export default {
  config: {
    tutorials: false,
    notifications: {releases: false},

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
    if (!indexRoute) {
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
