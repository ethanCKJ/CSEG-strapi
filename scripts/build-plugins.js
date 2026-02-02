const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pluginsDir = path.join(__dirname, '..', 'src', 'plugins');
const excludedPlugins = ['shared','tester-plugin']

if (fs.existsSync(pluginsDir)) {
  const plugins = fs.readdirSync(pluginsDir);

  plugins.forEach((plugin) => {
    const pluginPath = path.join(pluginsDir, plugin);
    if (!excludedPlugins.includes(plugin)){

      const packageJsonPath = path.join(pluginPath, 'package.json');

      if (fs.existsSync(packageJsonPath)) {
        console.log(`Building plugin: ${plugin}`);

        // Delete dist folder if it exists
        const distPath = path.join(pluginPath, 'dist');
        if (fs.existsSync(distPath)) {
          console.log(`Deleting dist folder for ${plugin}`);
          fs.rmSync(distPath, { recursive: true, force: true });
        }

        try {
          // Build admin panel
          execSync('npm run build', {
            cwd: pluginPath,
            stdio: 'inherit',
          });
          console.log(`✓ Successfully built ${plugin}`);
        } catch (error) {
          console.error(`✗ Failed to build ${plugin}:`, error.message);
          process.exit(1);
        }
      }
    }
  });
}



console.log('All plugins built successfully!');