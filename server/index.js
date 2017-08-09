const keystone = require('keystone');
require('./models');

keystone.init(require('../config/keystone.config'));
keystone.set('routes', require('./routes'));

keystone.start();