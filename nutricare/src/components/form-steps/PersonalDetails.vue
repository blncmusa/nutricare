<template>
  <form class="personal-details-form">
    <h2>Personal Details</h2>
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input type="text" id="firstName" v-model="firstName" />
    </div>
    <div class="form-group">
      <label for="lastName">Last Name</label>
      <input type="text" id="lastName" v-model="lastName" />
    </div>
    <div class="form-group">
      <label for="age">Age</label>
      <input type="number" id="age" v-model="age" />
    </div>
    <div class="form-group">
      <label for="gender">Gender</label>
      <select id="gender" v-model="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </div>
    <button @click.prevent="submitForm">Next</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      age: null,
      gender: '',
    };
  },
  methods: {
    submitForm() {
      this.$emit('personal-details-submitted', {
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        gender: this.gender,
      });
    },
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
</style>
