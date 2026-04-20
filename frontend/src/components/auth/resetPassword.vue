<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const isError = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

const handleResetPassword = async () => {
  // Базовая проверка совпадения
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match'
    isError.value = true
    return
  }

  isLoading.value = true
  isError.value = false

  try {
    const response = await fetch('https://my-noxio-test.free.beeceptor.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: password.value })
    })

    if (response.ok) {
      // После успеха обычно кидаем на логин
      router.push({ name: 'Login' })
    } else {
      errorMessage.value = 'Failed to reset password. Try again.'
      isError.value = true
    }
  } catch {
    errorMessage.value = 'Network error'
    isError.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-brand-black font-sans">
    <div class="w-full max-w-sm space-y-8">
      
      <div class="space-y-2 max-w-xs mx-auto text-center">
        <h1 class="text-4xl font-bold text-brand-white">New password</h1>
        <p class="text-panel-label text-sm leading-relaxed">
          Create a new password for your account
        </p>
      </div>

      <form @submit.prevent="handleResetPassword" class="space-y-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="text-sm font-medium text-panel-label ml-1">New password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Placeholder"
              class="field-input"
              :class="{ 'input-error': isError }"
              required
            />
          </div>

          <div class="space-y-2">
            <label class="text-sm font-medium text-panel-label ml-1">Password confirmation</label>
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Placeholder"
              class="field-input"
              :class="{ 'input-error': isError }"
              required
            />
          </div>
        </div>

        <button type="submit" class="btn-primary w-full" :disabled="isLoading">
          {{ isLoading ? 'Resetting...' : 'Reset password' }}
        </button>
      </form>

      <div class="h-6 text-center">
        <p v-if="isError" class="text-error text-sm font-medium">
          {{ errorMessage }}
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
         transition-all duration-200 disabled:opacity-50;
}
</style>