<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// One ref per OTP digit
const code = ref(['', '', '', '', ''])
const inputs = ref<HTMLInputElement[]>([])
const isError = ref(false)

const handleInput = (index: number, e: Event) => {
    isError.value = false
    const target = e.target as HTMLInputElement
    const value = target.value.slice(-1)

    if (value && /^\d$/.test(value)) {
        code.value[index] = value
        if (index < 4) inputs.value[index + 1].focus()
    } else {
        code.value[index] = ''
    }
}

// Move focus back on backspace if current field is empty
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
    <div class="min-h-screen flex font-sans text-text-main overflow-hidden">

        <!-- Left branding panel -->
        <div class="hidden md:flex md:w-[43%] bg-brand-gray items-center justify-center">
            <div class="text-main-white font-bold text-4xl tracking-widest">NOXIO</div>
        </div>

        <!-- Right content panel -->
        <div class="flex-1 bg-brand-white flex items-center justify-center">
            <div class="w-full max-w-sm px-8 text-center space-y-8">

                <div class="space-y-2">
                    <h1 class="text-3xl font-bold text-brand-black">Verify your email</h1>
                    <p class="text-brand-gray text-sm leading-relaxed">
                        We sent a verification code to your email address.
                    </p>
                </div>

                <!-- OTP inputs -->
                <div class="flex justify-between gap-3">
                    <div
                        v-for="(_, i) in 5"
                        :key="i"
                        class="form-field w-15 h-18"
                    >
                        <input
                            :ref="(el) => { if (el) inputs[i] = el as HTMLInputElement }"
                            v-model="code[i]"
                            type="text"
                            inputmode="numeric"
                            maxlength="1"
                            class="form-input-otp"
                            :class="{ 'input-error': isError }"
                            @input="handleInput(i, $event)"
                            @keydown="handleKeyDown(i, $event)"
                        />
                        <div class="input-focus-border"></div>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-3">
                    <button type="button" class="btn-secondary w-20" @click="router.back()">
                        Back
                    </button>
                    <button type="button" class="btn-primary flex-1" @click="handleVerify">
                        Verify
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

/* ─── OTP field wrapper ─── */
.form-field {
    @apply relative flex items-center justify-center;
}

.form-input-otp {
    @apply w-full h-full text-center text-3xl font-bold bg-brand-white
           border border-brand-gray rounded-auth outline-none
           transition-all duration-300 text-brand-black;
}

/* Focus ring overlay */
.input-focus-border {
    @apply absolute inset-0 rounded-auth pointer-events-none border-2 border-brand-black opacity-0 scale-95;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input-otp:not(.input-error):focus + .input-focus-border {
    @apply opacity-100 scale-100;
}

.form-input-otp:focus {
    border-color: transparent;
}

/* ─── Error state ─── */
.form-input-otp.input-error {
    border-color: var(--color-error) !important;
    background-color: #fff5f5 !important;
    color: #c53030;
}

.input-error + .input-focus-border {
    border-color: var(--color-error) !important;
    opacity: 1 !important;
    @apply scale-100;
}

/* ─── Buttons ─── */
.btn-primary {
    @apply bg-brand-black text-brand-white py-3 rounded-auth font-semibold
           hover:opacity-90 hover:scale-[1.05] active:scale-[0.98]
           transition-all duration-200;
}

.btn-secondary {
    @apply bg-surface text-brand-black py-3 rounded-auth font-semibold
           hover:bg-brand-gray hover:text-brand-white hover:scale-[1.05] active:scale-[0.98]
           transition-all duration-200;
}
</style>