import { mergeConfig, type UserConfig } from 'vite';
import { builtinModules } from 'module';

export default (config: UserConfig) => {
  // Replicate Strapi's approach from @strapi/pack-up
  // This externalizes all Node.js built-in modules to prevent them from being bundled
  // into the browser client code, which would cause errors like "fs is not available"
  const builtinModulesWithNodePrefix = [
    ...builtinModules,
    ...builtinModules.map((modName) => `node:${modName}`)
  ];

  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    optimizeDeps: {
      // Force Vite to pre-bundle styled-components to avoid PostCSS fs.existsSync errors
      include: ['styled-components'],
      esbuildOptions: {
        plugins: [
          {
            name: 'externalize-node-builtins',
            setup(build) {
              // Tell esbuild to mark Node.js built-ins as external during dependency optimization
              // This prevents PostCSS's Node.js code from being processed for the browser
              build.onResolve({ filter: /^(fs|url)$/ }, () => {
                return { external: true };
              });
            },
          },
        ],
      },
    },
    build: {
      rollupOptions: {
        external: (id: string) => {
          // Extract module name from import path
          // Handle both regular imports (e.g., "fs") and scoped packages (e.g., "@strapi/admin")
          const idParts = id.split("/");
          const name = idParts[0]?.startsWith("@")
            ? `${idParts[0]}/${idParts[1]}`
            : idParts[0];

          // Externalize all Node.js built-in modules
          // This prevents modules like fs, path, crypto, etc. from being included in the browser bundle
          if (name && builtinModulesWithNodePrefix.includes(name)) {
            return true;
          }

          return false;
        },
      },
    },
  });
};
