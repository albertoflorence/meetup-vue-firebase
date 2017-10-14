<template>
  <div>
    <v-navigation-drawer
      v-model="sideNav"
      temporary>
      <v-list>
        <v-list-tile 
        v-for="item in menuItems" 
        :key="item.title"
        :to="item.link">
          <v-list-tile-action @click="item.action ? item.action : null">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
          <v-list-tile-title>{{ item.title  }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon
      @click.stop="sideNav = !sideNav"
      class="hidden-sm-and-up"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link
          :to="{name: 'Home'}"
          tag="span"
          style="cursor: pointer"
        >
          Meetup
        </router-link>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
        flat
        dark
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link"
        @click.native="item.action ? item.action() : null">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title  }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  computed: {
    menuItems () {
      const menuItems = this.isAuthenticated
      ? [
        { title: 'Meetups View', icon: 'supervisor_account', link: { name: 'Meetups' } },
        { title: 'Organize Meetup', icon: 'room', link: { name: 'CreateMeetup' } },
        { title: 'Profile', icon: 'person', link: { name: 'Profile' } },
        { title: 'Logout', icon: 'exit_to_app', link: { name: 'Home' }, action: this.onLogout }
      ]
      : [
        { title: 'Sign up', icon: 'face', link: { name: 'Signup' } },
        { title: 'Sign In', icon: 'lock_open', link: { name: 'Signin' } }
      ]
      return menuItems
    },
    isAuthenticated () {
      return !!this.$store.getters.user
    }
  },
  data () {
    return {
      sideNav: false
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style scoped>
</style>
