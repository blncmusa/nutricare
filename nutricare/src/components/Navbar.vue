<template>
  <nav>
    <div class="logo">
      <i class="fa-solid fa-user user"></i> 
      <!-- place user's profile image here -->
    </div>
    <div class="tabs">
      <button class="tab" :class="{ active: activeTab === 'home' }" @click="setActiveTab('home'); goTo('home')" data-tab="home">
        <i class="fa-solid fa-house"></i>
        <span>Home</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'calories' }" @click="setActiveTab('calories'); goTo('calories')" data-tab="calories">
        <i class="fa-solid fa-chart-column"></i>
        <span>Calories</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'weight-tracker' }" @click="setActiveTab('weight-tracker'); goTo('weight-tracker')" data-tab="weight-tracker">
        <i class="fa-solid fa-book"></i>
        <span>Weight Tracker</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'resources' }" @click="setActiveTab('resources'); goTo('resources')" data-tab="resources">
        <i class="fa-solid fa-sitemap"></i>
        <span>Resources</span>
      </button>
    </div>
    <div class="options">
      <button class="tab" :class="{ active: activeTab === 'settings' }" @click="setActiveTab('settings'); goTo('settings')" data-tab="settings">
        <i class="fa-solid fa-gear"></i>
        <span>Settings</span>
      </button>
      <button class="tab" :class="{ active: activeTab === 'logout' }" @click="activateLogout" data-tab="logout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Log Out</span>
      </button>
    </div>
    <Modal v-if="showModal" @close="showModal = false" />
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth'
import Modal from './Modal.vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: { Modal },
setup() {
  const activeTab = ref(localStorage.getItem('activeTab') || 'home');
  const showModal = ref(false);
  const router = useRouter();
  const route = useRoute();

  const goTo = (path) => {
    router.push(path);
  }

  const setActiveTab = (tab) => {
    activeTab.value = tab;
    localStorage.setItem('activeTab', tab); // Store the active tab in localStorage
  }

  const activateLogout = () => {
    showModal.value = true;
  }

  // Handle active tab on page refresh
  onMounted(() => {
  const currentRouteName = route.name;
  if (currentRouteName === 'home') {
    setActiveTab('home');
  } else if (currentRouteName === 'calories') {
    setActiveTab('calories');
  } else if (currentRouteName === 'weight-tracker') {
    setActiveTab('weight-tracker');
  } else if (currentRouteName === 'resources') {
    setActiveTab('resources');
  } else if (currentRouteName === 'settings') {
    setActiveTab('settings');
  }
});

  return { activeTab, setActiveTab, activateLogout, showModal, goTo }
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
        padding-top: 50px;
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