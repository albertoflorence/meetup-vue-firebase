<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 md6 offset-sm3>
        <app-alert
          v-if="error" 
          @dismissed="onDismissed" 
          :text="error.message">
        </app-alert>
        <v-card>
          <v-card-text>
            <v-container>
              <form 
                @submit.prevent="onSignin" 
                row>
                <v-flex xs12>
                  <v-text-field
                    label="email"
                    v-model="email"
                    type="email"
                    required>
                  </v-text-field>
                  <v-text-field
                    label="password"
                    v-model="password"
                    type="password"
                    required>
                  </v-text-field>
                </v-flex>
                <div class="text-xs-center">
                  <v-btn
                    class="secondary"
                    :loading="loading"
                    :disabled="loading"
                    type="submit"
                  >
                    Sign Up
                  </v-btn>
                </div>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value) {
        this.$router.push({name: 'Home'})
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
<style scoped>
</style>
