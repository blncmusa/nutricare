import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Authenticate from '../views/Auth.vue'
import { auth } from '../firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import Calories from '../views/Calories.vue'
import MealPlanner from '../views/MealPlanner.vue'
import Resources from '../views/Resources.vue'
import Settings from '../views/Settings.vue'

const requireAuth = (to, from, next) => {
  let user = auth.currentUser
  if (!user) { 
    next({ name: 'auth' })
  } else {
    next()
  }
}

const requireNoAuth = (to, from, next) => {
  let user = auth.currentUser
  if(user) {
    next({ name: 'home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { auth: false },
    beforeEnter: requireAuth
  },
  {
    path: '/auth',
    name: 'auth',
    component: Authenticate,
    beforeEnter: requireNoAuth
  },
  {
    path: '/calories',
    name: 'calories',
    component: Calories,
    beforeEnter: requireAuth
  },
  {
    path: '/meal-planner',
    name: 'meal-planner',
    component: MealPlanner,
    beforeEnter: requireAuth
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources,
    beforeEnter: requireAuth
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const currentRoute = to.name
  const activeTab = currentRoute || 'home'
  
  localStorage.setItem('activeTab', activeTab)
  
  next()
})

export default router
