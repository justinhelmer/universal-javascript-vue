const _ = require('lodash');
const isProd = process.env.NODE_ENV === 'production';
let scss = require('./css-loader.config').use;

const cssLoader = _.find(scss, { loader : 'css-loader' });
cssLoader.options.modules = false;

module.exports = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    cssSourceMap: !isProd,
    cssModules: {
      localIdentName: '[path][name]---[local]---[hash:base64:5]'
    },
    extractCSS: isProd,
    preserveWhitespace: !isProd,
    loaders: { scss }
  }
};