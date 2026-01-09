/* eslint-disable check-file/no-index */

import { PreviewSidePanel } from './components/PreviewSidePanel';

import type { ContentManagerPlugin } from '../custom-content-manager2';
import type { PluginDefinition } from '@strapi/admin/strapi-admin';

const previewAdmin: Partial<PluginDefinition> = {
  bootstrap(app) {
    const contentManagerPluginApis = app.getPlugin('custom-content-manager2')
      .apis as ContentManagerPlugin['config']['apis'];

    contentManagerPluginApis.addEditViewSidePanel([PreviewSidePanel]);
  },
};

export { previewAdmin };
