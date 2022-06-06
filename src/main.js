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
  apiKey: 'AIzaSyDcyTvoMFFiGXdyg6VjUimk4f-H9nVfnIo',
  authDomain: 'vue-crm-51e0a.firebaseapp.com',
  projectId: 'vue-crm-51e0a',
  storageBucket: 'vue-crm-51e0a.appspot.com',
  messagingSenderId: '666895786848',
  appId: '1:666895786848:web:63c7d7c040c2a40f8cb405',
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
