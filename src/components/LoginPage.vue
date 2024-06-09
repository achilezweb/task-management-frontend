<template>
  <div class="min-h-screen bg-gray-900 flex items-center justify-center">
    <div class="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
      <h1 class="text-2xl font-bold text-white mb-4">Login</h1>
      <form @submit.prevent="login" class="space-y-4">
        <div>
          <input v-model="email" type="email" placeholder="Email" class="w-full p-2 text-gray-900 rounded" required/>
          <p v-if="errors.email" class="text-red-500">{{ errors.email }}</p>
        </div>
        <div>
          <input v-model="password" type="password" placeholder="Password" class="w-full p-2 text-gray-900 rounded" required/>
          <p v-if="errors.password" class="text-red-500">{{ errors.password }}</p>
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
        <p v-if="errors.general" class="text-red-500">{{ errors.general }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      errors: {}
    };
  },
  methods: {
    login() {
      this.errors = {}; // Clear previous errors
      axios.post('/login', {
        email: this.email,
        password: this.password
      }).then(response => {
        localStorage.setItem('auth-token', response.data);
        this.$router.push({ name: 'Tasks' });
      }).catch(error => {
        if (error.response && error.response.data.errors) {
          this.errors = error.response.data.errors;
        } else {
          this.errors.general = 'An error occurred during login.';
        }
      });
    }
  }
};
</script>
