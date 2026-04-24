<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../../components/buttons/BaseButton.vue'
import BaseInput from '../../components/inputs/BaseInput.vue'
const router = useRouter()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const message = ref('')
const isError = ref(false)

const handleSkip = async () => {
    await router.push({ name: 'HomePage' })
}

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
        <div class="w-full max-w-lg flex flex-col items-center">

            <div class="space-y-4 mb-10 max-w-full">
                <h1 class="text-4xl font-bold text-brand-white leading-tight">
                    Sign in to EduPage
                </h1>
                <p class="text-panel-label text-sm tracking-wide">so you can see your timetable</p>
            </div>

            <form @submit.prevent="handleLogin" class="w-full space-y-6 text-left">
                <div class="flex flex-col gap-4">
                        <base-input 
                            v-model="email"
                            type="email"
                            label="Email" 
                            place-holder="Placeholder" 
                            :is-error="isError"
                            @clear-error="isError = false; message=''" 
                        />
                        <base-input
                            v-model="password"
                            type="password"
                            label="Password"
                            place-holder="Placeholder"
                            :is-error="isError"
                            @clear-error="isError = false; message=''"
                        />
                    </div>

                    <div class="flex justify-end">
                        <router-link to="/auth/forgot-password" class="text-sm text-panel-label hover:text-panel-text transition-colors duration-200">
                            Forgot Password?
                        </router-link>
                    </div>

                    <base-button 
                        :is-loading="isLoading"
                        text="Sign in to EduPage"
                    />
            </form>
            <div class="mt-10">
                <button type="button" class="skip-link" @click="handleSkip">
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
.field-input.input-error {
    @apply ring-2 ring-error;
}

.eye-btn {
    @apply absolute right-3 top-1/2 -translate-y-1/2 text-panel-placeholder hover:text-panel-label transition-colors cursor-pointer;
}

.btn-primary {
    @apply w-full bg-brand-white text-brand-black rounded-auth font-bold h-12 text-lg hover:bg-brand-white/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer;
}

.btn-white-fix {
    @apply bg-white text-black hover:bg-white/90;
}
.skip-link {
    @apply text-sm text-panel-label underline underline-offset-2 hover:text-panel-text transition-colors duration-200 cursor-pointer;
}
</style>