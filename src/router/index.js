import Vue from 'vue'
import VueRouter from 'vue-router'
import FavoritesPage from '@/views/favorites-page'
import HomePage from '@/views/home-page'
import PhotoView from '@/views/photo-view'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesPage
  },
  {
    path: '/photo-view/:id',
    name: 'photo-view',
    component: PhotoView
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
