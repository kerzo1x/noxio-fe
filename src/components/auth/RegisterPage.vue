<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'

const isLoading = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const message = ref('')
const isError = ref(false)
const showPassword = ref(false)

const clearStatus = () => {
  isError.value = false
  message.value = ''
}

const handleRegister = async () => {
  if (!email.value || !password.value || !firstName.value || !lastName.value) {
    isError.value = true
    message.value = 'Please fill in all fields.'
    return
  }

  isLoading.value = true
  message.value = ''
  isError.value = false

  try {
    const response = await fetch('https://hrica.skyro.dev/api/v1/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        password: password.value
      })
    })

    const result = await response.json();

    if (result.success) {
      if (result.data && result.data.sessionToken) {
        localStorage.setItem('session_token', result.data.sessionToken);
      }

      isError.value = false;
      isLoading.value = true
      message.value = result.message || 'Verification code sent!';

      setTimeout(() => router.push('/auth/verify'), 1000);
    } else {
      isError.value = true;
      message.value = result.message || result.error || 'Registration failed';
    }
  } catch (error) {
    console.error('Registration error:', error);
    isError.value = true;
    message.value = 'System offline. Check your connection.';
  } finally {
    isLoading.value = false;
  }
}

const handleGoogleLogin = () => {
  // TODO: implement Google OAuth
}

</script>

<template>
  <div class="min-h-screen flex bg-surface text-text-main">

    <!-- Left branding panel (light) -->
    <div class="hidden lg:block lg:w-1/2 bg-surface" />

    <!-- Right dark panel -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-10 bg-panel-bg">
      <div class="w-full max-w-md space-y-6">

        <h1 class="text-4xl font-bold text-panel-text">Sign Up</h1>

        <form @submit.prevent="handleRegister" class="space-y-4">

          <!-- First + Last name -->
          <div class="flex gap-4">
            <div class="field flex-1">
              <label class="field-label">First Name</label>
              <input v-model="firstName" type="text" placeholder="Placeholder" class="field-input"
                :class="{ 'input-error': isError }" @input="clearStatus" required />
            </div>
            <div class="field flex-1">
              <label class="field-label">Last Name</label>
              <input v-model="lastName" type="text" placeholder="Placeholder" class="field-input"
                :class="{ 'input-error': isError }" @input="clearStatus" required />
            </div>
          </div>

          <!-- Email -->
          <div class="field">
            <label class="field-label">Email</label>
            <input v-model="email" type="email" placeholder="Placeholder" class="field-input"
              :class="{ 'input-error': isError }" @input="clearStatus" required />
          </div>

          <!-- Password -->
          <div class="field">
            <label class="field-label">Password</label>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="Placeholder"
                class="field-input pr-11" :class="{ 'input-error': isError }" @input="clearStatus" required />
              <button type="button" class="eye-btn" @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'">
                <!-- Eye open -->
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <!-- Eye closed -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" :disabled="isLoading" class="btn-primary">
            {{ isLoading ? 'Processing...' : 'Sign Up' }}
          </button>
        </form>

        <div class="text-center text-sm text-panel-label tracking-wider">or</div>
        <button type="button" class="google-btn" @click="handleGoogleLogin">
          <img src="../../assets/img/google.png" class="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <p class="text-center text-sm">
          <span class="text-panel-label">Already have an account? </span>
          <router-link to="/auth/login" class="text-panel-text font-semibold hover:underline transition-all">
            Log in
          </router-link>
        </p>

        <div class="h-6 flex items-center justify-center mt-2">
          <p v-show="message" class="text-sm font-medium transition-opacity duration-300"
            :class="isError ? 'text-error' : 'text-green-400'">
            {{ message }}
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.field {
  @apply flex flex-col gap-1.5;
}

.field-label {
  @apply text-sm font-medium text-panel-label;
}

.field-input {
  @apply w-full px-4 py-3 rounded-auth outline-none border-none bg-panel-input-bg text-panel-text placeholder:text-panel-placeholder transition-all duration-200;
}

.field-input:focus {
  @apply ring-1 ring-panel-text/30;
}

.field-input.input-error {
  @apply ring-2 ring-error;
}

.btn-primary {
  @apply w-full bg-brand-white text-brand-black px-4 py-3 rounded-auth font-semibold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer;
}

.google-btn {
  @apply w-full flex items-center justify-center gap-3 px-4 py-3 rounded-auth font-semibold text-panel-text border border-panel-input-border hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer;
}

.eye-btn {
  @apply absolute right-3 top-1/2 -translate-y-1/2 text-panel-placeholder hover:text-panel-label transition-colors duration-200 cursor-pointer;
}
</style>