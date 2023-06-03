<template>
  <div class="home">
    <!-- <Profile /> -->
    <div :class="{ 'prompt-overlay': showPrompt }">
      <Prompt v-if="showPrompt" @form-completed="handlePromptClose" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Profile from '@/components/Profile.vue'
import { ref, onMounted } from 'vue';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Prompt from '@/components/Prompt.vue';

export default {
  name: 'home',
  components: { Navbar, Profile, Prompt },
  setup() {
    const showPrompt = ref(false);

    const checkProfileCompletion = async () => {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, 'users', userId);
      const userSnapshot = await getDoc(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        if (!userData.weight || !userData.height || !userData.gender || !userData.goal) {
          showPrompt.value = true;
        }
      }
    };

    const handlePromptClose = () => {
        showPrompt.value = false; 
    };

    onMounted(checkProfileCompletion);

    return {
      showPrompt,
      handlePromptClose
    };
  }
};
</script>

<style>
.home {
  display: flex;
  justify-content: center;
  align-content: center;
}

.prompt-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  pointer-events: auto;
}

.prompt-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  pointer-events: none;
}

</style>
