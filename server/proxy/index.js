const _ = require('lodash');
const axios = require('axios');
const chalk = require('chalk');
const config = require('../../config');

module.exports = app => {
  let base = _.get(config, 'server.proxy.base');

  if (!base) {
    console.warn('%s is not set; assuming "%s"', chalk.bold.cyan('config.server.proxy.base'), chalk.bold.cyan('/api'));
    base = '/api';
  }

  app.all(base + '/*', require('body-parser').json());

  _.get(config, 'server.proxy.mock') ? require('../mockapi')(app, base) : api();

  function api() {
    if (!_.get(config, 'server.proxy.target')) {
      console.error('If using the API proxy without mock enabled, config.server.proxy.target must be set');
      process.exit(1);
    }

    app.all(base + '/*', function ({method, params, body}, res) {
      let headers = _.get(config, 'server.proxy.headers') || {};

      if (method === 'POST') {
        headers['Content-Type'] = 'application/json';
      }

      const options = { url: config.server.proxy.target + '/' + params[0], method, headers, data: body };

      axios(options)
        .then(function (response) {
          res.json(response.data).end();
        })
        .catch(err => {
          console.error(err.config);

          if (err.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            console.error(err.response);
            res.status(err.response.status).end(err.response.statusText);
          } else if (err.request) {
            // The request was made but no response was received. `err.request` is an instance of XMLHttpRequest
            // in the browser, and an instance of http.ClientRequest in node.js
            console.error(err.request);
            res.status(0).end('No Response');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.error('ERR:', err.message);
            res.status(500).end(err.message);
          }
        });
    });
  }
};
