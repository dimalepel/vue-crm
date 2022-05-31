import { createApp } from 'vue';
import messagePlugin from '@/utils/message.plugin';
import Paginate from 'vuejs-paginate-next';
import Loader from '@/components/app/Loader.vue';
import firebase from 'firebase/compat/app';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';

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
      .use(messagePlugin)
      .use(store)
      .use(router)
      .mount('#app');

    app.component('Paginate', Paginate);
    app.component('Loader', Loader);
  }
});
