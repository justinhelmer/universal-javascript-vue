const keystone = require('keystone');
require('./keystone/models');

keystone.init(require('../config/keystone.config'));
keystone.set('routes', require('./routes'));

keystone.start();