<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4>Create a new Meetup</h4>
        <form @submit.prevent="onCreateMeetup">
          <v-text-field
            label="Title"
            v-model="title"
            required>
          </v-text-field>
          <v-text-field
            label="Location"
            v-model="location"
            required>
          </v-text-field>
          <v-btn
            class="primary"
            @click="onPickFile">
            Upload Image
          </v-btn>
          <input
            type="file"
            @change="onFilePicked"
            accept="image/*"
            style="display: none"
            ref="fileInput"/>
          <img :src="imageUrl" height="150">
          <v-text-field
            label="Description"
            v-model="description"
            multi-line
            required>
          </v-text-field>
          <h4>Choose a Date & Time</h4>
          <v-date-picker class="mb-2" v-model="date"></v-date-picker>
          <v-time-picker v-model="time" format="24hr"></v-time-picker>
          <v-btn 
            class="primary" 
            :disabled="!formIsValid"
            type="submit">
            Create Meetup
          </v-btn>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    formIsValid () {
      return this.title !== '' &&
       this.location !== '' &&
       this.imageUrl !== '' &&
       this.description !== '' &&
       this.time !== '' &&
       this.image !== null
    },
    submitableDateTime () {
      const time = this.time.split(':')
      const date = new Date(this.date)
      date.setHours(time[0])
      date.setMinutes(time[1])
      return date
    }
  },
  data () {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: '',
      time: '',
      image: null
    }
  },
  methods: {
    onCreateMeetup () {
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submitableDateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push({
        name: 'Meetups'
      })
    },
    onFilePicked (event) {
      const file = event.target.files[0]
      const fileReader = new FileReader()
      this.image = file
      fileReader.readAsDataURL(file)
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
    },
    onPickFile () {
      this.$refs.fileInput.click()
    }
  }
}
</script>
<style scoped>
</style>
