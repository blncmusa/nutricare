<template>
  <div class="home">
    <Profile />
  </div>
</template>
  
<script>
import Navbar from '@/components/Navbar.vue'
import Profile from '@/components/Profile.vue'


export default {
  name: 'home',
  components: { Navbar, Profile }
}
</script>

<style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-content: center;
    font-size: 60px;
    font-weight: bolder;
  }
</style>