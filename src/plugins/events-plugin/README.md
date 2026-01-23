# events-plugin

Link to custom content manager for events

This is the template for each menu link.
0. Create a new folder `custom-plugin` in `src/plugins/`.
1. Copy and paste all files except `dist`, `node_modules` and `README.md` from `events-plugin` to `custom-plugin`.
2. (Webstorm) CTRL + SHIFT + F the `custom-plguin` folder for events-plugin and replace with `custom-plugin`.
This is the In `src/components/PluginIcon.tsx`, `package.json`, `index.ts` and `pluginId.ts` files.
3. CTRL + F work `events` and replace with your desired name.
4. `npm install` to install dependencies.
5. `npm run build` to build the plugin.
6. Register plugin in `src/plugins/index.ts`.

See `src/plugins/research-plugin` as an example.

