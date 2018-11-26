import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import VSelect from './components/layout/Select'
import DogCard from './components/layout/DogCard'

Vue.component('v-select', VSelect)
Vue.component('dog-card', DogCard)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
