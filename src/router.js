import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './components/LoginPage.vue';
import RegisterPage from './components/RegisterPage.vue';
import TaskList from './components/TaskList.vue';

const routes = [
    { path: '/login', name: 'LoginPage', component: LoginPage },
    { path: '/register', name: 'RegisterPage', component: RegisterPage },
    { path: '/tasks', name: 'Tasks', component: TaskList },
  ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
