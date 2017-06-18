var path = require('path');
var webpack = require('webpack');

var config = {
  devtool: 'source-map',
  context: path.resolve(__dirname, '../src'),
  // entry: [
    // 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    // './app.js'
  // ],
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
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
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
};

module.exports = config;
