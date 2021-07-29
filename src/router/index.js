import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import BeneficiariesContainer from '../components/BeneficiariesContainer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/beneficiaries',
    name: 'BeneficiariesContainer',
    component: BeneficiariesContainer
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
