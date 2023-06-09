<template>
  <div class="submission-container">
    <h2>Submission Summary</h2>
    <p><strong>First Name:</strong> {{ currentUser.firstName }}</p>
    <p><strong>Last Name:</strong> {{ currentUser.lastName }}</p>
    <p><strong>Age:</strong> {{ currentUser.age }}</p>
    <p><strong>Gender:</strong> {{ currentUser.gender }}</p>
    <p><strong>Weight:</strong> {{ currentUser.weight }} kg</p>
    <p><strong>Height:</strong> {{ currentUser.height }} cm</p>
    <p><strong>Goal:</strong> {{ currentUser.goal }}</p>
    <button @click="handleEmit">Submit</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "@/firebase/config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import getUser from "@/composables/getUser";

export default {
  data() {
    return {
      currentUser: {},
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.currentUser = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            age: userData.age,
            gender: userData.gender,
            weight: userData.weight,
            height: userData.height,
            goal: userData.goal,
          };
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    },
    handleEmit() {
      // Check if currentUser has been populated
      if (this.currentUser.firstName) {
        // Emit the form-completed event
        this.$parent.$emit("form-completed");
      }
    },
  },
};
</script>

<style scoped>
.submission-container {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submission-container h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

button {
  margin-top: 20px;
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #333333;
}
</style>



<style scoped>
.submission-container {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submission-container h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}

button {
  margin-top: 20px;
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #333333;
}
</style>
