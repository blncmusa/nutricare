<template>
  <div class="container">
    <div class="chart">
      <canvas ref="chartContainer"></canvas>
    </div>
    <div class="today-calories">
          <h2>Today's Calories</h2>
          <p id='accumulator'>{{ accumulatedCalories }}</p>
          <div>
          <label for="calorieInput">Calorie Intake:</label>
            <input type="number" id="calorieInput" v-model="newEntry.intake">
            <button @click="addCalories">Add</button>
          </div>
            <button id='submit-calories' @click="addEntry">Submit Calories</button>
    </div>
  </div>
  <!-- <div class="input">
    <label for="dateInput">Date:</label>
    <input type="date" id="dateInput" v-model="newEntry.date">

    <label for="calorieInput">Calorie Intake:</label>
    <input type="number" id="calorieInput" v-model="newEntry.intake">

    <button @click="addEntry">Add Entry</button>
  </div> -->
</template>

<script>
import { onMounted, reactive, ref } from 'vue';
import Chart from 'chart.js/auto';

export default {
  setup() {
    const chartContainer = ref(null);

    const calorieData = reactive([
      { date: '2023-07-01', intake: 1800 },
      { date: '2023-07-02', intake: 1100 },
      // ... add more entries for each day
    ]);

    const newEntry = reactive({ date: '', intake: null });

    const goal = 2000; // Example goal value

    const accumulatedCalories = ref(0)

    onMounted(() => {
      const chart = new Chart(chartContainer.value, {
        type: 'line',
        data: {
          labels: calorieData.map(entry => entry.date),
          datasets: [
            {
              label: 'Calorie Intake',
              data: calorieData.map(entry => entry.intake),
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
              label: 'Goal',
              data: Array(calorieData.length).fill(goal),
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    });

    const addEntry = () => {
        
        const chart = Chart.getChart(chartContainer.value);

        calorieData.push({ ...newEntry });

        chart.data.labels = calorieData.map(entry => entry.date);

        chart.data.datasets[0].data = calorieData.map(entry => entry.intake);

        chart.data.datasets[1].data = Array(calorieData.length).fill(goal);
        chart.update();
 
        newEntry.date = '';
        newEntry.intake = null;

        console.log(calorieData);
    };

    const addCalories = () => {
      accumulatedCalories.value += newEntry.intake;
    }


    return { chartContainer, calorieData, addEntry, newEntry, accumulatedCalories, addCalories };
  },
};
</script>

<style scoped>
body {
  background-color: #f1f9ee;
}

.container {
  display: flex;
}

.chart {
  width: 40%;
  margin: 50px 0px 0px 210px;
  height: 80vh;
  background: white;
  padding: 20px;
  border-radius: 10px;
}

.today-calories {
  background: white;
  width: 40%;
  height: 80vh;
  margin: 50px 0px 0px 0px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.input {
  width: 80%;
  margin-left: 210px;
  padding: 75px 0px; 
  display: flex;
  gap: 20px;
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
  padding: 20px;
  padding-bottom: 50px;
  font-size: 20px;
  box-shadow: 0;
  text-align: center;
}

 #calorieInput {
  height: 50px;
  font-size: 20px;
  box-shadow: 0;
  text-align: center;
  margin: 80px 20px 0px 20px;

}

button {
  width: 90px;
  height: 50px;
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
