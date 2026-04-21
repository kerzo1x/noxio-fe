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
                component: () => import('../components/auth/RegisterPage.vue') // Lazy loaded
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import('../components/auth/LoginPage.vue')
            },
            {
                path: 'verify',
                name: 'Verify',
                component: () => import('../components/auth/VerifyPassword.vue')
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: () => import('../components/auth/ForgotPassword.vue')
            },
            {
                path: 'reset-password',
                name: 'ResetPassword',
                component: () => import('../components/auth/ResetPassword.vue')
            },
            {
                path: '/auth/edupage',
                name: 'EduPageConnect',
                component: () => import('../components/edupage/EdupageConnect.vue')
            },
            {
                path: '/auth/edupage/login',
                name: 'EduPageLogin',
                component: () => import('../components/edupage/EdupageLogin.vue')
            },
            {
                path: '/home',
                name: 'Home',
                component: () => import('../components/dashboard/HomePage.vue')
            }
        ]
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('../components/dashboard/HomePage.vue')
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