import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/business_analytics',
    name: 'BusinessAnalytics',
    component: () => import(/* webpackChunkName: "about" */ '../views/BusinessAnalytics.vue')
  },
  {
    path: '/it',
    name: 'ItUI',
    component: () => import(/* webpackChunkName: "about" */ '../views/ItUI.vue')
  },
  {
    path: '/maintenance',
    name: 'Maintenance',
    component: () => import(/* webpackChunkName: "about" */ '../views/Maintenance.vue')
  },
  {
    path: '/maintenance/:vendor',
    name: 'VendorSelection',
    component: () => import(/* webpackChunkName: "about" */ '../views/VendorSelection.vue')
  },
  {
    path: '/maintenance/:vendor/product/:id',
    name: 'ProductMaintenance',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductMaintenance.vue')
  },
  {
    path: '/enter_ticket',
    name: 'Tickets',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tickets.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
