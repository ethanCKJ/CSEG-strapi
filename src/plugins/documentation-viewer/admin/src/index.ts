import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app: any) {

    app.customFields.register({
      name: 'doc-viewer',
      pluginId: 'documentation-viewer',
      type: 'string',
      intlLabel: {
        id: 'documentation-viewer.label',
        defaultMessage: 'Documentation Viewer',
      },
      intlDescription: {
        id: 'documentation-viewer.description',
        defaultMessage: 'Display markdown documentation',
      },
      components: {
        Input: async () => import('./components/Input'),
      },
      options: {
        base: [{
          sectionTitle: {
            id: 'documentation-viewer.section',
            defaultMessage: 'Documentation',
          },
          items: [{
            name: 'options.documentId',
            type: 'text',
            intlLabel: {
              id: 'documentation-viewer.documentId.label',
              defaultMessage: 'Document ID',
            },
            description: {
              id: 'documentation-viewer.documentId.description',
              defaultMessage: 'Enter the documentId from api::documentation',
            },
          },
            {
              name: 'options.isAccordion',
              type: 'checkbox',
              default: false,
              intlLabel: {
                id: 'documentation-viewer.isAccordion.label',
                defaultMessage: 'Use accordion style',
              },
              description: {
                id: 'documentation-viewer.isAccordion.description',
                defaultMessage: 'According is open by default',
              },
            }
          ],
        }],
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  // async registerTrads({ locales }: { locales: string[] }) {
  //   return Promise.all(
  //     locales.map(async (locale) => {
  //       try {
  //         const { default: data } = await import(`./translations/${locale}.json`);
  //
  //         return { data, locale };
  //       } catch {
  //         return { data: {}, locale };
  //       }
  //     })
  //   );
  // },
};
