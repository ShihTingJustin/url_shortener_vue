import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import Index from '../views/Index.vue'
import SignIn from '../views/SignIn.vue'
import store from './../store'
import { apiHelper } from "../utils/helpers";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    component: Index
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/manager',
    name: 'manager',
    component: () => import('../views/Manager.vue')
  },
  {
    path: '/:shortUrl',
    async beforeEnter(to, from, next) {
      try {
        window.location.replace(await redirectToOriginalUrl(to.params.shortUrl))
        next()
      } catch (err) {
        console.log(err)
      }      
    }
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

router.beforeEach((to, from, next) => {
  store.dispatch('fetchCurrentUser')
  next()
})

async function redirectToOriginalUrl(shortUrl) {
  try {
    const { data } = await apiHelper.get(`/${shortUrl}`);
    return data.data.originalUrl;
  } catch (error) {
    console.log(error)
  }
}

export default router
