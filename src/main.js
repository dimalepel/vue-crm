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
