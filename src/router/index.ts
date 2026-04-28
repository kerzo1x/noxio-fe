import HomePage from '../pages/dashboard/HomePage.vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        // Parent route for all authentication-related pages
        path: '/auth',
        children: [
            {
                path: 'register',
                name: 'Register',
                component: () => import('../pages/auth/RegisterPage.vue')
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import('../pages/auth/LoginPage.vue')
            },
            {
                path: 'verify',
                name: 'Verify',
                component: () => import('../pages/auth/VerifyPassword.vue')
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: () => import('../pages/auth/ForgotPassword.vue')
            },
            {
                path: 'reset-password',
                name: 'ResetPassword',
                component: () => import('../pages/auth/ResetPassword.vue')
            },
            {
                path: 'edupage',
                name: 'EdupageConnect',
                component: () => import('../pages/edupage/EdupageConnect.vue')
            },
            {
                path: 'edupage/login',
                name: 'EdupageLogin',
                component: () => import('../pages/edupage/EdupageLogin.vue')
            }
        ]
    },
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage // Без стрелочной функции
    },
    {
        // Redirect empty root path to the login page
        path: '/',
        redirect: '/auth/login'
    },
    {
        // Catch-all route: redirects any undefined URL to the login page (404 handling)
        path: '/:pathMatch(.*)*',
        redirect: '/auth/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router