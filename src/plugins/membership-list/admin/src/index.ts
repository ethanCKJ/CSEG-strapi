import {PLUGIN_ID} from './pluginId';
import {Initializer} from './components/Initializer';
import {MembershipIcon} from "./membership-icon";

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/custom-content-manager3/collection-types/api::member.member`,
      icon: MembershipIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
    });

    // app.router.addRoute({
    //   path: `plugins/${PLUGIN_ID}/*`,
    //   lazy: async () => {
    //     const { App } = await import('./pages/App');
    //
    //     return {
    //       Component: App,
    //     };
    //     // const { Layout } = await import('./layout');
    //   },
    //
    // });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);
          return { data, locale };
        } catch {
          // Try base language (e.g., "en" for "en-GB")
          try {
            const baseLocale = locale.split('-')[0];
            const { default: data } = await import(`./translations/${baseLocale}.json`);
            return { data, locale };
          } catch {
            return { data: {}, locale };
          }
        }
      })
    );
  },
};
