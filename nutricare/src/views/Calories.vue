<template>
    <div class="chart">
        <canvas ref='chartContainer'></canvas>
    </div>
     <div class='input'>
      <label for="dateInput">Date:</label>
      <input type="date" id="dateInput" v-model="newEntry.date">

      <label for="calorieInput">Calorie Intake:</label>
      <input type="number" id="calorieInput" v-model="newEntry.intake">

      <button @click="addEntry">Add Entry</button>
    </div>
</template>

<script>
import { computed, nextTick, onMounted, reactive, ref, shallowRef, watch } from 'vue'
import Chart from 'chart.js/auto'
import Prompt from '../components/Prompt.vue'

export default {
    components: { Prompt },
    setup() {
    const chartContainer = ref(null);

    const calorieData = [
        { date: '2023-07-01', intake: 1800 },
        { date: '2023-07-02', intake: 1600 },
         // ... add more entries for each day
    ];

    const newEntry = reactive({ date: '', intake: null });

    const goal = 2000; // Example goal value


    onMounted(() => {
      const chartData = {
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
      };

      new Chart(chartContainer.value, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        }
      });
    });

    const addEntry = () => {
      calorieData.push({ ...newEntry });
      newEntry.date = '';
      newEntry.intake = null;

      const chart = Chart.getChart(chartContainer.value);
      chart.data.labels.push(newEntry.date);
      chart.data.datasets[0].data.push(newEntry.intake);
      chart.update();
      console.log(calorieData)
    };

    return { chartContainer, calorieData, addEntry, newEntry };
  }
  }
</script>

<style scoped>
    body {
        background-color: #f1f9ee;
    }
    .chart {
        width: 80%;
        margin: 100px 100px 100px 210px;
        height: 70vh;
        background: white;
        padding: 20px; 
        border-radius: 10px;
    }
    .input {
        width: 80%;
        margin-left: 210px;
        display: flex;
        gap: 20px;
    }
    .chartContainer {
        width: 70;
    }
</style>