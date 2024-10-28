import { createRouter, createWebHistory } from 'vue-router';
import _discovery from './_discovery/router';

export default createRouter({
  history: createWebHistory(),
  routes: [{ name: 'home', path: '', component: () => import('./App.vue'), children: [_discovery] }],
});
