<template>
  <div class="profile-card">
    <div class="header">
      <div class="profile-pic"></div>
    </div>
    <div class="main"></div>
  </div>
</template>

<script>
import getUser from '@/composables/getUser.js'

export default {
    setup(){
        const { user } = getUser()
        return { user }
    }
}
</script>

<style>
  .profile-card {
    position: fixed;
    height: 100vh;
    width: 35vw;
    top: 0;
    right: 0;
    background: grey;
    display: flex;
    flex-direction: column;
    box-shadow: -60px 0px 100px -90px #000000,
  }

  .header {
    flex: 1;
    background: rgb(132, 132, 132);
    position: relative;
    z-index: 1;
  }

  .main {
    flex: 2;
    background: rgb(196, 196, 196);
  }

  .profile-pic {
    background: white;
    border-radius: 50%;
    z-index: 2;   
    position: absolute;
    min-width: 175px;
    min-height: 175px;
    left: 34%;
    bottom: -28%;   
    
  }
</style>
