const clone = require('lodash.clonedeep');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const set = require('lodash.set');

const isProd = process.env.NODE_ENV === 'production';

const productionLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      modules: true,
      camelCase: 'dashesOnly'
    }
  },
  { loader: 'postcss-loader' }
];

let devLoaders = [{ loader: 'vue-style-loader' }].concat(clone(productionLoaders));
devLoaders.forEach(loader => set(loader, 'options.sourceMap', true));

module.exports = {
  test: /\.css$/,
  use: isProd
    ? ExtractTextPlugin.extract({
      use: productionLoaders,
      fallback: 'vue-style-loader'
    })
    : devLoaders
};