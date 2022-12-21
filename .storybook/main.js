const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.plugins.push(new NodePolyfillPlugin())
    config.resolve.fallback = {
      fs: require.resolve('browserify-fs'),
    }

    return config
  },
}
