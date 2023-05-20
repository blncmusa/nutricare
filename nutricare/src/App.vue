<template>
  <Navbar/>
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
  * {
    box-sizing: border-box;
  }
</style>
