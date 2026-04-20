<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const handleSkip = () => {
    // TODO: implement skip
}

const handleSignIn = () => {
    router.push({ name: 'EduPageLogin' })
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-panel-bg">
        <div class="text-center space-y-10 px-8 w-full max-w-lg">

            <div class="space-y-3">
                <h1 class="text-4xl font-bold text-panel-text">Sign in to EduPage</h1>
                <p class="text-panel-label text-sm tracking-wide">so you can see your timetable</p>
            </div>

            <div class="flex gap-4">
                <button type="button" class="btn-secondary flex-1" @click="handleSkip">
                    Skip
                </button>
                <button type="button" class="btn-primary flex-1" @click="handleSignIn">
                    Sign in
                </button>
            </div>

            <button type="button" class="skip-link" @click="handleSkip">
                skip step
            </button>

        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.btn-primary {
    @apply bg-brand-white text-brand-black py-3 rounded-auth font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200;
}

.btn-secondary {
    @apply py-3 rounded-auth font-semibold text-panel-text border border-panel-input-border hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200;
}

.skip-link {
    @apply text-sm text-panel-label underline underline-offset-2 hover:text-panel-text transition-colors duration-200;
}
</style>