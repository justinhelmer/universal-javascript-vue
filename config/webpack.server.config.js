/**
 * Webpack configuration for generating the server bundle.
 *
 * Externalizes vendor dependencies using webpack=node-externals
 *
 * The VueSSRServerPlugin turns the entire output of the server build into a single JSON file (vue-ssr-server-bundle.json)
 *
 * @see https://webpack.js.org/configuration/externals/#externals
 * @see https://css-tricks.com/prefetching-preloading-prebrowsing/
 */

const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const baseConfig = require('./webpack.base.config.js');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const webpack = require('webpack');

module.exports = merge(baseConfig, {
  target: 'node', // needed by the vue-loader
  devtool: 'source-map',
  entry: './main.server.js',
  output: {
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs2' // needed by the server bundle renderer
  },

  externals: nodeExternals({
    // do not externalize CSS files in case we need to import it from a dep
    whitelist: /\.css$/
  }),

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        VUE_ENV: '"server"'
      }
    }),

    new VueSSRServerPlugin()
  ]
});
