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
			     	let arr = []
				     
			     	dogs.forEach((el, i) => {
			     		let dog = {
			     			link: el,
					      breed: el.split('https://images.dog.ceo/breeds/')[1]
				      }
				      
				      dog.breed = dog.breed.split('/')[0]
				      arr.push(dog)
			      })
				     commit('SET_DOGS', arr)
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
		currentBreeds: state => {
			return [...new Set(state.dogs.map(item => item.breed))];
		},
		
		filteringByBreed: state => param => {
			return param ? state.dogs.filter(item => item.breed === param) : state.dogs
		}
	}
})