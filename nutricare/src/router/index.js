import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import Auth from '../views/Auth.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router