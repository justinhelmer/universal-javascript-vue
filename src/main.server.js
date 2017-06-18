import { createApp } from './core/app';

// After all preFetch hooks are resolved, our store is now
// filled with the state needed to render the app.
// When we attach the state to the context, and the `template` option
// is used for the renderer, the state will automatically be
// serialized and inject ed into the HTML as window.__INITIAL_STATE__.
export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();

      if (!matchedComponents.length) {
        reject({ code: 404 });
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({store, route: router.currentRoute});
        }
      })).then(() => {
        context.state = store.state;

        resolve(app);
      }).catch(reject)
    }, reject)
  });
}