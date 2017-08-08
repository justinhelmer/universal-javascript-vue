module.exports = app => {
  app.use((req, res, next) => {
    res.locals = {};
    next();
  });

  require('./static')(app);
  require('./api')(app);
  require('./app')(app);
};