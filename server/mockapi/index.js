const chalk = require('chalk');
const jsonServer = require('json-server');
const path = require('path');

module.exports = (app, base) => {
  const router = jsonServer.router(path.resolve(__dirname, './fixture.json'));
  app.use(base, router);
  router.db._.mixin({ __id: () => '_id' });
  console.info('All "%s" requests are being mocked...', chalk.bold.green(base));
};