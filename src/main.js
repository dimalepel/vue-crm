import { createApp } from 'vue';
import messagePlugin from '@/utils/message.plugin';
import Loader from '@/components/app/Loader.vue';
import Paginate from 'vuejs-paginate-next';
import firebase from 'firebase/compat/app';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import { createMetaManager } from 'vue-meta';
import App from './App.vue';
import router from './router';
import store from './store';
import tooltipDirective from './directives/tooltip.directive';
import localizeFilter from './filters/localize.filter';
import 'materialize-css/dist/js/materialize.min';
import './registerServiceWorker';
import 'firebase/compat/auth';
import 'firebase/compat/database';

firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
      .use(store)
      .use(router)
      .use(messagePlugin)
      .use(createMetaManager())
      .component('Loader', Loader)
      .component('Paginate', Paginate)
      .directive('tooltip', tooltipDirective);

    app.config.globalProperties.$filters = {
      localizeFilter(value) {
        return localizeFilter(value);
      },
      dateFilter(value, format = 'date') {
        return dateFilter(value, format);
      },
      currencyFilter(value, currency = 'BYN') {
        return currencyFilter(value, currency);
      },
    };

    app.mount('#app');
  }
});
