import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Cover from '@/pages/Cover'
import Record from '@/pages/Record'

Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Cover',
    component: Cover
  },
  {
    path: '/record',
    name: 'record',
    component: Record
  }],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
