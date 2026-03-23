import { createRouter, createWebHistory } from 'vue-router'
// Проверь, чтобы пути к файлам были правильными
import register from '../components/auth/register.vue'
import login from '../components/auth/login.vue'
import verify from '../components/auth/verify.vue'
import Pers from '../components/personalizasation/pers.vue'

const routes = [
    {
        path: '/register',
        name: 'Register',
        component: register
    },
    {
        path: '/login',
        name: 'Login',
        component: login
    },
    {
        path: '/verify',
        name: 'Verify',
        component: verify
    },
    {
        path: '/pers',
        name: 'Pers',
        component: Pers
    },
    {
        path: '/',
        redirect: '/login' // По умолчанию кидаем на логин
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router