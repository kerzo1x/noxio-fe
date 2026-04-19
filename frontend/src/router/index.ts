import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

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
                component: () => import('../components/auth/forgotPassword.vue') // Добавь этот файл позже
            },
            {
                path: 'reset-password',
                name: 'ResetPassword',
                component: () => import('../components/auth/resetPassword.vue') // И этот
            },
            {
                path: '/auth/edupage',
                name: 'EduPageConnect',
                component: () => import('../components/edupage/eduPageConnect.vue')
            },
            {
                path: '/auth/edupage/login',
                name: 'EduPageLogin',
                component: () => import('../components/edupage/eduPageLogin.vue')
            },
            // ... твои остальные маршруты /auth/...

            // Главная (заглушка)
            {
                path: '/home',
                name: 'Home',
                component: () => import('../components/Home.vue')
            },

            // Теперь при заходе на сайт кидаем на выбор EduPage
            {
                path: '/',
                redirect: '/auth/edupage'
            },
        ]
    },

    // Главная страница
    {
        path: '/',
        redirect: '/auth/login'
    },

    // 404 - на случай, если юзер забрел не туда
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