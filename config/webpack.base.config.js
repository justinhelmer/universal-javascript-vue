var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

var config = {
  devtool: isProd ? false : 'cheap-module-source-map',
  context: path.resolve(__dirname, '../src'),
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: isProd,
          preserveWhitespace: false
        }
      },
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
      {
        test: /\.s?css$/,
        use: isProd
          ? ExtractTextPlugin.extract({
            use: 'vue-style-loader!css-loader?minimize!sass-loader',
            fallback: 'vue-style-loader'
          })
          : ['vue-style-loader', {
              loader: 'css-loader',
              options: { modules: true, importLoaders: 1 }
            },
            'sass-loader'
          ]
      }
    ]
  },
  resolveLoader: {
    alias: {
      // vue-loader infers the loader to use from the "lang" attribute, i.e. <style lang="scss">.
      // Therefore we must alias scss-loader to sass-loader to process SCSS in .vue files
      'scss-loader': 'sass-loader'
    },
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
