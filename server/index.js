const config = require('../config');
const express = require('express');
const server = express();
const enableProxyServer = () => require('./proxy')(server);
const enableStaticFileServer = () => server.use('/dist', express.static('dist'));
const enableAppServer = () => require('./app-server')(server);
const startServer = () => server.listen(process.env.PORT || 3000);

if (config.proxy) {
  enableProxyServer();
}

enableStaticFileServer();
enableAppServer(); // should be the last thing attached to the server before starting it
startServer();
