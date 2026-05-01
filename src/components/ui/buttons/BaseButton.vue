<script setup lang="ts">
defineProps({
    text: String,
    isLoading: Boolean
})
</script>
<template>
    <button type="submit" :disabled="isLoading" class="btn-base">
        {{ isLoading ? 'Loading...' : text }}
    </button>
</template>
<style>
@reference "@/assets/styles/main.css";
</style>