import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
// import GoogleLogin from '@/views/GoogleLogin.vue'
import Editor from '@/views/Editor.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/editor',
    name: 'Editor',
    component: Editor
  },
  // {
  //   path: '/google',
  //   name: 'GoogleLogin',
  //   component: GoogleLogin
  // },
]

const router = new VueRouter({
  routes
});

export default router;
