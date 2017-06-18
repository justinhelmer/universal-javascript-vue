const config = require('../config');
const fs = require('fs');
const path = require('path');

module.exports = function (server) {
  const indexHTML = fs.readFileSync(path.resolve(__dirname, '../src/index.html'), 'utf8');

  config.ssr ? serveAppWithSSREnabled() : serveAppWithSSRDisabled();

  /**
   * With SSR enabled, vue-server-renderer will render the entire content in <!--vue-ssr-outlet--> of index.html
   *
   * The createApp() function is exported by src/main.server.js, and loaded through the server bundle generated
   * by webpack.server.config.js. createApp() generates a new context. @see https://ssr.vuejs.org/en/structure.html
   *
   * @see https://ssr.vuejs.org/en/structure.html
   * @see ./src/main.server.js
   */
  function serveAppWithSSREnabled() {
    const renderer = require('vue-server-renderer').createRenderer({
      template: indexHTML
    });

    const createApp = require('../dist/server.bundle.js').default;

    server.get('*', (req, res) => {
      const context = Object.assign({}, config.template || {}, {
        url: req.url
      });

      createApp(context)
        .then(app => {
          renderer.renderToString(app, context, (err, html) => {
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
        .catch(err => {
          // error comes from src/main.server.js
          console.error('ERR:', '-', req.url, err);
        });
    });
  }

  /**
   * With SSR disabled, the empty (but compiled) index.html file will be served on every request.
   *
   * Uses the compile logic that vue-server-render uses internally. Both the same compile library (lodash.template)
   * and the same compile options are being used. @see vue-server-renderer/build.js - parseTemplate().
   *
   * In addition, appends '<div id="app"></div>' to the HTML body.
   *     - With SSR enabled, this root element is injected by the vue-server-render when src/main.server.js
   *       loads src/core/app. This in-turn loads App.vue which has the <div id="app"></div> wrapper.
   *     - With SSR disabled, src/main.client.js will attempt to mount to #app, so it therefore must exist.
   *
   * This function is intended to be called only once when the server is started, due to its high computation.
   *
   * @see vue-server-renderer/build.js - parseTemplate().
   */
  function serveAppWithSSRDisabled() {
    const compile = require('lodash.template');

    const compileOptions = {
      escape: /{{([^{][\s\S]+?[^}])}}/g,
      interpolate: /{{{([\s\S]+?)}}}/g
    };

    const closure = indexHTML.indexOf('</body>');
    const head = indexHTML.substr(0, closure); // everything up to the closing body tag
    const neck = '<div id="app"></div>';
    const tail = indexHTML.substr(closure); // everything after the closing body tag

    const compiledIndexHTML = compile(head + neck + tail, compileOptions)(config.template || {});

    server.get('*', (req, res) => res.end(compiledIndexHTML));
  }
};