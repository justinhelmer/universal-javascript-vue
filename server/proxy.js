const axios = require('axios');
const config = require('../config');

module.exports = function proxy(server) {
  if (!config.proxy.target) {
    console.error('If using config.proxy, config.proxy.target must be set');
    return;
  }

  let base = config.proxy.base;

  if (!base) {
    console.warn('config.proxy.base is not set; assuming "/api"');
    base = '/api';
  }

  server.all(base + '/*', [
    require('body-parser').json(),

    function (req, res) {
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
    },
  ]);
}
