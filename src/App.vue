<template>
  <div id="app">
    <nav class="flex justify-around p-4 bg-gray-800">
      <router-link v-if="!isAuthenticated" to="/login" class="text-white">Login</router-link>
      <router-link v-if="!isAuthenticated" to="/register" class="text-white">Register</router-link>
      <button v-if="isAuthenticated" @click="logout" class="text-white">Logout</button>
      <router-link to="/tasks" class="text-white">Tasks</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import axios from './axios';

export default {
  name: 'App',
  data() {
    return {
      isAuthenticated: false
    };
  },
  created() {
    this.isAuthenticated = !!localStorage.getItem('auth-token');
  },
  methods: {
    logout() {
      axios.post('/logout')
        .then(() => {
          localStorage.removeItem('auth-token');
          this.isAuthenticated = false;
          this.$router.push({ name: 'LoginPage' });
        })
        .catch(error => {
          console.error('There was an error logging out:', error);
        });
    }
  },
  watch: {
    $route() {
      // Update authentication status on route change
      this.isAuthenticated = !!localStorage.getItem('auth-token');
    }
  }
}
</script>

<style>
nav a {
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
}
nav a.router-link-exact-active {
  background: #4a5568;
}
</style>
