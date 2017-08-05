module.exports = {
  title: 'Universal JavaScript - Vue',
  server: {
    port: process.env.PORT || 3000,
    keystone: {
      base: '/cms',
      mock: false
    },
    proxy: {
      base: '/api',
      target: '',
      headers: {},
      mock: true
    }
  }
};