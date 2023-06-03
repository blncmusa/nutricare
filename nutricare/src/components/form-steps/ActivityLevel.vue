<template>
  <div>
    <h2>Activity Level</h2>
    <div class="cards">
      <div
        :class="['card', { active: activeCard === 1 }]"
        @click="setActiveCard(1)"
      >
        <img src="@/assets/img/1.png" alt="">
        <div class="activity-level">Low</div>
      </div>
      <div
        :class="['card', { active: activeCard === 2 }]"
        @click="setActiveCard(2)"
      >
        <img src="@/assets/img/2.png" alt="">
        <div class="activity-level">Average</div>
      </div>
      <div
        :class="['card', { active: activeCard === 3 }]"
        @click="setActiveCard(3)"
      >
        <img src="@/assets/img/3.png" alt="">
        <div class="activity-level">High</div>
      </div>
    </div>
    <button @click.prevent="submitForm">Next</button>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/config";
import { ref } from "vue";
import { updateDoc, doc } from "firebase/firestore";

export default {
  setup(_, { emit }) {
    const activeCard = ref(null);

    const setActiveCard = (card) => {
      activeCard.value = card;
    };

    const submitForm = async () => {
      if (!activeCard.value) {
        // No activity level selected
        return;
      }

      const userId = auth.currentUser.uid;
      const userRef = doc(db, "users", userId);

      try {
        const activityLevelData = {
          activityLevel: activeCard.value,
        };

        await updateDoc(userRef, activityLevelData);

        console.log("Activity level updated successfully");

        emit("form-completed", "activity-level");
      } catch (error) {
        console.error("Error updating activity level:", error);
        // Handle error if necessary
      }
    };

    return { activeCard, setActiveCard, submitForm };
  },
};
</script>


<style scoped>

h2 {
    text-align: center;
    margin: 50px auto;
    display: block;
    position: relative;
}

.cards {
  display: flex;
  justify-content: center;
  align-content: center;
  position: relative;
  margin-bottom: 100px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 15px;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  height: 300px;
}

.card:hover {
  border-color: #000000;
}

.card.active {
  transform: scale(1.1);
  border-color: #000000;
}

img {
  max-width: 200px;
  max-height: 200px;
}

.activity-level {
  margin-top: 0.5rem;
  font-weight: bold;
}

button {
  background-color: black;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  margin: 0 auto;
  display: block;
}

button:hover {
  background-color: #333333;
}

</style>
