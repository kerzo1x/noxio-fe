<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// Массив для 5 цифр кода
const code = ref(['', '', '', '', ''])
// Ссылки на инпуты для управления фокусом
const inputs = ref<HTMLInputElement[]>([])

// Функция обработки ввода
const isError = ref(false) // Состояние для неверного кода

const handleInput = (index: number, e: Event) => {
    isError.value = false // Сбрасываем ошибку при вводе
    const target = e.target as HTMLInputElement
    const value = target.value.slice(-1)

    if (value && /^\d+$/.test(value)) {
        code.value[index] = value
        if (index < 4) {
            inputs.value[index + 1].focus()
        }
    } else {
        code.value[index] = ''
    }
}


// Удаление цифры (Backspacing)
const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !code.value[index] && index > 0) {
        inputs.value[index - 1].focus()
    }
}

const handleVerify = async () => {
    const finalCode = code.value.join('')
    if (finalCode.length < 5) return

    // Имитация запроса на сервер
    // console.log('Проверка кода:', finalCode)
    const response = await fetch('https://my-noxio-test.free.beeceptor.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: finalCode
      })
    })

    // Если код неверный (имитация):
    const isCodeValid = false
    if (!isCodeValid) {
        isError.value = true
    }
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
                    <div v-for="(n, i) in 5" :key="i" class="form-field w-[60px] h-[72px]">
                        <input :ref="(el) => { if (el) inputs[i] = el as HTMLInputElement }" v-model="code[i]"
                            type="text" inputmode="numeric" maxlength="1" class="form-input-otp"
                            :class="{ 'input-error': isError }" @input="handleInput(i, $event)"
                            @keydown="handleKeyDown(i, $event)" />
                        <div class="input-focus-border"></div>
                    </div>
                </div>

                <div class="flex gap-4">
                    <button type="button" @click="router.back()"
                        class="w-[84px] py-3 bg-[#D9D9D9] rounded-md font-semibold text-sm text-gray-800 hover:bg-gray-400">
                        Back
                    </button>
                    <button type="button" @click="handleVerify"
                        class="flex-1 py-3 bg-[#D9D9D9] rounded-md font-semibold text-sm text-gray-800 hover:bg-gray-400">
                        Verify
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.form-field {
    @apply relative flex items-center justify-center;
}

.form-input-otp {
    @apply w-full h-full text-center text-3xl font-bold bg-white border border-gray-400 
           rounded-lg outline-none transition-all duration-300 text-black;
}

/* --- СТИЛИ ОШИБКИ --- */

.form-input-otp.input-error {
    border-color: #ef4444 !important;
    background-color: #fef2f2 !important;
    color: #b91c1c;
}

/* Делаем накладную рамку красной при ошибке */
.input-error + .input-focus-border {
    border-color: #ef4444 !important;
    opacity: 1 !important;
    @apply scale-100;
}

/* --- СОСТОЯНИЯ ФОКУСА --- */

.input-focus-border {
    @apply absolute inset-0 rounded-lg pointer-events-none border-2 border-black opacity-0 scale-95;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.form-input-otp:not(.input-error):focus + .input-focus-border {
    @apply opacity-100 scale-100;
}

.form-input-otp:focus {
    border-color: transparent;
}

/* Кнопки */
button {
    @apply transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] disabled:opacity-50;
}

.bg-\[\#D9D9D9\] {
    @apply hover:bg-gray-300;
}
</style>