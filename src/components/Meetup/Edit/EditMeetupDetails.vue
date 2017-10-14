<template>
  <v-dialog width="350px" persistent v-if="isUserCreator" v-model="showDialog">
    <v-btn 
      slot="activator"
      flat
      fab
      small>
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-text-field
                label="Title"
                v-model="editedTitle"
                >
              </v-text-field>
              <v-text-field
                label="Description"
                v-model="editedDescription"
                multi-line
                >
              </v-text-field>
            </v-card-text>
            <v-divider></v-divider>
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      showDialog: false
    }
  },
  methods: {
    onSaveChanges () {
      if (!this.editedTitle.trim() || !this.editedDescription.trim()) {
        return
      }
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription
      })
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
