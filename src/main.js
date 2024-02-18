import './assets/main.css';

import { createApp } from 'vue';
import router from './modules/router.js';
import App from './App.vue';

const app = createApp(App);
app.use(router);
app.mount('#app');
