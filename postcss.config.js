// Currently, vue-loader only supports postcss.config.js in the project root

module.exports = ({ file, options, env }) => ({
  parser: false,
  plugins: {
    'postcss-cssnext': {},
    'cssnano': env === 'production' ? {} : false
  }
});