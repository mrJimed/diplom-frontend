import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Registration from '../pages/Registration.vue';

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/registration', name: 'Registration', component: Registration },
];

export default createRouter({
    history: createWebHistory(),
    routes
});