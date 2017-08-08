const path = require('path');
const pkg = require('../package.json');
const config = require('../config');

module.exports = {
  'name': config.title,
  'favicon': '../public/logo-48.png',
  'mongo': 'mongodb://localhost:27017/' + pkg.name,
  'updates': path.resolve(__dirname, '../server/keystone/updates'),
  'auto update': true,

  'port': config.port,
  'session': true,
  'auth': true,
  'user model': 'user',
  'cookie secret': '24634sdfhsdfgh346y34',
  'logger options': {
    skip: (req, res) => res.statusCode < 400
  }
};