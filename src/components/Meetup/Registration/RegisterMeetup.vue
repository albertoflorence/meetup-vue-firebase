<template>
  <v-dialog 
    width="300px" 
    persistent 
    v-model="showDialog">
    <v-btn 
      slot="activator"
      class="primary"
      v-if="!isUserCreator && isUserAuthenticated">
      {{ actionName }}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>{{ title }}</v-card-title>
            <v-divider></v-divider>
            <v-card-text>You can always change your decision later on</v-card-text>
            <v-card-actions>
              <v-btn class="green--text darken-1" flat @click="onAgree">Confirm</v-btn>
              <v-btn class="red--text darken-1" flat @click="showDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['meetup'],
  computed: {
    isUserRegistered () {
      return this.$store.getters.user.registeredMeetups[this.meetup.id] !== undefined
    },
    title () {
      return this.isUserRegistered ? 'Unregister for Meetup?' : 'Register for Meetup?'
    },
    actionName () {
      return this.isUserRegistered ? 'Unregister' : 'Register'
    },
    isUserCreator () {
      return this.meetup.creatorId === this.$store.getters.user.id
    },
    isUserAuthenticated () {
      return !!this.$store.getters.user
    }
  },
  data () {
    return {
      showDialog: false
    }
  },
  methods: {
    onAgree () {
      this.isUserRegistered
      ? this.$store.dispatch('unregisterUserFromMeetup', this.meetup.id)
      : this.$store.dispatch('registerUserForMeetup', this.meetup.id)
    }
  }
}
</script>

<style>

</style>
