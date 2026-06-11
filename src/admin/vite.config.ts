import { mergeConfig, type UserConfig } from 'vite';

/**
 * `resolve.dedupe` fixes the production-only crash
 * "Uncaught TypeError: N is not a function" (runHookWaterfall undefined) in the
 * custom-content-manager3 plugin.
 *
 * The plugin is built as a separate package and ships prebuilt ESM chunks that
 * `import ... from "@strapi/strapi/admin"`. Because the plugin is installed on its
 * own (its own node_modules), production module resolution bound those imports to
 * the plugin's *nested* @strapi/admin copy, creating a SECOND `StrapiApp` React
 * context. The host app mounts the provider on its own copy, so the plugin's
 * `useStrapiApp(...)` subscribed to a provider-less context and silently received
 * `undefined`. dedupe forces every singleton-sensitive package to resolve to ONE
 * copy (the host's), so plugin and host share the same React contexts.
 */
const DEDUPE = [
  '@strapi/admin',
  '@strapi/strapi',
  '@strapi/design-system',
  '@strapi/icons',
  'use-context-selector',
  'react',
  'react-dom',
  'react-router-dom',
  'react-redux',
  '@reduxjs/toolkit',
  'react-intl',
  'react-query',
  'styled-components',
];

export default (config: UserConfig) => {
  return mergeConfig(config, {
    resolve: {
      dedupe: DEDUPE,
    },
    server: {
      allowedHosts: ['groups.inf.ed.ac.uk']
    }
  });
};
