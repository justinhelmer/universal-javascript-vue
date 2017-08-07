var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);

var config = {
  devtool: isProd ? false : 'cheap-module-source-map',
  context: resolve('../src'),
  output: {
    path: resolve('../dist'),
    publicPath: '/dist/',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      require('./vue-loader.config'),
      require('./css-loader.config'),
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
    ? [
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false }
      }),

      new ExtractTextPlugin({
        filename: 'common.[chunkhash].css'
      })
    ]
    : [
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['You application is running at http://localhost:3000'],
        }
      })
    ]
};

module.exports = config;
