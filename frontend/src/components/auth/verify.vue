<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// Массив для 5 цифр кода
const code = ref(['', '', '', '', ''])
// Ссылки на инпуты для управления фокусом
const inputs = ref<HTMLInputElement[]>([])

// Функция обработки ввода
const handleInput = (index: number, e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.value.slice(-1) // Берем только последний введенный символ

  if (value && /^\d+$/.test(value)) {
    code.value[index] = value
    // Если есть следующая ячейка — прыгаем в неё
    if (index < 4) {
      inputs.value[index + 1].focus()
    }
  } else {
    code.value[index] = '' // Если ввели не цифру — очищаем
  }
}

// Удаление цифры (Backspacing)
const handleKeyDown = (index: number, e: KeyboardEvent) => {
  if (e.key === 'Backspace' && !code.value[index] && index > 0) {
    // Если ячейка пустая и жмем Backspace — возвращаемся назад
    inputs.value[index - 1].focus()
  }
}

const handleVerify = () => {
  const finalCode = code.value.join('')
  console.log('Отправляем код на сервер:', finalCode)
  // Здесь будет логика проверки
}
</script>

<template>
  <div class="min-h-screen flex font-sans overflow-hidden">
    
    <div class="hidden md:block bg-[#D9D9D9]" style="flex: 0 0 42.9%;">
      
    </div>

    <div class="flex-1 bg-white flex flex-col items-center">
      
      <div class="w-[336px] pt-[215px] text-center">
        
        <h1 class="text-3xl font-bold mb-2 text-black">Verify your email</h1>
        <p class="text-gray-400 text-sm mb-10 leading-relaxed">
          we have send verification to email@gmail.com
        </p>

        <div class="flex justify-between mb-12">
          <input 
            v-for="(n, i) in 5" 
            :key="i"
            ref="inputs"
            v-model="code[i]"
            type="text"
            inputmode="numeric"
            class="w-[60px] h-[72px] text-center text-3xl font-bold border border-gray-400 rounded-lg focus:border-black outline-none transition-all"
            @input="handleInput(i, $event)"
            @keydown="handleKeyDown(i, $event)"
          />
        </div>

        <div class="flex gap-4">
          <button 
            type="button"
            @click="router.back()" 
            class="w-[84px] py-3 bg-[#D9D9D9] rounded-md font-semibold text-sm text-gray-800 hover:bg-gray-400"
          >
            back
          </button>
          <button 
            type="button"
            @click="handleVerify"
            class="flex-1 py-3 bg-[#D9D9D9] rounded-md font-semibold text-sm text-gray-800 hover:bg-gray-400"
          >
            verify
          </button>
        </div>

      </div>
    </div>
  </div>
</template>