import Vue   from 'vue'
import Vuex  from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const api = axios.create({
	baseURL: 'https://dog.ceo/api/',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
})

export default new Vuex.Store({
	state: {
		breeds: [],
		dogs: [],
		favourites: []
	},
	actions: {
		loadBreeds ({commit}) {
			api.get('breeds/list/all')
			     .then(r => r.data.status === 'success' ? r.data.message : null)
			     .then(breeds => {
			     	  // console.log(breeds)
				     commit('SET_BREEDS', Object.keys(breeds))
			     })
			     .catch(error => console.log(error))
		},
		
		loadDogs ({commit}) {
			api.get('breeds/image/random/20')
			     .then(r => r.data.status === 'success' ? r.data.message : null)
			     .then(dogs => {
				     commit('SET_DOGS', dogs)
			     })
			     .catch(error => console.log(error))
		}
	},
	mutations: {
		SET_BREEDS (state, breeds) {
			state.breeds = breeds
		},
		
		SET_DOGS (state, dogs) {
			state.dogs.push(...dogs)
		}
	},
	getters: {
		// breedsName: state => {
		// 	return state.breeds.map()
		// }
	}
})