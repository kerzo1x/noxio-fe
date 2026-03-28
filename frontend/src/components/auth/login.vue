<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'

const isLoading = ref(false)
const email = ref('')
const password = ref('')
const message = ref('')
const isError = ref(false)

const handleLogin = async () => {
    if (!email.value || !password.value) {
        message.value = 'Please enter your email and password.'
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

        const data = await response.json()

        if (response.ok) {
            message.value = 'Login successful! Redirecting...'
        } else {
            message.value = data.error || 'Login failed. Please try again.'
            isError.value = true
        }
    } catch {
        message.value = 'Network error. Please check your connection.'
        isError.value = true
    } finally {
        isLoading.value = false
    }
}

const handleGoogleLogin = () => {
    // TODO: implement Google OAuth
}
</script>

<template>
    <div class="min-h-screen flex bg-surface text-text-main">

        <!-- Left branding panel -->
        <div class="hidden lg:flex lg:w-1/2 bg-brand-panel items-center justify-center">
            <div class="text-brand-white font-bold text-4xl tracking-widest">NOXIO</div>
        </div>

        <!-- Right form panel -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-brand-white">
            <div class="w-full max-w-md space-y-6">

                <h1 class="text-4xl font-bold text-brand-black">Log In</h1>

                <form @submit.prevent="handleLogin" class="space-y-4">
                    <div class="form-field">
                        <input
                            v-model="email"
                            type="email"
                            placeholder="Email"
                            class="form-input"
                            :class="{ 'input-error': isError }"
                            @input="isError = false"
                            required
                        />
                        <div class="input-focus-border"></div>
                    </div>

                    <div class="form-field">
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Password"
                            class="form-input"
                            :class="{ 'input-error': isError }"
                            @input="isError = false"
                            required
                        />
                        <div class="input-focus-border"></div>
                    </div>

                    <button type="submit" :disabled="isLoading" class="btn-primary">
                        {{ isLoading ? 'Signing in...' : 'Sign in' }}
                    </button>
                </form>

                <div class="text-center text-sm text-brand-gray uppercase font-medium tracking-wider">or</div>

                <button type="button" class="google-btn" @click="handleGoogleLogin">
                    <img src="../../assets/img/google.png" class="w-5 h-5" alt="Google" />
                    Continue with Google
                </button>

                <p class="text-center text-sm">
                    <span class="text-brand-gray">Don't have an account? </span>
                    <router-link to="/register" class="text-brand-black font-semibold hover:underline transition-all">
                        Sign up
                    </router-link>
                </p>

                <!-- Status message -->
                <p
                    v-if="message"
                    class="text-center text-sm font-medium"
                    :class="isError ? 'text-error' : 'text-success'"
                >
                    {{ message }}
                </p>

            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

/* ─── Input field wrapper ─── */
.form-field {
    @apply relative;
}

.form-input {
    @apply w-full p-3 bg-brand-white border border-brand-gray rounded-auth outline-none
           transition-all duration-300 placeholder:text-brand-gray text-brand-black;
}

/* Focus ring overlay — visible only on focus (non-error state) */
.input-focus-border {
    @apply absolute inset-0 rounded-auth pointer-events-none border-2 border-brand-black opacity-0;
    transition: opacity 0.3s ease-in-out;
}

.form-input:not(.input-error):focus + .input-focus-border {
    @apply opacity-100;
}

/* Hide native focus outline when the overlay takes over */
.form-input:focus {
    border-color: transparent;
}

/* ─── Error state ─── */
.form-input.input-error {
    border-color: var(--color-error) !important;
    background-color: #fff5f5 !important;
}

.input-error::placeholder {
    color: #fc8181 !important;
}

/* Show error-colored ring immediately on error */
.input-error + .input-focus-border {
    border-color: var(--color-error) !important;
    opacity: 1 !important;
}

/* Darken the ring on focus when in error state */
.input-error:focus + .input-focus-border {
    border-color: #c53030 !important;
}

/* ─── Buttons ─── */
.btn-primary {
    @apply w-full bg-brand-black text-brand-white p-3 rounded-auth font-semibold
           hover:opacity-90 hover:scale-[1.05] active:scale-[0.98]
           transition-all duration-200
           disabled:bg-brand-gray disabled:cursor-not-allowed;
}

.google-btn {
    @apply w-full flex items-center justify-center gap-3 p-3
            hover:opacity-90 hover:scale-[1.05] active:scale-[0.98]
           border border-brand-gray rounded-auth font-semibold
           hover:bg-surface transition-all text-brand-black;
}
</style>