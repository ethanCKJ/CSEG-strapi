import {PLUGIN_ID} from './pluginId';
// import { Initializer } from './components/Initializer';
// import { PluginIcon } from './components/PluginIcon';
import {reducer} from './modules/reducers';
import {routes} from './router';
import {prefixPluginTranslations} from './utils/translations';

// NOTE: preload PrismJS core + all language components in dependency order so
// they are registered in the entry chunk before any lazy chunk runs. Without
// this, Vite's pre-bundler gives each language its own ESM chunk with no
// declared inter-language dependency, and prism-scala (which extends java)
// can evaluate before prism-java, crashing the admin panel on a fresh install.
import 'prismjs';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-objectivec';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-scala';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-groovy';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-asmatmel';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-basic';
import 'prismjs/components/prism-clojure';
import 'prismjs/components/prism-cobol';
import 'prismjs/components/prism-docker';
import 'prismjs/components/prism-elixir';
import 'prismjs/components/prism-erlang';
import 'prismjs/components/prism-fortran';
import 'prismjs/components/prism-fsharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-graphql';
import 'prismjs/components/prism-haskell';
import 'prismjs/components/prism-haxe';
import 'prismjs/components/prism-ini';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-julia';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-lua';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-matlab';
import 'prismjs/components/prism-makefile';
import 'prismjs/components/prism-perl';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-powershell';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-r';
import 'prismjs/components/prism-ruby';
import 'prismjs/components/prism-rust';
import 'prismjs/components/prism-sas';
import 'prismjs/components/prism-scheme';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-stata';
import 'prismjs/components/prism-swift';
import 'prismjs/components/prism-vbnet';
import 'prismjs/components/prism-yaml';
import {ContentManagerPlugin} from "./content-manager";

export default {
  register(app: any) {
    const cm = new ContentManagerPlugin();
    app.addReducers({
      [PLUGIN_ID]: reducer,
    })
    // TODO: Make regular content manager point to Single types while keeping routes registered
    // app.addMenuLink({
    //   to: `plugins/${PLUGIN_ID}`,
    //   icon: Bell,
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

    app.router.addRoute({
      path: 'plugins/custom-content-manager3/*',
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
          return { data: prefixPluginTranslations(data, 'content-manager'), locale };
        } catch {
          // Try base language (e.g., "en" for "en-GB")
          try {
            const baseLocale = locale.split('-')[0];
            const { default: data } = await import(`./translations/${baseLocale}.json`);
            return { data: prefixPluginTranslations(data, 'content-manager'), locale };
          } catch {
            return { data: {}, locale };
          }
        }
      })
    );
  },
};
