import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import store from './store'
import Record from './components/Record'

Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.component('Record', Record)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
