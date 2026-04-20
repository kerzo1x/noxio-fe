<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const code = ref(['', '', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])
const isError = ref(false)

const handleInput = (index: number, e: Event) => {
    isError.value = false
    const target = e.target as HTMLInputElement
    const value = target.value.slice(-1).toUpperCase()

    if (value && /^[A-Z0-9]$/.test(value)) {
        code.value[index] = value
        target.value = value
        if (index < 4) inputs.value[index + 1].focus()
    } else {
        code.value[index] = ''
        target.value = ''
    }
}

const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !code.value[index] && index > 0) {
        inputs.value[index - 1].focus()
    }
}

const handleVerify = async () => {
    const finalCode = code.value.join('')
    if (finalCode.length < 5) return

    try {
        const response = await fetch('https://my-noxio-test.free.beeceptor.com', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ code: finalCode })
        })

        if (!response.ok) {
            isError.value = true
        } else {
            router.push('/login')
        }
    } catch {
        isError.value = true
    }
}
</script>

<template>
    <div class="min-h-screen flex bg-surface text-text-main font-sans">
        <div class="hidden lg:block lg:w-1/2 bg-surface" />

        <div class="w-full lg:w-1/2 flex items-center justify-center p-10 bg-panel-bg">
            <div class="w-full max-w-sm text-center space-y-8">

                <div class="space-y-2">
                    <h1 class="text-4xl font-bold text-panel-text">Verify your email</h1>
                    <p class="text-panel-label text-sm leading-relaxed">
                        We sent a verification code to your email address.
                    </p>
                </div>

                <form @submit.prevent="handleVerify" class="space-y-8">
                    <div class="flex justify-between gap-3">
                        <input v-for="(_, i) in 5" :key="i"
                            :ref="(el) => { if (el) inputs[i] = el as HTMLInputElement }" v-model="code[i]" type="text"
                            inputmode="text" maxlength="1" class="otp-input" :class="{ 'input-error': isError }"
                            @input="handleInput(i, $event)" @keydown="handleKeyDown(i, $event)" />
                    </div>
//
                    <div class="flex gap-3">
                        <button type="button" class="btn-secondary w-20" @click="router.back()">
                            Back
                        </button>
                        <button type="submit" class="btn-primary flex-1">
                            Verify
                        </button>
                    </div>
                </form>

                <div class="h-6 flex items-center justify-center">
                    <p v-show="isError" class="text-error text-sm font-medium">
                        Invalid verification code.
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.otp-input {
    @apply w-full aspect-square text-center text-2xl font-bold rounded-auth outline-none bg-panel-input-bg text-panel-text transition-all duration-200;
    text-transform: uppercase;
}

.otp-input:focus {
    @apply ring-1 ring-panel-text/30;
}

.otp-input.input-error {
    @apply ring-2 ring-error text-error;
}

.btn-primary {
    @apply bg-brand-white text-brand-black py-3 rounded-auth font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200;
}

.btn-secondary {
    @apply py-3 rounded-auth font-semibold text-panel-label border border-panel-input-border hover:bg-white/5 hover:text-panel-text hover:scale-[1.02] active:scale-[0.98] transition-all duration-200;
}
</style>