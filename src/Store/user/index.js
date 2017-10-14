import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const {meetupId, id} = payload
      state.user.registeredMeetups[meetupId] = id
    },
    unregisterUserFromMeetup (state, payload) {
      const id = payload
      Reflect.deleteProperty(state.user.registeredMeetups, id)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      const meetupId = payload
      firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(meetupId)
        .then(data => {
          commit('registerUserForMeetup', {
            meetupId: meetupId,
            id: data.key
          })
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      const meetupId = payload
      const registrationId = user.registeredMeetups[meetupId]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(registrationId).remove()
        .then(() => {
          commit('unregisterUserFromMeetup', meetupId)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: {}
          }
          commit('setUser', newUser)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      const {id} = getters.user
      firebase.database().ref('/users/' + id + '/registrations/').once('value')
        .then((data) => {
          const values = data.val()
          const registeredMeetups = {}
          for (const key in values) {
            const value = values[key]
            registeredMeetups[value] = key
          }
          const updateUser = {
            id,
            registeredMeetups
          }
          commit('setUser', updateUser)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserIn ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: {}
          }
          commit('setUser', newUser)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
        })
    },
    autoSignUserIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: {}
      })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
