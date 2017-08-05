const forever = require('forever-monitor');
const path = require('path');

const mongo = require('../config/keystone.config').mongo;
let processes = {};

processes.server = new (forever.Monitor)(path.resolve(__dirname, '../server/index.js'), {
  max: 1,
  args: ['--color']
});

processes.server.on('exit', function () {
  if (processes.db.running) {
    processes.db.stop();
  }
});

console.log('------------------------------------------------');
console.log('Starting MongoDB...');

processes.db = forever.start(['mongod'], {
  max: 1,
  silent: true
});

processes.db.on('start', function () {
  console.log('MongoDB is ready on', mongo);

  console.log('------------------------------------------------');
  console.log('Starting Node server...');

  processes.server.start();
});

processes.db.on('exit', function () {
  if (processes.server.running) {
    processes.server.stop();
  }
});