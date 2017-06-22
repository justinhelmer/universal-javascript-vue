// global mixins - https://github.com/postcss/postcss-mixins

module.exports = {
  font: function (mixin, fontSize) {
    const lineHeightMultiplier = 1.5;

    return {
      '&': {
        'font-size': fontSize,
        'line-height': 'calc(' + fontSize + ' * ' + lineHeightMultiplier + ')'
      }
    };
  }
};