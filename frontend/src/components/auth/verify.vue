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
        code.value[index] = '' // check 
    }
}

// Удаление цифры (Backspacing)
const handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace' && !code.value[index] && index > 0) {
        inputs.value[index - 1].focus()
    }
}

const handleVerify = () => {
    const finalCode = code.value.join('')
    console.log('Отправляем код на сервер:', finalCode)
    // verification code check
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
                            @input="handleInput(i, $event)" @keydown="handleKeyDown(i, $event)" />
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

/* Стили для маленьких квадратиков кода */
.form-input-otp {
    @apply w-full h-full text-center text-3xl font-bold bg-white border border-gray-400 
           rounded-lg outline-none transition-colors duration-500 text-black;
}

/* Скрытый черный слой контура */
.input-focus-border {
    @apply absolute inset-0 rounded-lg pointer-events-none border-2 border-black opacity-0;
    transition: opacity 0.3s ease-in-out;
}

/* Плавное проявление при фокусе */
.form-input-otp:focus + .input-focus-border {
    @apply opacity-100;
}

/* Прячем стандартный бордер при фокусе */
.form-input-otp:focus {
    border-color: transparent;
}

/* Кнопки (привел к общему стилю с увеличением) */
button {
    @apply transition-all duration-200 hover:scale-[1.05] active:scale-[0.95];
}

/* Специфические стили для кнопок из твоего макета */
.bg-\[\#D9D9D9\] {
    @apply hover:bg-gray-300; /* чуть светлее при наведении */
}
</style>