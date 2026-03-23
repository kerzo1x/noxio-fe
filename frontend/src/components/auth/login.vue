<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'


const isLoading = ref(false)
const email = ref('')
const password = ref('')
const message = ref('')


const isError = ref(false) // Новое состояние

const handleLogin = async () => {
    if (!email.value || !password.value) {
        message.value = 'Please enter your email and password.'
        isError.value = true // Подсвечиваем пустые поля
        return
    }

    isLoading.value = true
    message.value = ''
    isError.value = false // Сбрасываем ошибку перед запросом

    try {
        const response = await fetch('https://my-noxio-test.free.beeceptor.com', {
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
            isError.value = false
        } else {
            message.value = data.error || 'Login failed'
            isError.value = true // ВКЛЮЧАЕМ ПОДСВЕТКУ ПРИ ОШИБКЕ
        }
    } catch (err) {
        message.value = 'Network error. Please check your connection.'
        isError.value = true
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
                        <input v-model="email" type="email" placeholder="Email" class="form-input"
                            :class="{ 'input-error': isError }" @input="isError = false" required />
                        <div class="input-focus-border"></div>
                    </div>

                    <div class="form-field">
                        <input v-model="password" type="password" placeholder="Password" class="form-input"
                            :class="{ 'input-error': isError }" @input="isError = false" required />
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
  @apply w-full p-3 bg-brand-white border border-brand-gray rounded-auth outline-none 
         transition-all duration-300 placeholder:text-brand-gray text-brand-black;
}

/* --- МАГИЯ ОШИБКИ ЗДЕСЬ --- */

/* 1. Когда есть ошибка, красим сам инпут */
.form-input.input-error {
  border-color: #ef4444 !important; /* Красный border */
  background-color: #fef2f2 !important; /* Нежно-розовый фон */
}

/* 2. Меняем цвет плейсхолдера при ошибке */
.input-error::placeholder {
  color: #f87171 !important;
}

/* 3. ОЧЕНЬ ВАЖНО: Настраиваем накладной бордер при ошибке */
/* Если у инпута ошибка, то накладной черный бордер должен стать красным и показаться */
.input-error + .input-focus-border {
  border-color: #ef4444 !important;
  opacity: 1 !important; /* Делаем его видимым сразу при ошибке */
}

/* 4. При фокусе на инпуте с ошибкой сохраняем красный цвет */
.input-error:focus + .input-focus-border {
  border-color: #b91c1c !important; /* Делаем чуть темнее при фокусе */
}

/* --- ОСТАЛЬНЫЕ СТИЛИ --- */

.input-focus-border {
  @apply absolute inset-0 rounded-auth pointer-events-none border-2 border-brand-black opacity-0;
  transition: opacity 0.4s ease-in-out;
}

.form-input:not(.input-error):focus + .input-focus-border {
  @apply opacity-100;
}

.form-input:focus {
  border-color: transparent;
}

.btn-primary {
  @apply w-full bg-brand-black text-brand-white p-3 rounded-auth font-semibold 
         hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] 
         transition-all duration-200 
         disabled:bg-brand-gray disabled:cursor-not-allowed;
}

.google-btn {
  @apply w-full flex items-center justify-center gap-3 p-3 border border-brand-gray 
         rounded-auth font-semibold hover:bg-surface transition-all text-brand-black;
}
</style>