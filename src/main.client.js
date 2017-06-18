import { createApp } from './core/app';
const { app, router } = createApp();

router.onReady(() => {
  app.$mount('#app');
});