const axios = require('axios');
const chalk = require('chalk');
const config = require('../../config');
const path = require('path');

module.exports = function proxy(server) {
  let base = config.proxy.base;

  if (!base) {
    console.warn(chalk.bold.cyan('config.proxy.base') + ' is not set; assuming ' + chalk.bold.cyan('"/api"'));
    base = '/api';
  }

  server.all(base + '/*', require('body-parser').json());

  config.proxy.mock ? mockapi() : api();

  function mockapi() {
    const jsonServer = require('json-server');
    const router = jsonServer.router(path.resolve(__dirname, './db.json'));
    server.use(base, router);
    console.info(chalk.bold.green('all api proxy requests are being mocked'));
  }

  function api() {
    if (!config.proxy.target) {
      console.error('If using the API proxy without mock enabled, config.proxy.target must be set');
      process.exit(1);
    }

    server.all(base + '/*', function (req, res) {
      const options = {
        method: req.method,
        url: config.proxy.target + '/' + req.params[0],
        headers: Object.assign(req.method === 'POST' ? {'Content-Type': 'application/json'} : {}, config.proxy.headers || {}),
        data: req.body
      };

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
