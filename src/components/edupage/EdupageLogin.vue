<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const message = ref('')
const isError = ref(false)

const handleLogin = async () => {
    if (!email.value || !password.value) {
        message.value = 'Please enter your credentials.'
        isError.value = true
        return
    }

    isLoading.value = true
    message.value = ''
    isError.value = false

    try {
        const response = await fetch('https://my-noxio-test.free.beeceptor.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value })
        })

        let data: any = {}
        try { data = await response.json() } catch (e) { }

        if (response.ok) {
            message.value = 'Integrated successfully!'
            setTimeout(() => router.push('/dashboard'), 1500)
        } else {
            isError.value = true
            message.value = data.error || 'Integration failed.'
        }
    } catch {
        isError.value = true
        message.value = 'Network error.'
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center p-6 bg-brand-black font-sans text-center">
        <div class="w-full max-w-sm flex flex-col items-center">

            <div class="space-y-4 mb-10 max-w-70">
                <h1 class="text-4xl font-bold text-brand-white leading-tight">
                    Sign in to EduPage
                </h1>
                <p class="text-panel-label text-[10px] tracking-[0.25em] font-medium opacity-80 uppercase">
                    so you can see your timetable
                </p>
            </div>

            <form @submit.prevent="handleLogin" class="w-full space-y-6 text-left">
                <div class="space-y-4">
                    <div class="space-y-2">
                        <label class="text-sm font-medium text-panel-label ml-1">Username</label>
                        <input v-model="email" type="text" placeholder="Placeholder" class="field-input"
                            :class="{ 'input-error': isError }" @input="isError = false; message = ''" />
                    </div>

                    <div class="space-y-2">
                        <label class="text-sm font-medium text-panel-label ml-1">Password</label>
                        <div class="relative">
                            <input v-model="password" :type="showPassword ? 'text' : 'password'"
                                placeholder="Placeholder" class="field-input pr-11" :class="{ 'input-error': isError }"
                                @input="isError = false; message = ''" />
                            <button type="button" class="eye-btn" @click="showPassword = !showPassword">
                                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <button type="submit" :disabled="isLoading" class="btn-primary">
                    {{ isLoading ? 'Integrating...' : 'Integrate EduPage' }}
                </button>
            </form>

            <div class="mt-8 flex flex-col items-center gap-4">
                <button @click="router.push('/home')"
                    class="text-panel-label text-sm underline underline-offset-8 decoration-1 hover:text-panel-text transition-colors">
                    skip step
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.field-input {
    @apply w-full px-4 py-3 rounded-auth outline-none border-none bg-panel-input-bg text-panel-text placeholder:text-panel-placeholder transition-all duration-200;
}

.field-input:focus {
    @apply ring-1 ring-panel-text/30;
}
//
.field-input.input-error {
    @apply ring-2 ring-error;
}

.eye-btn {
    @apply absolute right-3 top-1/2 -translate-y-1/2 text-panel-placeholder hover:text-panel-label transition-colors;
}

.btn-primary {
    @apply w-full bg-brand-white text-brand-black py-4 rounded-auth font-bold text-lg hover:bg-brand-white/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed;
}

.btn-white-fix {
    @apply bg-white text-black hover:bg-white/90;
}
</style>