/**
 * Webpack configuration for generating the client bundle.
 *
 * The CommonsChunkPlugin splits the webpack runtime into a leading chunk so that async chunks can be
 * injected right after it. This also enables better caching for app/vendor code.
 *
 * The VueSSRClientPlugin generates dist/vue-ssr-client-manifest.json,
 *
 * @see https://ssr.vuejs.org/en/build-config.html
 * @see https://css-tricks.com/prefetching-preloading-prebrowsing/
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

module.exports = merge(baseConfig, {
  entry: './main.client.js',
  output: {
    filename: '[name].js',
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    new VueSSRClientPlugin()
  ]
});
