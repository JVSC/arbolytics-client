export default [
  {
    name: '_county-home',
    path: '',
    component: () => import('./views/home.vue'),
  },
  {
    name: '_county-county_id',
    path: '/county/:countyId',
    component: () => import('./views/_countyId.vue'),
  },
];
