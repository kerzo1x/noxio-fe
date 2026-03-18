<script setup lang="ts">
import { ref } from 'vue'

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
</script>

<template>
    <div class="min-h-screen flex bg-surface font-sans text-text-main">
        <div class="hidden lg:flex lg:w-1/2 bg-brand-gray items-center justify-center">
            <div class="text-brand-black font-bold text-4xl">NOXIO</div>
        </div>

        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-brand-white">
            <div class="w-full max-w-md space-y-8">
                <h1 class="text-4xl font-bold">Sign In</h1>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div class="space-y-1">
                        <input v-model="email" type="email" placeholder="Email" class="form-input" required />
                    </div>
                    <div class="space-y-1">
                        <input v-model="password" type="password" placeholder="Password" class="form-input" required />
                    </div>

                    <button type="submit" :disabled="isLoading" class="btn-primary">
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </form>

                <p v-if="message"
                    :class="['text-center text-sm font-medium', message.includes('successful') ? 'text-green-600' : 'text-error']">
                    {{ message }}
                </p>

                <div class="text-center text-sm">
                    <span class="text-brand-gray">Don't have an account? </span>
                    <a href="/register" class="text-brand-black font-semibold hover:underline">Sign up</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.form-input {
    @apply w-full p-3 bg-brand-white border border-brand-gray rounded-auth outline-none focus:ring-2 focus:ring-brand-black transition-all placeholder:text-brand-gray;
}

.btn-primary {
    @apply w-full bg-brand-black text-brand-white p-3 rounded-auth font-semibold hover:opacity-90 transition-all disabled:bg-brand-gray;
}
</style>