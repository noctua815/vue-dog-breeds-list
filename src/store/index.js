import Vue from 'vue'
import Vuex from 'vuex'
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
    favourites: [],
    currentBreed: []
  },
  actions: {
    loadBreeds ({ commit }) {
      api.get('breeds/list/all')
			   .then(r => r.data.status === 'success' ? r.data.message : null)
			   .then(breeds => {
				   commit('SET_BREEDS', Object.keys(breeds))
			   })
			   .catch(error => console.log(error))
    },

    loadDogs ({ commit }) {
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
    },

    loadBreed ({ commit }, breed) {
      commit('CLEAR_CURRENT_BREED')

      api.get(`breed/${breed}/images`)
			   .then(r => r.data.status === 'success' ? r.data.message : null)
			   .then(dogs => {
				   let arr = []

				   dogs.forEach((el, i) => {
					   arr.push({
						   link: el,
						   breed: breed
					   })
				   })

				   commit('SET_CURRENT_BREED', arr)
			   })
			   .catch(error => console.log(error))
    },

    getFavourites ({ commit }) {
      const favs = window.localStorage.getItem('fav-dogs')

      if (favs !== null) {
        let parsed
        try {
          parsed = JSON.parse(favs)
        } catch (e) {
          console.log(e)
        }

        commit('SET_FAVOURITES', parsed)
      }
    },

    setFavourites ({ commit, state }, favs) {
      window.localStorage.setItem('fav-dogs', JSON.stringify(favs))
      commit('SET_FAVOURITES', favs)
    }
  },
  mutations: {
    SET_BREEDS (state, breeds) {
      state.breeds = breeds
    },

    CLEAR_BREEDS (state) {
      state.breeds = []
    },

    SET_DOGS (state, dogs) {
      state.dogs.push(...dogs)
    },

    CLEAR_DOGS (state) {
      state.dogs = []
    },

    SET_CURRENT_BREED (state, dogs) {
      state.currentBreed = dogs
    },

    CLEAR_CURRENT_BREED (state) {
      state.currentBreed = []
    },

    SET_FAVOURITES (state, dogs) {
      state.favourites = dogs
    }
  },
  getters: {
    currentBreeds: state => {
      return [...new Set(state.dogs.map(item => item.breed))]
    },

    filteringByBreed: state => param => {
      return param ? state.dogs.filter(item => item.breed === param) : state.dogs
    }
  }
})
