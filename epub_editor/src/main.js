import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
// import GAuth from 'vue-google-oauth2'

// Vue.config.productionTip = false

// const gauthOption = {
//   clientId: '613406129704-omk18m4bqaei962v5s2hsn654cj2den2.apps.googleusercontent.com',
//   scope: 'profile email'
// }

// Vue.use(GAuth, gauthOption)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
