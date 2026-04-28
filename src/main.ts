import { createApp } from 'vue'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router' // Твой файл роутера

const app = createApp(App)

app.use(router) // Подключаем роутер к приложению

app.mount('#app') // И только потом отображаем на странице