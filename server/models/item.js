const keystone = require('keystone');
const Types = keystone.Field.Types;

const Item = new keystone.List('item');

Item.add({
  name: { type: Types.Text, initial: true, required: true, index: true }
});

Item.register();