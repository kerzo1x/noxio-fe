<script setup lang="js">
defineProps({
    isLoading: Boolean
})
</script>
<template>
    <button type="submit" :disabled="isLoading" class="btn-base">
        {{ isLoading ? 'Signing in...' : 'Log In' }}
    </button>
</template>
<style>
@reference "../../assets/styles/main.css";
</style>