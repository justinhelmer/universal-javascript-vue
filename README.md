# universal-javascript-vue-example

An example application using [Universal Javascript - Vue](https://github.com/justinhelmer/universal-javascript-vue).

## Installation

```bash
npm install universal-javascript-vue-example
```

## Setup

**Requires Node.js 6+**

```bash
# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:3000
npm run dev

# build for production
npm run build

# serve in production mode
npm start
```

## Configuration

The following config properties (`config/index.js`) are recognized by the boilerplate:

```js
module.exports = {
  // object passed to index.template.html
  template: {
    title: 'Your App Title'
  },

  // the API proxy will be enabled if this configuration object exists
  proxy: {
    // HTTP requests made within the application code that begin
    // with this base will be proxied. defaults to '/api' if not set
    base: '/api',

    // target URL, for proxied requests
    target: 'https://api.example-host.com',

    // headers to pass along to the proxy server
    headers: {},

    // mock the api data
    mock: true
  }
};
```

## License

MIT

