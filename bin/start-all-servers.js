const chalk = require('chalk');
const forever = require('forever-monitor');
const path = require('path');

const mongo = require('../config/keystone.config').mongo;
const serverDirectory = path.resolve(__dirname, '../server');
let processes = {};

processes.server = new (forever.Monitor)(path.join(serverDirectory, 'index.js'), {
  max: 1,
  args: ['--color'],
  watch: true,
  watchIgnoreDotFiles: true,
  watchDirectory: serverDirectory
});

processes.server.on('watch:restart', function(info) {
  console.log('\n%s: detected change to %s', chalk.bold.green('(restart)'), chalk.cyan(info.stat));
});

console.log('------------------------------------------------');
console.log('Starting MongoDB...');

processes.db = forever.start(['mongod'], {
  max: 1,
  silent: true
});

processes.db.on('start', function () {
  console.log('MongoDB is ready on', chalk.cyan(mongo));

  console.log('------------------------------------------------');
  console.log('\nStarting Node server...');

  processes.server.start();
});

processes.db.on('exit', function () {
  if (processes.server.running) {
    processes.server.stop();
  }
});