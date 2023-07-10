<template>
  <div class="container">
    <div class="chart">
          <button class='submit' @click="addEntry">Submit Calories</button>
      <canvas ref="chartContainer"></canvas>
    </div>
    <div class="today-calories">
          <h2>Today's Calories</h2>
          <p id='accumulator'>{{ accumulatedCalories }}</p>
          <p class="error" style='color: red' v-if='showError'>Enter Date and Calories</p>
          <div>
            <div class="input">
              <div style="display: flex; gap: 20px; justify-content: center; align-items: center; margin-left: 100px;">
                <label for="dateInput">Date:</label>
                <input type="date" id="dateInput" v-model="newEntry.date" required />
              </div>
              <div style="display: flex; gap: 20px; justify-content: center; align-items: center; margin-left: 50px;">
                <label id='calorieName' for="calorieInput">Calorie Intake:</label>
                <input type="number" id="calorieInput" v-model="newEntry.intake" required>
                <!-- <button @click="addCalories">Add</button> -->
              </div>
            </div>
          </div>
            <button id='submit-calories' @click="addCalories">Add Calories</button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import Chart from 'chart.js/auto';
import { auth, db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default {
  setup() {
    const chartContainer = ref(null);

    const calorieData = reactive([
      { date: '2023-07-01', intake: 1800 },
      { date: '2023-07-02', intake: 1100 },
      // ... add more entries for each day
    ]);

    const newEntry = reactive({ date: '', intake: null });

    const accumulatedCalories = ref(0);

    const showError = ref(false);

    const user = ref(null);

    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        user.value = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          age: userData.age,
          gender: userData.gender,
          weight: userData.weight,
          height: userData.height,
          goal: userData.goal,
          activityLevel: userData.activityLevel
        };
        // console.log(user.value) -- fricking work pls
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };


    const goal = computed(() => {
      if (user.value) {
        const height = user.value.height;
        const weight = user.value.weight;
        const userGoal = user.value.goal;
        const gender = user.value.gender;
        const age = user.value.age;
        const activityLevel = user.value.activityLevel;
        console.log(height)

        let bmr = 0; // basal metabolic rate

        if (gender === 'Male') {
          bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        } else if (gender === 'Female') {
          bmr = 10 * weight + 6.25 * height - 5 * age - 161;
        }

        let tdee = 0; // total daily energy expenditure

        if (activityLevel === 1) {
          tdee = bmr * 1.2;
        } else if (activityLevel === 2) {
          tdee = bmr * 1.375;
        } else if (activityLevel === 3) {
          tdee = bmr * 1.55;
        }

        let calorieGoal = 0;
        if (userGoal === 'Lose') {
          calorieGoal = tdee - 500;
        } else if (userGoal === 'Maintain') {
          calorieGoal = tdee;
        } else if (userGoal === 'Gain') {
          calorieGoal = tdee + 500;
        }
        console.log(calorieGoal);
        return calorieGoal.toFixed(0);
      }
      return 2000;
    });

    const goalDataset = reactive({
      label: 'Goal',
      data: [],
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
    });


    onMounted(async () => {
      await fetchUserData();

      let chart = null; // Chart instance variable

       if (!chart) {
          chart = new Chart(chartContainer.value, {
            type: 'line',
            data: {
              labels: calorieData.map((entry) => entry.date),
              datasets: [
                {
                  label: 'Calorie Intake',
                  data: calorieData.map((entry) => entry.intake),
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                  label: 'Goal',
                  data: Array(calorieData.length).fill(goal.value),
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                },
              ],
            },
          options: {
              responsive: true,
              maintainAspectRatio: false,
            },
          });
        }

  watch(goal, (newGoal) => {
    const datasetIndex = 1; // Index of the "Goal" dataset in the chart's datasets array
    const goalDataset = chart.data.datasets[datasetIndex];
    goalDataset.data = Array(calorieData.length).fill(newGoal);
    chart.update();
  });

  console.log(goal.value);
});

    const addEntry = () => {
  if (newEntry.date && newEntry.intake) {
    showError.value = false;

    const existingEntryIndex = calorieData.findIndex(
      (entry) => entry.date === newEntry.date
    );

    const chart = Chart.getChart(chartContainer.value);

    if (existingEntryIndex !== -1) {
      calorieData.splice(existingEntryIndex, 1, { ...newEntry });
    } else {
      calorieData.push({ ...newEntry });
    }

    chart.data.labels = calorieData.map((entry) => entry.date);
    chart.data.datasets[0].data = calorieData.map((entry) => entry.intake);

    const goalData = Array(calorieData.length).fill(goal.value);
    chart.data.datasets[1].data = goalData;

    chart.update();

    newEntry.date = '';
    newEntry.intake = null;
    accumulatedCalories.value = '0';

    console.log(calorieData);
  } else {
    showError.value = true;
  }
};

    const addCalories = () => {
      accumulatedCalories.value = Number(accumulatedCalories.value) + Number(newEntry.intake);
    };

    fetchUserData(); // Fetch user data on component setup

    return {
      chartContainer,
      calorieData,
      addEntry,
      newEntry,
      accumulatedCalories,
      addCalories,
      showError,
      user,
    };
  },
};

</script>

<style scoped>
body {
  background-color: #f1f9ee;
}

.container {
  display: flex;
  margin-top: 25px;
}

.chart {
  width: 40%;
  margin: 50px 0px 0px 210px;
  height: 80vh;
  background: white;
  padding: 50px;
  border: 2px solid black;
  /* z-index: 2; */

}

.today-calories {
  background: white;
  width: 40%;
  height: 80vh;
  margin: 50px 0px 0px -2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 2px solid black;
  z-index: 1;
  padding: 50px;
}

.input {
  width: 80%;
  display: flex;
  background: white;
  height: 10vh;
  text-align: center;
  display: flex; 
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

#dateInput {
  height: 50px;
  padding: 10px;
  font-size: 10px;
  box-shadow: 0;
  text-align: center;
  width: 80%;
}

#calorieInput {
  height: 50px;
  font-size: 10px;
  box-shadow: 0;
  text-align: center;
  width: 120px;
}

button {
  width: 90px;
  height: 50px;
}

.submit {
  position: absolute;
  top: 200px;
  left: 800px;
  z-index: 4;
}

#accumulator {
  font-size: 100px;
  font-weight: 700;
}

#submit-calories {
  width: 90%;
  padding: 5px;
  margin-top: 15px;
}
</style>
