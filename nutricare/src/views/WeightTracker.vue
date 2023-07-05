<template>
    <div class="container">
        <h1>Weight Tracker</h1>
        <div class="current">
            <span>{{ currentWeight.weight }}</span>
            <small>Current weight (kg)</small>

            <form @submit.prevent='addWeight'>
                <input type="number" step="0.1" v-model='weightInput'>
                <input type="submit" value="Update Weight">
            </form>
        </div>
    </div>
</template>

<script>
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import Chart from 'chart.js/auto'
export default {
  setup(){
    const weight = ref([])
    const weightChartEl = ref(null)
    const weightChart = shallowRef(null)

    const weightInput = ref(60.0)
    const currentWeight = computed(() => {
        return weight.value.sort((a, b) => b.date - a.date)[0] || { weight: 0}
    })

    const addWeight = () => {
        weights.value.push({
            weight: weightInput.value,
            date: new Date().getTime
        })
    }

    return { currentWeight, weightInput }
  }
}
</script>

<style scoped>
    .container {
        margin-left: 200px;
    }
</style>