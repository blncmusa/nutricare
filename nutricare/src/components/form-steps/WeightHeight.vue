<template>
  <div class="weight-height-form">
    <h2>Weight and Height</h2>
    <div class="form-group">
      <label for="weight">Weight (kg)</label>
      <input type="number" id="weight" v-model="weight" required />
    </div>
    <div class="form-group">
      <label for="height">Height (cm)</label>
      <input type="number" id="height" v-model="height" required />
    </div>
    <button @click.prevent="submitForm">Next</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase/config";

export default {
  setup(_, { emit }) {
    const weight = ref(null);
    const height = ref(null);

    const submitForm = async () => {
      if (!weight.value || !height.value) {
        return;
      }

      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        const weightHeightData = {
          weight: weight.value,
          height: height.value,
        };

        await updateDoc(userRef, weightHeightData);

        console.log("Weight and height updated successfully");

        emit("form-completed", "weight-height");
      } catch (error) {
        console.error("Error updating weight and height:", error);
      }
    };

    return { weight, height, submitForm };
  },
};
</script>

<style scoped>
.weight-height-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border-radius: 0 0 70px 70px;
}

.weight-height-form h2 {
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

.form-group input[type="number"] {
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
</style>
