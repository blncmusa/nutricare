<template>
  <div class="goals-container">
    <ul class="goals-list">
      <li
        v-for="(goal, index) in goals"
        :key="index"
        :class="{ active: selectedGoal === goal.id }"
        @click="selectedGoal = goal.id"
      >
        <h3>{{ goal.title }}</h3>
        <p>{{ goal.description }}</p>
      </li>
    </ul>
    <button v-if="selectedGoal" @click="submitForm">Next</button>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/config";
import { ref, updateDoc, doc } from "firebase/firestore";

export default {
  data() {
    return {
      selectedGoal: null,
      goals: [
        {
          id: 'Lose',
          title: 'Lose Weight',
          description: 'Focus on creating a calorie deficit to support weight loss.',
        },
        {
          id: 'Maintain',
          title: 'Maintain Weight',
          description: 'Maintain your current weight by balancing your calorie intake and expenditure.',
        },
        {
          id: 'Gain',
          title: 'Gain Weight',
          description: 'Emphasize a calorie surplus to facilitate weight gain.',
        },
      ],
    };
  },
  methods: {
    async submitForm() {
      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        await updateDoc(userRef, {
          goal: this.selectedGoal,
        });

        console.log("Goal updated successfully");

        this.$emit('form-completed', 'goals');
      } catch (error) {
        console.error("Error updating goal:", error);
      }
    },
  },
};
</script>

<style scoped>
.goals-container {
  margin: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.goals-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.goals-list li {
  cursor: pointer;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: background-color 0.3s ease;
}

.goals-list li:hover {
  background-color: #f0f0f0;
}

.goals-list li.active {
  background-color: #e0e0e0;
  font-weight: bold;
}

button {
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}

button:hover {
  background-color: #333333;
}
</style>
