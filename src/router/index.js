import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Index from '../views/Index.vue'
import Manager from '../views/Manager.vue'
import ShortUrl from '../views/ShortUrl.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Index,
  },
  {
    path: '/short',
    name: 'short',
    component: ShortUrl,
  },
  {
    path: '/manager',
    name: 'manager',
    component: Manager,
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
