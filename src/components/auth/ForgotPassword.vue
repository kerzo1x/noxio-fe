<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const isError = ref(false)
const isLoading = ref(false)

const handleSendCode = async () => {
  if (!email.value) {
    isError.value = true
    return
  }
  
  isLoading.value = true
  isError.value = false

  try {
    const response = await fetch('https://hrica.skyro.dev/api/v1/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })
    
    const result = await response.json()

    if (result.success) {
      //saving sessionToken for verify
      if (result.data && result.data.sessionToken) {
        localStorage.setItem('session_token', result.data.sessionToken)
        localStorage.setItem('user_email', email.value)
      }

      router.push({ 
        path: '/auth/verify',
        state: { flow: 'reset' }
      })
    } else {
      isError.value = true
    }
  } catch (error) {
    console.error('Forgot password error:', error)
    isError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-brand-black font-sans">
    <div class="w-full max-w-sm text-center space-y-8">
      
      <div class="space-y-2 max-w-xs mx-auto text-center">
        <h1 class="text-4xl font-bold text-brand-white">Forgot password</h1>
        <p class="text-panel-label text-sm leading-relaxed">
          Use your email to reset password
        </p>
      </div>

      <form @submit.prevent="handleSendCode" class="space-y-6 text-left">
        <div class="space-y-2">
          <label class="text-sm font-medium text-panel-label ml-1">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Placeholder"
            class="field-input"
            :class="{ 'input-error': isError }"
            @input="isError = false"
            required
          />
        </div>

        <button type="submit" class="btn-primary w-full" :disabled="isLoading">
          {{ isLoading ? 'Sending...' : 'Send reset code' }}
        </button>
      </form>

      <div class="h-6">
        <p v-if="isError" class="text-error text-sm font-medium">
          User with this email not found.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.field-input {
  @apply w-full px-4 py-3 rounded-auth outline-none border-none
         bg-panel-input-bg text-panel-text 
         placeholder:text-panel-placeholder
         transition-all duration-200;
}

.field-input:focus {
  @apply ring-1 ring-panel-text/30;
}

.field-input.input-error {
  @apply ring-2 ring-error;
}

.btn-primary {
  @apply bg-brand-white text-brand-black py-3 rounded-auth font-semibold
         hover:opacity-90 hover:scale-[1.01] active:scale-[0.99]
         transition-all duration-200 disabled:opacity-50 cursor-pointer;
}
</style>