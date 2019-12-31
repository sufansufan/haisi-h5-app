import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import getters from './getters'
import app from './modules/app'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
const store = new Vuex.Store({
  modules: {
    app
  },
  getters,
  plugins: [vuexLocal.plugin]
})

export default store
