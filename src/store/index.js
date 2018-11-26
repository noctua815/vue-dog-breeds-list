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

function getStorage () {
  const ls = window.localStorage.getItem('fav-dogs')

  if (ls !== null) {
    let parsed
    try {
      parsed = JSON.parse(ls)
    } catch (e) {
      console.log(e)
      return []
    }

    return parsed
  }
}

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
      commit('SET_FAVOURITES', getStorage())
    },

    updateFavourites ({ commit, state }, dogs) {
      commit('SET_FAVOURITES', dogs)
      window.localStorage.setItem('fav-dogs', JSON.stringify(dogs))
    },

    addFavourite ({ dispatch }, dog) {
      let favs = getStorage()
      favs.unshift(dog)
      dispatch('updateFavourites', favs)
    },

    removeFavourite ({ dispatch }, dog) {
      let favs = getStorage()
      favs = favs.filter(item => item.link !== dog.link)
      dispatch('updateFavourites', favs)
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
    },

    ADD_FAVOURITES (state, dog) {
      state.favourites.unshift(dog)
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
