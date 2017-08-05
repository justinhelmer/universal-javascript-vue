const keystone = require('keystone');
const Item = keystone.list('item');

module.exports = done => {
  Promise.all([
    new Promise(resolve => {
      new Item.model({
        name: 'Item 1'
      }).save(() => resolve());
    }),

    new Promise(resolve => {
      new Item.model({
        name: 'Item 2'
      }).save(() => resolve());
    })
  ]).then(() => done());
};