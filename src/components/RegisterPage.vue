<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-white mb-4">Register</h1>
      <form @submit.prevent="register" class="space-y-4">
        <div>
          <input v-model="name" type="text" placeholder="Name" class="w-full p-2 text-gray-900 rounded" required/>
          <p v-if="errors.name" class="text-red-500">{{ errors.name }}</p>
        </div>
        <div>
          <input v-model="email" type="email" placeholder="Email" class="w-full p-2 text-gray-900 rounded" required/>
          <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password" class="w-full p-2 text-gray-900 rounded" required/>
          <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
        </div>
        <div>
          <input v-model="password_confirmation" type="password" placeholder="Confirm Password" class="w-full p-2 text-gray-900 rounded" required/>
          <p v-if="errors.password_confirmation" class="text-red-500">{{ errors.password_confirmation }}</p>
        </div>
        <button type="submit" class="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Register
        </button>
        <p v-if="errors.general" class="text-red-500">{{ errors.general }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'RegisterPage',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: {}
    };
  },
  methods: {
    register() {
      this.errors = {}; // Clear previous errors
      axios.post('/register', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then(() => {
        this.$router.push({ name: 'LoginPage' });
      }).catch(error => {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.errors.general = 'An error occurred during registration.';
        }
      });
    }
  }
};
</script>
