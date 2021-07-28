import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Beneficiaries from '../components/Beneficiaries'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/beneficiaries',
    name: 'Beneficiaries',
    component: Beneficiaries
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
