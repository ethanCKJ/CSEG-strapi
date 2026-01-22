import {PuzzlePiece} from "@strapi/icons";

import {PLUGIN_ID} from './pluginId';

export default {
  register(app: any) {
    // Register the custom field https://docs.strapi.io/cms/features/custom-fields#options
    app.customFields.register({
      name: 'organized-image',
      pluginId: 'image-uploader',
      type: 'media',
      icon: PuzzlePiece,
      intlLabel: {
        id: `${PLUGIN_ID}.label`,
        defaultMessage: 'Organized Image',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.description`,
        defaultMessage: 'Upload image to a specific folder in media library',
      },
      components: {
        Input: async () => import('./components/Input'),
      },
      options: {
        advanced: [
          {
            sectionTitle: {
              id: `${PLUGIN_ID}.options.advanced.section`,
              defaultMessage: 'Folder Organization',
            },
            items: [
              {
                name: 'options.folderPath',
                type: 'text',
                intlLabel: {
                  id: `${PLUGIN_ID}.options.folderPath.label`,
                  defaultMessage: 'Media Library Folder',
                },
                description: {
                  id: `${PLUGIN_ID}.options.folderPath.description`,
                  defaultMessage: 'Specify the folder path in media library (e.g., /events, /members)',
                },
                placeholder: {
                  id: `${PLUGIN_ID}.options.folderPath.placeholder`,
                  defaultMessage: '/uploads',
                },
              },
            ],
          },
        ],
      },
    });
  },

};
