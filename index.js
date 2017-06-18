const express = require('express');
const server = express();
const path = require('path');

require('dotenv').load();

server.use('/dist', express.static('dist'));

if (process.env.SSR_ENABLED) {
  enableSSR();
} else {
  server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './src/index.html'));
  });
}

server.listen(3000);

function enableSSR() {
  const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./src/index.html', 'utf-8')
  });

  const createApp = require('./dist/server.bundle.js').default;

  server.get('*', (req, res) => {
    const context = {url: req.url};

    createApp(context).then(app => {
      renderer.renderToString(app, (err, html) => {
        if (err) {
          if (err.code === 404) {
            res.status(404).end('Page not found');
          } else {
            res.status(500).end('Internal Server Error');
          }
        } else {
          res.end(html);
        }
      })
    })
  });
}
