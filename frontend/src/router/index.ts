import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    // Группа маршрутов авторизации
    {
        path: '/auth',
        children: [
            {
                path: 'register',
                name: 'Register',
                component: () => import('../components/auth/register.vue')
            },
            {
                path: 'login',
                name: 'Login',
                component: () => import('../components/auth/login.vue')
            },
            {
                path: 'verify',
                name: 'Verify',
                component: () => import('../components/auth/verify.vue')
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: () => import('../components/auth/forgotPassword.vue')
            },
            {
                path: 'reset-password',
                name: 'ResetPassword',
                component: () => import('../components/auth/resetPassword.vue') 
            }
        ]
    },

    // main page
    {
        path: '/',
        redirect: '/auth/login'
    },

    // if user write wrong url
    {
        path: '/:pathMatch(.*)*',
        redirect: '/auth/login'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router