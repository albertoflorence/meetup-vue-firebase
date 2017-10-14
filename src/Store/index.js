import Vue from 'vue'
import Vuex from 'vuex'
import meetup from './meetup'
import user from './user'
import error from './error'
import loading from './loading'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup,
    user,
    error,
    loading
  }
})
