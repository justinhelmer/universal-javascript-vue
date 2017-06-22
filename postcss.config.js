// Currently, vue-loader only supports postcss.config.js in the project root

module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    'postcss-import': { from: './src/css' },
    'postcss-mixins': { mixins: require('./src/css/global/mixins') },
    'postcss-icss-values': {},
    'postcss-cssnext': {},
    'cssnano': env === 'production' ? {} : false
  }
});