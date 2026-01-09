import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
// import { Initializer } from './components/Initializer';
// import { PluginIcon } from './components/PluginIcon';
import {Bell} from "@strapi/icons";

import { CheckCircle, Feather, Pencil, PuzzlePiece } from '@strapi/icons';

import { historyAdmin } from './history';
import { reducer } from './modules/reducers';
import { previewAdmin } from './preview';
import { routes } from './router';
import { prefixPluginTranslations } from './utils/translations';

import type { WidgetArgs } from '@strapi/admin/strapi-admin';

import 'prismjs';
import {ContentManagerPlugin} from "./content-manager";

export default {
  register(app: any) {
    const cm = new ContentManagerPlugin();
    app.addReducers({
      [PLUGIN_ID]: reducer,
    })

    app.addMenuLink({
      to: PLUGIN_ID,
      icon: Bell,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      // Component: async () => {
      //   const { App } = await import('./pages/App');
      //
      //   return App;
      // },
    });

    app.router.addRoute({
      path: 'custom-content-manager3/*',
      lazy: async () => {
        const { Layout } = await import('./layout');

        return {
          Component: Layout,
        };
      },
      children: routes,
    });

    app.registerPlugin(cm.config);
  },

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
