import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Registration from '../pages/Registration.vue';
import Login from '../pages/Login.vue';
import History from '../pages/History.vue';

/*
    Навигация.
*/

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/registration', name: 'Registration', component: Registration },
    { path: '/login', name: 'Login', component: Login },
    { path: '/history', name: 'History', component: History },
];

export default createRouter({
    history: createWebHistory(),
    routes
});