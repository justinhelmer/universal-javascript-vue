const _ = require('lodash');
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
    // user login
    app.post(base + '/user/login', (req, res) => {
      if (!req.body.email || !req.body.password) {
        return res.status(401).json({ error: 'email and password required' });
      }

      keystone.session.signin({ email: req.body.email, password: req.body.password }, req, res, function(result) {
        uidCookie.set(req, res);
        responseHandler(res, null, _.omit(req.user, 'password'));
      }, function(err) {
        responseHandler(res, err);
      });
    });

    // user logout
    app.post(base + '/user/logout', (req, res) => {
      keystone.session.signout(req, res, function(err) {
        uidCookie.remove(req, res);
        responseHandler(res, err, {});
      });
    });

    // restrict GET users/:id to the active user session
    app.get(base + '/users/:id', (req, res, next) => {
      if (req.user && req.user._id.toString() === req.params.id) {
        return next();
      }

      return res.sendStatus(404).end();
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

        query.exec((err, result) => responseHandler(res, err, result));
      }
    ]);
  }
};

function responseHandler(res, err, result) {
  if (err) {
    console.error(err);
    res.status(500).send(err).end();
  } else {
    res.json(result).end();
  }
}
