<template>
  <div class="modal-background">
    <div class="modal-container">
      <p>Are you sure you want to log out?</p>
      <div class="modal-content">
        <div class="top-section"></div>
        <div class="bottom-section">
          <button class="modal-button yes-button" @click="handleLogout">Yes</button>
          <button class="modal-button cancel-button" @click="$emit('close')">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';;
import { useRouter } from 'vue-router';

export default {
  setup() {

    const router = useRouter()

    const handleLogout = () => {
      signOut(auth);
      router.push('/auth')
    };

    return { handleLogout };
  }
};
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.modal-container {
  background-color: #fff;
  padding: 50px;
  color: black;
  font-weight: 400;
  border-radius: 3px;
  box-shadow: 0px 10px 10px -6px rgba(0, 0, 0, 0.3);
}

.modal-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.top-section {
  flex-grow: 1;
  background-color: #f1f1f1;
}

.bottom-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
}

.modal-button {
  padding: 10px;
  margin: 5px;
  width: 50%;
}

button {
  color: white;
  background-color: black;
  border: none;
  border-radius: 3px;
}

button:hover {
  cursor: pointer;
}
</style>
