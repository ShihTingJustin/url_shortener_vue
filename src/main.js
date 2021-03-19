import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import '../src/assets/stylesheets/style.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueSocketIO from "vue-socket.io"

Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: process.env.VUE_APP_BASEURL
  })
);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
