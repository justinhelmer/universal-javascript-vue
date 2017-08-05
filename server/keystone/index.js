const _ = require('lodash');
const keystone = require('keystone');
const config = require('../../config');

module.exports = app => {
  let base = _.get(config, 'server.keystone.base');

  if (!base) {
    console.warn('%s is not set; assuming "%s"', chalk.bold.cyan('config.server.keystone.base'), chalk.bold.cyan('/cms'));
    base = '/cms';
  }

  _.get(config, 'server.keystone.mock') ? require('../mockapi')(app, base) : cms();

  function cms() {
    app.get(base + '/:endpoint/:id?', (req, res) => {
      const List = keystone.list(req.params.endpoint);
      let query;

      if (req.params.id) {
        query = List.model.findById(req.params.id);
      } else {
        query = List.model.find();
      }

      query.exec((err, result) => responseHandler(req, res, err, result));
    });
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