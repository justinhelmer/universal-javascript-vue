const _ = require('lodash');
const Foundation = require('foundation-sites/js/foundation.core').Foundation;

module.exports = function(options = {}) {
  _.defaults(options, {
    plugins: []
  });

  options.plugins.forEach(plugin => {
    Foundation.plugin(require('foundation-sites/js/foundation.' + _.lowerFirst(plugin))[plugin], plugin);
  });
};