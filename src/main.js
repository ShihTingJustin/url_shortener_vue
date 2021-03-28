import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import '../src/assets/stylesheets/style.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import store from './store'

Vue.config.productionTip = false
Vue.component('Loading', Loading)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
