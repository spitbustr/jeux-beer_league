import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'intro',
    component: () => import('@/views/views/Intro.vue')
  },
  {
    path: '/game/:id',
    name: 'game',
    component: () => import('@/views/views/Game.vue')
  },
  {
    path: '/load',
    name: 'load',
    component: () => import('@/views/views/LoadGame.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 🔁 Redirect to '/' on refresh
router.beforeEach((to, from, next) => {
  if (from.name === null && to.path !== '/') {
    return next('/');
  }
  next();
})

export default router
