import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'root',
    component: Index
  },

  {
    path: '/manager',
    name: 'manager',
    component: () => import('../views/Manager.vue')
  },
  {
    path: '/:shortUrl',
    component: () => import('../views/Redirect.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  }
]

const router = new VueRouter({
  routes
})

export default router
