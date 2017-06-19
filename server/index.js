const config = require('../config');
const express = require('express');
const path = require('path');
const server = express();

const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);

const enableProxyServer = () => require('./proxy')(server);

const enableStaticFileServer = () => {
  server.use([
    require('compression')({ threshold: 0 }),
    require('serve-favicon')(resolve('../public/logo-48.png')),
  ]);

  const serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
  });

  server.use('/dist', serve('../dist', true));
  server.use('/public', serve('../public', true));
};

const enableAppServer = () => require('./app-server')(server);

const startServer = () => {
  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`server started at localhost:${port}`);
  });
};

if (config.proxy) {
  enableProxyServer();
}

enableStaticFileServer();
enableAppServer(); // should be the last thing run before starting it
startServer();
