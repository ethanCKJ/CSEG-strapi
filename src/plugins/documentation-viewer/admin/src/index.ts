import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {
    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: PluginIcon,
    //   intlLabel: {
    //     id: `${PLUGIN_ID}.plugin.name`,
    //     defaultMessage: PLUGIN_ID,
    //   },
    //   Component: async () => {
    //     const { App } = await import('./pages/App');
    //
    //     return App;
    //   },
    // });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
    app.customFields.register({
      name: "doc-viewer",
      pluginId: PLUGIN_ID,
      type: "json",
      // ... intlLabel, intlDescription, icon ...
      components: {
        Input: async () => import('./components/Input'),
      },
      intlLabel: {
        id: "custom.fields.documentation-viewer.label",
        defaultMessage: "Documentation viewer",
      },
      intlDescription: {
        id: 'custom.fields.documentation-viewer.description',
        defaultMessage: 'Documentation viewer',
      },
      options: {
        base: [{
          sectionTitle: {
            id: "documentation-viewer.section",
            defaultMessage: "Documentation"
          },
          items: [{
            name: "options.documentId",
            type: "text",
            intlLabel: {
              id: "documentation-viewer.documentId.label",
              defaultMessage: "Document ID"
            },
            description: {
              id: "documentation-viewer.documentId.description",
              defaultMessage: "Enter the documentId from api::documentation"
            }
          }]
        }]
      }
    });
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
