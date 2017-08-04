const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const productionLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
    }
  },
  { loader: 'postcss-loader' }
];

let devLoaders = [{ loader: 'vue-style-loader' }].concat(_.clone(productionLoaders, true));
devLoaders.forEach(loader => _.set(loader, 'options.sourceMap', true));

module.exports = {
  test: /\.css$/,
  use: isProd
    ? ExtractTextPlugin.extract({
      use: productionLoaders,
      fallback: 'vue-style-loader'
    })
    : devLoaders
};