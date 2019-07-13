import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Record from '@/pages/Record'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/record',
    name: 'Record',
    component: Record
  }],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
