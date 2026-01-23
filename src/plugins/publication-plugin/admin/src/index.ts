import {PLUGIN_ID} from './pluginId';
import {Initializer} from './components/Initializer';
import {PluginIcon} from './components/PluginIcon';

export default {
  register(app: any) {
    app.addMenuLink({
      to: `plugins/custom-content-manager3/collection-types/api::publication.publication`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'CSEG Publications',
      },
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

};
