const keystone = require('keystone');
const responseHandler = require('../../lib/response-handler');

module.exports = (app, base) => {
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
};