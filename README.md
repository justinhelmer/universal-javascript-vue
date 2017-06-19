# Paragon API Test

A fully-isomorphic (universal) javascript boilerplate based on [Vue.js](https://vuejs.org/).

## When to use this

Some of the possible reasons to choose this over something else:

- If you want a fully-isomorphic (universal) boilerplate that isn't too abstracted, is simple to understand, and can
  easily and quickly be adapted to your needs (nuts-and-bolts).
- If you have tried (or looked into) these, but found them too abstracted, or require too much boilerplate code:
    - [Electrode](http://www.electrode.io/)
    - [Next.js](https://zeit.co/blog/next2)
    - [Vue](https://vuejs.org/)
    - [Nuxt](https://nuxtjs.org/) _- Special thanks to the developers of Vue/Nuxt for articulating the building blocks of `Vue.js` so well._
- If you don't want to use [React](https://facebook.github.io/react/) / [Redux](https://facebook.github.io/react/)

## Features

- Full [Webpack 2](https://webpack.js.org/) with the following optimizations:
    - Support for [Vue](https://vuejs.org/) using [vue-loader](https://github.com/vuejs/vue-loader)
    - Support for [Babel](https://babeljs.io/) using [babel-loader](https://github.com/babel/babel-loader)
    - Uses the [CommonsChunkPlugin](https://webpack.js.org/plugins/commons-chunk-plugin/) to do the following:
        - Extracts all vendor dependencies (i.e. `node_modules`) into a chunk for better caching
        - Extracts the webpack runtime and manifest into a chunk to avoid vendor chunk hash changing on every build
- Centralized routing using [vue-router](https://github.com/vuejs/vue-router), with a strong focus on component-based architecture (code splitting)
- Centralized state management and DOM hydration using [Vuex](https://github.com/vuejs/vuex) and [vuex-router-sync](https://github.com/vuejs/vuex-router-sync)
- Centralized API proxy using [Axios](https://github.com/vuejs/vuex), with ready-to-go [data prefetching](https://ssr.vuejs.org/en/data.html)
- Support for priority asset resource [prefetching / preloading](https://www.keycdn.com/blog/resource-hints/)
- Optimized production bundling that does the following:
     - Uglifies/minifies the final bundles using the [Webpack UglifyJS Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
     - Uses the [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) to extract compiled CSS into a chunk
       to load the CSS bundle in parallel to the JS bundle
- Full support for [HMR](https://webpack.js.org/concepts/hot-module-replacement/), with both client and server bundles configured with hot reloading
  using [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Setup

**Requires Node.js 6+**

``` bash
# install dependencies
npm install

# serve in dev mode, with hot reload at localhost:3000 (or `process.env.PORT`)
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
  // The API proxy will be enabled if this configuration object exists
  proxy: {
    // HTTP requests made within the application code that begin
    // with this base will be proxied. defaults to '/api' if not set
    base: '/api',

    // The target URL, for proxied requests
    target: 'https://api.example-host.com',

    // Headers to pass along to the proxy server
    headers: {}
  },
  template: {
    title: 'Your App Title'
  }
};
```

## License

MIT

