import _county from './_county/router';
export default {
  name: 'discovery',
  path: '',
  component: () => import('./views/index.vue'),
  children: _county,
};
