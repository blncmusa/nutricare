<template>
  <nav>
    <div class="logo">
        <i class="fa-solid fa-user user"></i> 
        <!-- place users profile image here -->
    </div>
    <div class="tabs">
      <button class="tab" :class="{ active: activeTab === 'home' }" @click="setActivetab('home'); goTo('home') ">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'calories' }" @click="setActivetab('calories'); goTo('calories')">
        <i class="fa-solid fa-chart-column"></i>
        <span>Calories</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'meal-planner' }" @click="setActivetab('meal-planner'); goTo('meal-planner')">
        <i class="fa-solid fa-book"></i>
        <span>Meal Planner</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'resources' }" @click="setActivetab('resources'); goTo('resources')">
        <i class="fa-solid fa-sitemap"></i>
        <span>Resources</span>
      </button>
    </div>
    <div class="options">
      <button class="tab" :class="{ active: activeTab === 'settings' }" @click="setActivetab('settings'); goTo('settings')">
        <i class="fa-solid fa-gear"></i>
        <span>Settings</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'logout' }" @click="activateLogout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Log Out</span>
      </button>
    </div>
    <Modal v-if="showModal" @close="showModal = false" />
  </nav>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth'
import Modal from './Modal.vue';
import { useRouter } from 'vue-router';

export default {
    components: { Modal },
    setup(){
        const activeTab = ref('home');
        const showModal = ref(false);
        const router = useRouter()

        const goTo = (path) => {
          router.push(path)
        }


        const setActivetab = (tab) => {
            activeTab.value = tab;
            console.log(activeTab)
        }

        const activateLogout = () => {
          showModal.value = true;
        }

        return { activeTab, setActivetab, activateLogout, showModal, goTo }
    }
}
</script>

<style scoped>
    nav { 
        position: fixed;
        top: 0;
        left: 0;
        min-width: 8%;
        height: 100vh;
        background-color: black;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
        padding: 20px 0px;
    }
    img {
        max-width: 50px
    }
    .tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .tab i {
        font-size: 20px;
        margin-bottom: 10px;
    }   
    button {
        background: transparent;
        color: white;
        width: 100%;
        height: 5rem;
        border: none;
        /* border-right: 5px solid white; */
    }
    .active {
        color: #B5F8C7;
        border-right: 5px solid #B5F8C7;
    }
    .user {
        border: 2px solid white;
        border-radius: 50%;
        font-size: 20px;
        padding: 20px;
    }
    .options {
      margin-bottom: 50px;
    }
</style>