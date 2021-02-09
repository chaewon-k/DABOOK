import Vue from 'vue';
import VueRouter from 'vue-router';
import Editor from '../views/Editor.vue';

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'Login',
  //   component: Login
  // },
  // {
  //   path: '/signup',
  //   name: 'Signup',
  //   component: Signup
  // },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
];

const router = new VueRouter({
  routes
});

export default router;
