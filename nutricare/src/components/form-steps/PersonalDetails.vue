<template>
  <form class="personal-details-form">
    <h2>Personal Details</h2>
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="firstName" required />
    </div>
    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="lastName" required />
    </div>
    <div class="form-group">
      <label for="age">Age</label>
      <input type="number" id="age" v-model="age" required />
    </div>
    <div class="form-group">
      <label for="gender">Gender</label>
      <select id="gender" v-model="gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
    </div>
    <p class='error'>{{ error }}</p>
    <button @click.prevent="submitForm" :disabled="isFormSubmitting">Next</button>
  </form>
</template>

<script>
import { auth, db } from "@/firebase/config";
import { ref, watch } from "vue";
import { updateDoc, doc, getDoc, setDoc } from "firebase/firestore";

export default {
  setup(_, { emit }) {
    const firstName = ref("");
    const lastName = ref("");
    const age = ref(null);
    const gender = ref("");
    const isFormIncomplete = ref(null);
    const error = ref("");
    const isFormSubmitting = ref(false);

    const submitForm = async () => {
      isFormIncomplete.value = false;
      error.value = "";

      if (!firstName.value || !lastName.value || !age.value || !gender.value) {
        isFormIncomplete.value = true;
        error.value = "Please fill in all fields."; // error if fields aren't completed
        return;
      }

      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        const userData = {
          firstName: firstName.value,
          lastName: lastName.value,
          age: age.value,
          gender: gender.value,
        };

        isFormSubmitting.value = true;

        // Checking if the user document already exists
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          // Updating the existing user document
          await updateDoc(userRef, userData);
        } else {
          // Creating a new user document with the UID as the document ID
          await setDoc(userRef, userData);
        }

        console.log("Personal details updated successfully");

        // Retrieve the updated user profile
        const updatedUserDocSnapshot = await getDoc(userRef);

        isFormSubmitting.value = false;

        emit("next-step", "personal-details");
      } catch (error) {
        console.error("Error updating personal details:", error);
        error.value = "An error occurred while updating personal details.";
      }
    };

    watch(isFormIncomplete, (value) => {
      if (value) {
        isFormSubmitting.value = false;
      }
    })
    return {
      firstName,
      lastName,
      age,
      gender,
      submitForm,
      error,
      isFormSubmitting,
    };
  },
};
</script>

<style scoped>
.personal-details-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 0 0 70px 70px;
  min-width: 80%;
}

.personal-details-form h2 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: black;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1.5rem;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: black;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
  width: 100%;
  padding: 1rem;
  border: 1px solid #CCCCCC;
  border-radius: 1px;
  color: black;
}

button {
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

.error {
  color: red;
}
</style>
