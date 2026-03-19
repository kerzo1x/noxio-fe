<script setup lang="ts">
import { ref } from 'vue'
import router from '../../router'

const isLoading = ref(false)
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const message = ref('')

const handleRegister = async () => {
  if (!email.value || !password.value) {
    message.value = 'Please fill in all required fields.'
    return
  }

  isLoading.value = true
  message.value = ''

  try {
    // Пример fetch-запроса
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstname: firstName.value,
        lastname: lastName.value,
        email: email.value,
        password: password.value
      })
    })

    if (response.ok) {
      message.value = 'Registration successful! Redirecting...'
      // Используем window.location.href для перехода по полному адресу
      setTimeout(() => {
        router.push('/login')
      }, 1500) // Задержка 1.5 сек, чтобы пользователь успел прочитать сообщение
    } else {
      const data = await response.json()
      message.value = data.error || 'Registration failed. Please try again.'
    }
  } catch (err) {
    message.value = 'Network error. Please check your connection.'
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = () => {
  console.log('Google Auth: Logic will be implemented here later.')
}
</script>

<template>
  <div class="min-h-screen flex bg-surface font-sans text-text-main">
    <div class="hidden lg:flex lg:w-1/2 bg-brand-gray items-center justify-center">
      <div class="text-brand-black font-bold text-4xl">NOXIO</div>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-brand-white">
      <div class="w-full max-w-md space-y-8">
        <h1 class="text-4xl font-bold">Sign Up</h1>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div class="flex gap-4">
            <div class="form-field flex-1">
              <input v-model="firstName" type="text" placeholder="First Name" class="form-input" required />
              <div class="input-focus-border"></div>
            </div>
            <div class="form-field flex-1">
              <input v-model="lastName" type="text" placeholder="Last Name" class="form-input" required />
              <div class="input-focus-border"></div>
            </div>
          </div>

          <div class="form-field">
            <input v-model="email" type="email" placeholder="Email" class="form-input" required />
            <div class="input-focus-border"></div>
          </div>

          <div class="form-field">
            <input v-model="password" type="password" placeholder="Password" class="form-input" required />
            <div class="input-focus-border"></div>
          </div>

          <button type="submit" :disabled="isLoading" class="btn-primary">
            <span v-if="isLoading">Processing...</span>
            <span v-else>Sign up</span>
          </button>
        </form>

        <div class="text-center my-4 text-sm text-brand-gray uppercase font-medium">
          or
        </div>

        <button type="button"
          class="w-full flex items-center justify-center gap-3 p-3 border border-brand-gray rounded-auth font-semibold hover:bg-surface transition-all text-brand-black"
          @click="handleGoogleLogin">
          <img src="../../assets/img/google.png" class="w-5 h-5" alt="Google" />
          Continue with Google
        </button>

        <div class="mt-6 text-center text-sm">
          <span class="text-brand-gray">Already have an account? </span>
          <router-link to="/login" class="text-brand-black font-semibold hover:underline transition-all">
            Log in
          </router-link>
        </div>



        <p v-if="message"
          :class="['text-center text-sm font-medium', message.includes('successful') ? 'text-green-600' : 'text-error']">
          {{ message }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.form-field {
  @apply relative;
}

.form-input {
  /* Базовая серая граница */
  @apply w-full p-3 bg-brand-white border border-brand-gray rounded-auth outline-none 
         transition-colors duration-500 placeholder:text-brand-gray text-brand-black;
}

/* Скрытый черный слой контура */
.input-focus-border {
  @apply absolute inset-0 rounded-auth pointer-events-none border-2 border-brand-black opacity-0;
  /* Медленный переход прозрачности */
  transition: opacity 0.8s ease-in-out;
}

/* При фокусе на инпуте черный контур плавно проявляется */
.form-input:focus + .input-focus-border {
  @apply opacity-100;
}

/* КНОПКИ (твоя любимая версия) */
.btn-primary {
  @apply w-full bg-brand-black text-brand-white p-3 rounded-auth font-semibold 
         hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] 
         transition-all duration-200 
         disabled:bg-brand-gray disabled:cursor-not-allowed disabled:scale-100;
}

/* Кнопка Google */
button[type="button"] {
  @apply transition-all duration-200 hover:scale-[1.02] active:scale-[0.98];
}
</style>