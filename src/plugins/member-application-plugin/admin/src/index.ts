import {Initializer} from './components/Initializer';
import {PluginIcon} from './components/PluginIcon';
import {PLUGIN_ID} from './pluginId';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/custom-content-manager3/collection-types/api::member-application.member-application`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'CSEG Member Applications',
      },
    });

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
