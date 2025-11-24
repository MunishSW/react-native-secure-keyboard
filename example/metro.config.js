const path = require('path');
const { getDefaultConfig } = require('@expo/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});

config.resolver.unstable_enablePackageExports = true;

// Fix for "Invalid hook call" - ensure only one copy of React is used
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === 'react' ||
    moduleName === 'react-native' ||
    moduleName === 'react/jsx-runtime'
  ) {
    const pathToResolve = path.resolve(
      __dirname,
      'node_modules',
      moduleName
    );
    return {
      type: 'sourceFile',
      filePath: require.resolve(moduleName, {
        paths: [pathToResolve],
      }),
    };
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
