<script setup lang="ts">
import { ref, computed } from 'vue'

const currentStep = ref(1)
const totalSteps = 5

// Объект для сбора всех ответов
const formData = ref({
  goal: '',
  experience: '',
  interests: [],
  // ... остальные поля
})

// Процент для прогресс-бара
const progress = computed(() => (currentStep.value / totalSteps) * 100)

const nextStep = () => {
  if (currentStep.value < totalSteps) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}

const finishQuiz = () => {
  console.log('Отправляем данные на сервер:', formData.value)
}
</script>

<template>
  <div class="min-h-screen bg-brand-white p-8 flex flex-col items-center">
    <div class="w-full max-w-2xl space-y-8">
      
      <div class="w-full bg-brand-gray h-2 rounded-full overflow-hidden">
        <div 
          class="bg-brand-black h-full transition-all duration-500 ease-out"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>

      <div class="bg-surface p-8 rounded-auth border border-brand-gray shadow-sm">
        
        <div v-if="currentStep === 1" class="space-y-4">
          <h2 class="text-2xl font-bold">What is your main goal?</h2>
          <div class="grid gap-3">
            <button @click="formData.goal = 'work'; nextStep()" class="quiz-option">Work / Productivity</button>
            <button @click="formData.goal = 'leisure'; nextStep()" class="quiz-option">Leisure / Entertainment</button>
          </div>
        </div>

        <div v-else-if="currentStep === 2" class="space-y-4">
          <h2 class="text-2xl font-bold">Tell us about your experience</h2>
          <div class="form-field">
            <input v-model="formData.experience" class="form-input" placeholder="Your experience..." />
            <div class="input-focus-border"></div>
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button 
            v-if="currentStep > 1" 
            @click="prevStep" 
            class="text-brand-gray hover:text-brand-black font-semibold"
          >
            Back
          </button>
          
          <button 
            v-if="currentStep < totalSteps" 
            @click="nextStep"
            class="btn-primary w-32"
          >
            Next
          </button>
          
          <button 
            v-else 
            @click="finishQuiz"
            class="btn-primary w-32 bg-green-600"
          >
            Finish
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../../assets/styles/main.css";

.quiz-option {
  @apply w-full text-left p-4 border border-brand-gray rounded-auth hover:border-brand-black 
         hover:bg-brand-white transition-all duration-200 font-medium;
}

/* Используй свои старые стили для .form-input и .btn-primary */
</style>