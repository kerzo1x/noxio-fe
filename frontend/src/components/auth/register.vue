<script setup lang="ts">
import { ref } from 'vue'

const isLoading = ref(false)

const password = ref('')
const username = ref('')
const message = ref('')

const handleRegister = async () => {
  isLoading.value = true
  try {
    const response = await fetch('http://localhost:3000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    const data = await response.json()
    
    console.log(data)
    if (data.token) {
      message.value = `User created! ID: ${data.user.id}`
      console.log('Token:', data.token)
    } else {
      message.value = data.message || 'Registration failed'
    }
  } catch (error) {
    message.value = 'reg error'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-form">
    <h1>Register</h1>
    <input v-model="username" placeholder="Name" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="handleRegister"
    :disabled="isLoading"
    :class="{ 'opacity-50 cursor-not-allowed': isLoading}">Register</button>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
.auth-form {
  display: grid;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: 50px auto;
}
input, button { padding: 10px; }
</style>