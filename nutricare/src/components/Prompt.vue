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
          >
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-text">{{ step }}</div>
          </li>
        </ul>
      </div>
      <div class="form-container">
        <component :is="currentStepComponent" @form-submitted="handleFormSubmitted" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import PersonalDetails from './form-steps/PersonalDetails.vue';

export default {
  components: {
    PersonalDetails,
  },
  setup() {
    const steps = ['Personal Details', 'Activity Level', 'Weight and Height', 'Goal', 'Summary and Confirmation'];
    const currentStep = ref(0);

    const currentStepComponent = computed(() => {
      switch (currentStep.value) {
        case 0:
          return PersonalDetails;
        // Add other form components here for different steps
        default:
          return null;
      }
    });

    const handleFormSubmitted = () => {
      // Handle the form submission

      // Move to the next step
      currentStep.value++;
    };

    return {
      steps,
      currentStep,
      currentStepComponent,
      handleFormSubmitted,
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
  background-color: #f5f5f5;
}

.content {
  display: flex;
  width: 80%;
  height: 80%;
  background-color: #ffffff;
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
  padding: 3rem;
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