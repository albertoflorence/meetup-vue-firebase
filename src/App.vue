<template>
  <v-app>
    <page-header></page-header>
      <v-progress-linear 
        indeterminate height="3"
        v-if="loading">
      </v-progress-linear>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  import PageHeader from '@/components/Header'
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      }
    },
    data () {
      return {
      }
    },
    components: {
      PageHeader
    }
  }
</script>
