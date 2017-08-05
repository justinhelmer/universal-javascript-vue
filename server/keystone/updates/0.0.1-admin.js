const keystone = require('keystone');
const User = keystone.list('user');

module.exports = done => {
  new User.model({
    name: { first: 'Admin', last: 'User' },
    email: 'admin@admin.com',
    password: 'admin',
    canAccessKeystone: true
  }).save(done);
};
