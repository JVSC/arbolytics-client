import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { VueQueryPlugin } from 'vue-query';
import router from './router';

createApp(App).use(router).use(VueQueryPlugin).mount('#app');
