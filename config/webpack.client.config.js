/**
 * Webpack configuration for generating the client bundle.
 *
 * The CommonsChunkPlugin does the following:
 *   - extracts all vendor dependencies (i.e. node_modules) into a chunk for better caching
 *   - extracts the webpack runtime and manifest into a chunk to avoid vendor chunk hash changing on every build
 *
 * The VueSSRClientPlugin generates dist/vue-ssr-client-manifest.json, to allow for preloading and prefetching
 * of priority assets.
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
  entry: {
    app: './main.client.js'
  },
  node: {fs: 'empty'},
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"client"'
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',

      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    new VueSSRClientPlugin()
  ]
});
