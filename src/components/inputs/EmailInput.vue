<script setup lang="ts">
const model = defineModel<string>()

defineProps({
    label: String,
    placeHolder: String,
    isError: Boolean
})
const emit = defineEmits(
    ['clear-error']
)
</script>
<template>
    <div class="flex flex-col gap-1.5">
        <label class="text-sm font-medium text-panel-label"> {{ label }}</label>
        <input 
            v-model="model" 
            type="email" 
            :placeholder="placeHolder" 
            class="field-input"
            :class="{ 'input-error': isError }" 
            @input="emit('clear-error')" 
        />
    </div>
</template>
<style>
@reference "../../assets/styles/main.css";
</style>