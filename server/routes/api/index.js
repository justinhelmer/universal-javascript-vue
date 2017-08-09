const chalk = require('chalk');
const config = require('../../../config');

module.exports = app => {
  let base = config.api.base;

  if (!base) {
    console.warn('%s is not set; assuming "%s"', chalk.bold.cyan('config.api.base'), chalk.bold.cyan('/api'));
    base = '/api';
  }

  if (config.api.mock && process.env.NODE_ENV !== 'production') {
    require('../../mockapi')(app, base);
  } else {
    require('./user')(app, base);
    require('./query')(app, base);
  }
};
