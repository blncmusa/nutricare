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
    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, db } from "@/firebase/config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import getUser from "@/composables/getUser";

export default {
  setup(_, { emit }) {
    const { user: currentUser } = getUser();

    console.log("currentUser:", currentUser.value);

    const submitForm = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, "users", userId);

        const userData = {
          firstName: currentUser.value.firstName,
          lastName: currentUser.value.lastName,
          age: currentUser.value.age,
          gender: currentUser.value.gender,
          weight: currentUser.value.weight,
          height: currentUser.value.height,
          goal: currentUser.value.goal,
        };

        console.log("userData:", userData);

        await updateDoc(userRef, userData);

        console.log("Form submitted successfully");

        // Emit an event to close the prompt and move to the next step
        emit("form-completed", "submission");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };

    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          currentUser.value.firstName = userData.firstName;
          currentUser.value.lastName = userData.lastName;
          currentUser.value.age = userData.age;
          currentUser.value.gender = userData.gender;
          currentUser.value.weight = userData.weight;
          currentUser.value.height = userData.height;
          currentUser.value.goal = userData.goal;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    return {
      currentUser,
      submitForm,
    };
  },
};
</script>

<style scoped>
.submission-container {
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.submission-container h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
}
</style>
