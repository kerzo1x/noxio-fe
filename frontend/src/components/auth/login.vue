<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'


const isLoading = ref(false)
const email = ref('')
const password = ref('')
const message = ref('')


const handleLogin = async () => {
    if (!email.value || !password.value) {
        message.value = 'Please enter your email and password.'
        return
    }

    isLoading.value = true
    message.value = ''

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })

        const data = await response.json()

        if (response.ok) {
            message.value = 'Login successful! Redirecting...'
            // Здесь обычно сохраняют токен: localStorage.setItem('token', data.token)
        } else {
            // Выводим ошибку от сервера (например, "Wrong password")
            message.value = data.error || `Error ${response.status}: Login failed`
        }
    } catch (err) {
        message.value = 'Network error. Please check your connection.'
    } finally {
        isLoading.value = false
    }
}

const handleGoogleLogin = () => {
    console.log('Google Auth: Logic will be implemented here later.')
}
</script>

<template>
    <div class="min-h-screen flex bg-surface font-sans text-text-main">
        <div class="hidden lg:flex lg:w-1/2 bg-brand-gray items-center justify-center">
            <div class="text-brand-black font-bold text-4xl">NOXIO</div>
        </div>

        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-brand-white">
            <div class="w-full max-w-md space-y-8">
                <h1 class="text-4xl font-bold">Log In</h1>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div class="form-field">
                        <input v-model="email" type="email" placeholder="Email" class="form-input" required />
                        <div class="input-focus-border"></div>
                    </div>
                    <div class="form-field">
                        <input v-model="password" type="password" placeholder="Password" class="form-input" required />
                        <div class="input-focus-border"></div>
                    </div>
                    <button type="submit" :disabled="isLoading" class="btn-primary">
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </form>
                <div class="text-center my-4 text-sm text-brand-gray uppercase font-medium">
                    or
                </div>
                <button type="button" class="google-btn" @click="handleGoogleLogin">
                    <img src="../../assets/img/google.png" class="w-5 h-5" alt="Google" />
                    Continue with Google
                </button>
                <div class="text-center text-sm mt-6">
                    <span class="text-brand-gray">Don't have an account? </span>
                    <router-link to="/register" class="text-brand-black font-semibold hover:underline transition-all">
                        Sign up
                    </router-link>
                </div>
                <p v-if="message"
                    :class="['text-center text-sm font-medium mt-4', message.includes('successful') ? 'text-green-600' : 'text-error']">
                    {{ message }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.form-field {
  @apply relative;
}

.form-input {
  /* Базовый стиль с медленным переходом цвета */
  @apply w-full p-3 bg-brand-white border border-brand-gray rounded-auth outline-none 
         transition-colors duration-500 placeholder:text-brand-gray text-brand-black;
}

/* Скрытый черный слой контура (проявляется плавно) */
.input-focus-border {
  @apply absolute inset-0 rounded-auth pointer-events-none border-2 border-brand-black opacity-0;
  transition: opacity 0.8s ease-in-out;
}

/* При фокусе на инпуте черный контур плавно проявляется */
.form-input:focus + .input-focus-border {
  @apply opacity-100;
}

/* Скрываем стандартный бордер при фокусе */
.form-input:focus {
  border-color: transparent;
}

/* Кнопка Sign In (твоя любимая версия) */
.btn-primary {
  @apply w-full bg-brand-black text-brand-white p-3 rounded-auth font-semibold 
         hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] 
         transition-all duration-200 
         disabled:bg-brand-gray disabled:cursor-not-allowed disabled:scale-100;
}

/* Кнопка Google */
.google-btn {
  @apply w-full flex items-center justify-center gap-3 p-3 border border-brand-gray 
         rounded-auth font-semibold hover:bg-surface transition-all text-brand-black
         hover:scale-[1.02] active:scale-[0.98] duration-200;
}
</style>