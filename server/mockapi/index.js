const chalk = require('chalk');
const cookie = require('cookie');
const jsonServer = require('json-server');
const path = require('path');
const fixtures = require('./fixture.json');
const uidCookie = require('../lib/uid-cookie');

module.exports = (app, base) => {
  const user = fixtures.users[0];

  app.use((req, res, next) => {
    let cookies = cookie.parse(req.headers.cookie || '');

    if (!cookies.uid) {
      req.headers.cookie += '; ' + cookie.serialize('uid', '1');
    }

    req.user = user;
    next();
  });

  app.post(base + '/user/login', (req, res) => {
    uidCookie.set(req, res);
    res.json(req.user).end();
  });

  app.use(base + '/user/logout', (req, res) => {
    uidCookie.remove(req, res);
    res.json({}).end();
  });

  app.get(base + '/users/:id', (req, res) => {
    res.json(req.user).end();
  });

  const router = jsonServer.router(path.resolve(__dirname, './fixture.json'));
  router.db._.mixin({ __id: () => '_id' });
  app.use(base, router);

  console.info('All "%s" requests are being mocked...', chalk.bold.green(base));
};