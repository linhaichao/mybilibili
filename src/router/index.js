import Vue from 'vue'
import VueRouter from 'vue-router'
import homeView from '../views/homeView.vue'
import videoPlay from '@/views/videoPlay.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: homeView
  },
  {
    path: '/videoPlay',
    name: 'videoPlay',
    component:videoPlay
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
