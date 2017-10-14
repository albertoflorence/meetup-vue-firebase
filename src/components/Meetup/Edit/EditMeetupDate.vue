<template>
  <v-dialog width="350px" persistent v-if="isUserCreator" v-model="showDialog">
    <v-btn 
      slot="activator"
      flat
      small>
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
            <v-divider></v-divider>
            <v-date-picker v-model="editedDate"></v-date-picker>
            <v-card-actions>
              <v-btn class="blue--text darken-1" flat @click="onSaveChanges">Save</v-btn>
              <v-btn class="blue--text darken-1" flat @click="showDialog = false">Close</v-btn>
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
    isUserCreator () {
      return this.meetup.creatorId === this.$store.getters.user.id
    }
  },
  data () {
    return {
      showDialog: false,
      editedDate: new Date(this.meetup.date)
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meetup.date)
      const day = new Date(this.editedDate).getUTCDate()
      const mounth = new Date(this.editedDate).getUTCMonth()
      const year = new Date(this.editedDate).getUTCFullYear()
      newDate.setUTCDate(day)
      newDate.setUTCMonth(mounth)
      newDate.setUTCFullYear(year)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
