import { createApp } from 'vue';
import messagePlugin from '@/utils/message.plugin';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'materialize-css/dist/js/materialize.min';

createApp(App)
  .use(messagePlugin)
  .use(store)
  .use(router)
  .mount('#app');

const firebaseConfig = {
  apiKey: 'AIzaSyDcyTvoMFFiGXdyg6VjUimk4f-H9nVfnIo',
  authDomain: 'vue-crm-51e0a.firebaseapp.com',
  projectId: 'vue-crm-51e0a',
  storageBucket: 'vue-crm-51e0a.appspot.com',
  messagingSenderId: '666895786848',
  appId: '1:666895786848:web:63c7d7c040c2a40f8cb405',
};
