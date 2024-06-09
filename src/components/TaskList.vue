<template>
    <div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div class="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 class="text-2xl font-bold mb-4">Task List</h1>
        <ul class="mb-4">
          <li v-for="task in tasks" :key="task.id" class="flex justify-between items-center mb-2 p-2 bg-gray-700 rounded">
            <span class="w-3/4">{{ task.title }} - {{ task.completed ? 'Completed' : 'Pending' }}</span>
            <div class="flex-shrink-0">
              <button 
                @click="toggleComplete(task)" 
                :class="{'bg-green-500 hover:bg-green-700': !task.completed, 'bg-yellow-500 hover:bg-yellow-700': task.completed}"
                class="text-white font-bold py-1 px-2 rounded mr-2">
                    {{ task.completed ? 'Mark as Pending' : 'Mark as Complete' }}
              </button>
              <button @click="deleteTask(task.id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
            </div>
          </li>
        </ul>
        <form @submit.prevent="addTask" class="flex">
          <input v-model="newTask" class="w-full p-2 mr-6 text-black rounded" placeholder="New Task" required/>
          <button type="submit" class="w-1/3 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Add Task</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../axios'; // Adjust the path as necessary
  
  export default {
    data() {
      return {
        tasks: [],
        newTask: ''
      };
    },
    created() {
      this.fetchTasks();
    },
    methods: {
      fetchTasks() {
        axios.get('/v1/tasks')
          .then(response => {
            this.tasks = response.data.data; // Access the nested "data" field
          })
          .catch(error => {
            console.error('There was an error fetching tasks:', error);
          });
      },
      addTask() {
        axios.post('/v1/tasks', { title: this.newTask })
          .then(response => {
            this.tasks.unshift(response.data.data);
            this.newTask = '';
          })
          .catch(error => {
            console.error('There was an error adding the task:', error);
          });
      },
      toggleComplete(task) {
        axios.put(`/v1/tasks/${task.id}`, { completed: !task.completed })
          .then(response => {
            task.completed = response.data.data.completed;
          })
          .catch(error => {
            console.error('There was an error toggling task completion:', error);
          });
      },
      deleteTask(id) {
        axios.delete(`/v1/tasks/${id}`)
          .then(() => {
            this.tasks = this.tasks.filter(task => task.id !== id);
          })
          .catch(error => {
            console.error('There was an error deleting the task:', error);
          });
      }
    }
  }
  </script>
  
  <style scoped>
/* Add any custom styles here */
</style>