<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large :to="{name: 'Meetups'}" class="info">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large :to="{name: 'CreateMeetup'}" class="info">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>
    <v-layout 
      row wrap
      v-if="!loading"
      >
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item
          v-for="(meetup, i) in meetups"
          :src="meetup.imageUrl"
          @click="onLoadMeetup(meetup.id)"
          :key="meetup.id">
            <div class="title" bottom>
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
        <div class="text-xs-center">
          <p>Join our awesome meetups!</p>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push({
        name: 'Meetup',
        params: {id}
      })
    }
  }
}
</script>
<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 2em;
    padding: 20px
  }
</style>
