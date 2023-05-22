<template>
  <!-- <Navbar/>  -->
  <!-- no Navbar on sign up and login page -->
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue'
import '@/assets/main.css'

export default { 
  components: { Navbar }
}
</script>

<style>
  body, html {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
</style>
