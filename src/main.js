import Vue from 'vue'
import App from './App.vue'
import router from './router';
// main.js
// 在生产环境中让sentry报错

import * as Sentry from '@sentry/browser';
import { Vue as VueIntegration } from '@sentry/integrations';
import './assets/styles/main.scss';
import {config} from './config/index.js'

console.log(config);
// process.env.NODE_ENV === "production" &&
Sentry.init({
  dsn: config.sentryDsn,
  // release: 'test-1.0.3',
  integrations: [new VueIntegration({Vue, attachProps: true})],
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
