require('dotenv').load();

module.exports = {
  proxy: {
    target: 'https://developer-paragon.epicgames.com',
    headers: {
      'X-Epic-ApiKey': process.env.EPIC_API_KEY
    }
  },
  template: {
    title: 'Paragon | The Sacred Order'
  }
};