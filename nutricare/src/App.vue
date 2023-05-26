<template>
  <Navbar v-if='!isAuthenticationPage' /> 
  <!-- no Navbar on sign up and login page -->
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import '@/assets/main.css'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  components: { Navbar },
  setup() {
    const route = useRoute()

    const isAuthenticationPage = computed(() => {
      return route.name === 'auth'
    })

    return { isAuthenticationPage }
  }
}
</script>

<style>
  body, html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
