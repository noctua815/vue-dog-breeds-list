import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Breed from '@/components/Breed'
import Favourites from '@/components/Favourites'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: Favourites
    },
	  {
		  path: '/:breed',
		  name: 'breed',
		  component: Breed
	  }
  ]
})
