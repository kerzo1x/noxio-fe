<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from '../../components/buttons/BaseButton.vue'
import BaseInput from '../../components/inputs/BaseInput.vue'
const router = useRouter()
const isLoading = ref(false)
const email = ref('')
const password = ref('')
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
        const token = localStorage.getItem('access_token');
        const response = await fetch('https://hrica.skyro.dev/api/v1/integrations/edupage/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                username: email.value,
                password: password.value
            })
        })
        let data: any = {}
        try { data = await response.json() } catch (e) { }

        if (response.ok) {
            message.value = 'Integrated successfully!'
            setTimeout(() => router.push('/home'), 1500)
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
                    <base-input v-model="email" type="text" label="Username" place-holder="Placeholder"
                        :is-error="isError" @clear-error="isError = false; message = ''" />
                    <base-input v-model="password" type="password" label="Password" place-holder="Placeholder"
                        :is-error="isError" @clear-error="isError = false; message = ''" />
                </div>

                <div class="flex justify-end">
                    <router-link to="/auth/forgot-password"
                        class="text-sm text-panel-label hover:text-panel-text transition-colors duration-200">
                        Forgot Password?
                    </router-link>
                </div>

                <base-button :is-loading="isLoading" text="Sign in to EduPage" />
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

.skip-link {
    @apply text-sm text-panel-label underline underline-offset-2 hover:text-panel-text transition-colors duration-200 cursor-pointer;
}
</style>