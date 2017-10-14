import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: []
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const updatedMeetup = state.loadedMeetups.find((meetup) => meetup.id === payload.id)
      const {title, description, date} = payload
      if (title) {
        updatedMeetup.title = title
      }
      if (description) {
        updatedMeetup.description = description
      }
      if (date) {
        updatedMeetup.date = date
      }
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          const meetups = []
          const obj = data.val()
          for (const key in obj) {
            const meetup = obj[key]
            meetups.push({
              ...meetup,
              id: key
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setError', error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let key, imageUrl
      firebase.database().ref('meetups').push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const fileName = payload.image.name
          const ext = fileName.slice(fileName.indexOf('.'))
          return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
          })
        })
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const {title, description, date, id} = payload
      const updatedMeetup = {}
      if (title) {
        updatedMeetup.title = title
      }
      if (description) {
        updatedMeetup.description = description
      }
      if (date) {
        updatedMeetup.date = date
      }
      firebase.database().ref('meetups').child(id).update(updatedMeetup)
        .then(() => {
          updatedMeetup.id = id
          commit('updateMeetup', updatedMeetup)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date)
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find(meetup => meetup.id === meetupId)
      }
    }
  }
}
