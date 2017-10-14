<template>
    <v-container v-if="!loading">
        <v-layout row wrap>
          <v-flex x12 md6 offset-md3>
            <v-card>
              <v-card-title>
                <h6 class="primary--text">{{ meetup.title }}</h6>
                <v-spacer></v-spacer>
                <edit-meetup-details :meetup="meetup"></edit-meetup-details>
              </v-card-title>
              <v-card-media
                 :src="meetup.imageUrl"
                 height="400px">
              </v-card-media>
              <v-card-text>
                <div class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</div>
                <edit-meetup-date :meetup="meetup"></edit-meetup-date>
                <edit-meetup-time :meetup="meetup"></edit-meetup-time>
                <div>{{ meetup.description }}</div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <register-meetup :meetup="meetup"></register-meetup>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import EditMeetupDetails from './Edit/EditMeetupDetails'
import EditMeetupDate from './Edit/EditMeetupDate'
import EditMeetupTime from './Edit/EditMeetupTime'
import RegisterMeetup from './Registration/RegisterMeetup'

export default {
  props: ['id'],
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    EditMeetupDetails,
    EditMeetupDate,
    EditMeetupTime,
    RegisterMeetup
  }
}
</script>
<style scoped>

</style>
