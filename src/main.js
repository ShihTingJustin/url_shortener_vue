import Vue from 'vue'
import App from './App.vue'
import router from './router/Index'
import '../src/assets/stylesheets/style.css'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.config.productionTip = false
Vue.component('Loading', Loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
