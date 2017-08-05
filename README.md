# Universal JavaScript - Vue

A fully-isomorphic (universal) ECMAScript 6 boilerplate based on [Vue.js](https://vuejs.org/).

> For a more complete framework based on similar technologies, consider [Nuxt](https://nuxtjs.org/).
> If you are looking for something more nuts-and-bolts, and/or are interested in the additional [features](#features)
> offered, then you came to the right place.

## When to use this

Some of the possible reasons to choose this over something else:

- If you want a fully-isomorphic (universal) boilerplate that isn't too abstracted, is simple to understand, and can
  easily and quickly be adapted to your needs (nuts-and-bolts).
- If you have tried (or looked into) these, but found them too abstracted, or require too much boilerplate code:
    - [Electrode](http://www.electrode.io/)
    - [Next.js](https://zeit.co/blog/next2)
    - [Vue](https://vuejs.org/)
    - [Nuxt](https://nuxtjs.org/)
- If you don't want to use [React](https://facebook.github.io/react/) / [Redux](https://facebook.github.io/react/) (see this [comparison guide](https://vuejs.org/v2/guide/comparison.html#React))

## Features

The following features are _centralized_, meaning they run both client-side and server-side:
  - Centralized routing using [vue-router](https://github.com/vuejs/vue-router), with a strong focus on code-splitting (JS+CS+HTML components)
  - Centralized state management using [Vuex](https://github.com/vuejs/vuex), and DOM hydration using [vuex-router-sync](https://github.com/vuejs/vuex-router-sync)
  - _(optional)_ Centralized API proxy using [Axios](https://github.com/vuejs/vuex), with ready-to-go [data prefetching](https://ssr.vuejs.org/en/data.html) and a built-in mock server using [JSON Server](https://github.com/typicode/json-server).

In addition:
- Full [Babel](https://babeljs.io/) support
- Full [Vue](https://vuejs.org/) support
- Full [Hot reloading (HMR)](https://webpack.js.org/concepts/hot-module-replacement/) support
- Full [CSS Modules](https://glenmaddern.com/articles/css-modules) and [cssnext](http://cssnext.io/) support, with [SASS](http://sass-lang.com/) integration
- _(optional)_ Full [Foundation](http://foundation.zurb.com/) integration
- _(optional)_ Full [Font Awesome](http://fontawesome.io/) integration
- _(optional)_ Full content management system (CMS) built on [KeystoneJS](http://keystonejs.com/)
- [Webpack 2](https://webpack.js.org/) integration, with the following chunk optimizations:
  - Extracts all vendor dependencies (i.e. `node_modules`) into a separate chunk for better caching
  - Extracts the `webpack` runtime and manifest into a named chunk to avoid hash changing on every build
- Support for priority asset resource [prefetching / preloading](https://www.keycdn.com/blog/resource-hints/)
- Automatically inlines the CSS necessary to render the components served by each chunk
- Optimized production bundling that does the following:
     - Uglifies/minifies the final chunks using the [Webpack UglifyJS Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin)
     - Optimized CSS using [cssnano](http://cssnano.co/)
     - Loads compiled CSS and javascript in parallel using the [ExtractTextPlugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)

## Architecture Overview

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**A detailed Vue SSR guide can be found [here](https://ssr.vuejs.org).**

## Installation

**Requires Node.js 6+**

Install the [Yeoman](http://yeoman.io/) generator:

```bash
npm install -g yo
npm install -g generator-universal-javascript-vue
```

Scaffold new projects using the generator:

```bash
mkdir my-project; cd my-project
yo universal-javascript-vue
npm install
```

## Building and serving the app

```bash
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
  title: 'Universal JavaScript - Vue',
  client: {
    // only applicable if using Foundation (yeoman generator option)
    foundation: {
      plugins: [] // JS plugins to bundle with the client
    }
  },
  server: {
    port: process.env.PORT || 3000,

    // only applicable if using KeystoneJS (yeoman generator option)
    keystone: {
      base: '/cms',
      mock: false
    },

    // only applicable if using the API proxy (yeoman generator option)
    proxy: {
      base: '/api',
      target: 'https://api.example-host.com',
      headers: {},
      mock: true
    }
  }
};
```

## License

MIT

