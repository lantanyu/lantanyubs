import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import my from '../views/my.vue'
import fenlei from '../views/fenlei.vue'
import details from '../views/details.vue'
import quedingorder from '../views/quedingorder.vue'
import order from '../views/order.vue'
import quedingtuihuo from '../views/quedingtuihuo.vue'
import userlist from '../views/userlist.vue'
import you from '../views/you.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
	component: About
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/my',
    name: 'my',
    component: my,
	meta: {
	  requireAuth: true // 需要验证登录状态
	}
  },
  {
    path: '/you',
    name: 'you',
    component: you,
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: userlist,
  },
  {
    path: '/fenlei',
    name: 'fenlei',
    component: fenlei
  },
  {
    path: '/details',
    name: 'details',
    component: details
  },
  {
    path: '/quedingorder',
    name: 'quedingorder',
    component: quedingorder,
	meta: {
	  requireAuth: true // 需要验证登录状态
	}
  },
  {
    path: '/quedingtuihuo',
    name: 'quedingtuihuo',
    component: quedingtuihuo,
  	meta: {
  	  requireAuth: true // 需要验证登录状态
  	}
  },
  {
    path: '/order',
    name: 'order',
    component: order,
  	meta: {
  	  requireAuth: true // 需要验证登录状态
  	}
  },
  
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
