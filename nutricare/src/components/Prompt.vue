<template>
  <div class="container"> 
    <div class="content">
      <div class="steps">
        <ul>
          <li
            v-for="(step, index) in steps"
            :key="index"
            :class="{ active: currentStep === index }"
            class="step-item"
            @click="currentStep = index"
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-text">{{ step }}</div>
          </li>
        </ul>
      </div>
      <div class="form-container">
        <component
          :is="getCurrentStepComponent"
          @next-step="handleNextStep"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import PersonalDetails from './form-steps/PersonalDetails.vue';
import ActivityLevel from './form-steps/ActivityLevel.vue';
import WeightHeight from './form-steps/WeightHeight.vue';
import Goals from './form-steps/Goals.vue';
import Submission from './form-steps/Submission.vue';

export default {
  components: {
    PersonalDetails,
    ActivityLevel,
    WeightHeight,
    Goals,
    Submission
  },
  setup() {
    const steps = ['Personal Details', 'Activity Level', 'Weight and Height', 'Goal', 'Summary and Confirmation'];
    const components = [PersonalDetails, ActivityLevel, WeightHeight, Goals, Submission];
    const currentStep = ref(0);
    const showPrompt = ref(true);

    const getCurrentStepComponent = computed(() => components[currentStep.value]);

    const handleNextStep = () => {
      if (currentStep.value < components.length - 1) {
        currentStep.value++;
      } else {
        showPrompt.value = false;
      }
    };

    return {
      steps,
      currentStep,
      getCurrentStepComponent,
      handleNextStep,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  font-size: 16px;
}

.content {
  display: flex;
  width: 80%;
  height: 80%;
  background-color: #f1f9ee;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.steps {
  flex: 3;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.step-item {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.step-number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.step-text {
  color: #ffffff;
  font-weight: bold;
}

.form-container {
  flex: 7;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  background-color: #ffffff;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.steps ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.steps ul li {
  color: #ffffff;
}

</style>