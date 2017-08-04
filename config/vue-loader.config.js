const _ = require('lodash');
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  test: /\.vue$/,
  loader: 'vue-loader',
  options: {
    cssSourceMap: !isProd,
    cssModules: {
      localIdentName: '[path][name]---[local]---[hash:base64:5]'
    },
    extractCSS: isProd,
    preserveWhitespace: !isProd
  }
};