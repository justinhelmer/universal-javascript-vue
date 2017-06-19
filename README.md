# Paragon API Test

## Features

- Full [Webpack 2](https://webpack.js.org/) support with [Babel](https://babeljs.io/)
- Fully-isomorphic (universal) javascript boilerplate based on [Vue.js](https://vuejs.org/):
    - Centralized routing using [vue-router](https://github.com/vuejs/vue-router), with a strong focus on component-based architecture
    - Centralized state management / data store using [Vuex](https://github.com/vuejs/vuex) and [vuex-router-sync](https://github.com/vuejs/vuex-router-sync)
    - Centralized API proxy using [Axios](https://github.com/vuejs/vuex), with ready-to-go [data prefetching](https://ssr.vuejs.org/en/data.html)
- Support for priority asset resource [prefetching / preloading](https://www.keycdn.com/blog/resource-hints/)
- Enable/disable server-side rendering with the [flip of a switch](#configuration)
- @TODO - Support for Hot Module Reloading

## When to use this

Some of the possible reasons to choose this over something else:

- If you want a fully-isomorphic (universal) boilerplate that isn't too abstracted, is simple to understand, and can
  easily and quickly be adapted to your needs.
- If you have tried (or looked into) these, but found them too abstracted, or require too much boilerplate code:
    - [Electrode](http://www.electrode.io/)
    - [Next.js](https://zeit.co/blog/next2)
    - [Nuxt](https://nuxtjs.org/)
       * Special thanks to the developers of Nuxt for articulating the building blocks of `Vue.js` so well.
- If you don't want to use [React](https://facebook.github.io/react/) / [Redux](https://facebook.github.io/react/)

## Setup

```bash
npm install
```

```bash
npm run build
```

```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## Configuration

The following config properties (`config/index.js`) are recognized by the boilerplate:

```js
module.exports = {
  // enable/disable server-side rendering. defaults to false if not set
  ssr: true,

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
    title: 'Paragon | The Sacred Order'
  }
};
```

