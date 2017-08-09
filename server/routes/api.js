const keystone = require('keystone');
const config = require('../../config');
const uidCookie = require('../lib/uid-cookie');

module.exports = app => {
  let base = config.api.base;

  if (!base) {
    console.warn('%s is not set; assuming "%s"', chalk.bold.cyan('config.api.base'), chalk.bold.cyan('/api'));
    base = '/api';
  }

  config.api.mock ? require('../mockapi')(app, base) : api();

  function api() {
    app.get(base + '/user/:id', (req, res, next) => {
      console.log(req.session);
      console.log(req.user);
      next();
    });

    // keystone DB query
    app.get(base + '/:list/:id?', [
      (req, res, next) => {
        try {
          res.locals.KeystoneList = keystone.list(req.params.list);
          next();
        } catch (e) {
          res.status(404).send('Keystone resource "' + req.params.list + '" does not exist.').end();
        }
      },

      (req, res) => {
        let query;

        if (req.params.id) {
          query = res.locals.KeystoneList.model.findById(req.params.id);
        } else {
          query = res.locals.KeystoneList.model.find();
        }

        query.exec((err, result) => responseHandler(req, res, err, result));
      }
    ]);
  }
};

function responseHandler(req, res, err, result) {
  if (err) {
    console.error(err);
    res.status(500).send(err).end();
  } else {
    res.send(result).end();
  }
}
