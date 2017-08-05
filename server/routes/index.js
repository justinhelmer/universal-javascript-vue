module.exports = app => {
  require('./static')(app);
  require('../keystone')(app);
  require('../proxy')(app);
  require('./app')(app);
};