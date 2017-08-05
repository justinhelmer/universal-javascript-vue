const compression = require('compression');
const express = require('express');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';
const serve = (relativePath, cache) => express.static(path.resolve(__dirname, relativePath), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
});

module.exports = app => {
  app.use(compression({ threshold: 0 }));
  app.use('/dist', serve('../../dist', true));
  app.use('/public', serve('../../public', true));
};