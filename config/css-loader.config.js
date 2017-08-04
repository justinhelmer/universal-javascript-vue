const _ = require('lodash');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const productionLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: true,
      alias: {
        '../fonts': path.resolve(__dirname, '../node_modules/font-awesome/fonts'),
      }
    }
  },
  { loader: 'postcss-loader' },
  { loader: 'sass-loader',
    options: {
      includePaths: [
        path.resolve(__dirname, '../node_modules/motion-ui/src'),
        path.resolve(__dirname, '../node_modules/foundation-sites/scss'),
        path.resolve(__dirname, '../node_modules/font-awesome/scss')
      ]
    }
  }
];

let devLoaders = [{ loader: 'vue-style-loader' }].concat(_.clone(productionLoaders, true));
devLoaders.forEach(loader => _.set(loader, 'options.sourceMap', true));

module.exports = {
  test: /\.(css|scss)$/,
  use: isProd
    ? ExtractTextPlugin.extract({
      use: productionLoaders,
      fallback: 'vue-style-loader'
    })
    : devLoaders
};
