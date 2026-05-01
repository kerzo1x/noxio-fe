<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import HeaderComponent from './components/HeaderComponent.vue';
import BannerComponent from './components/BannerComponent.vue';

const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<template>
    <div>
        <HeaderComponent/>
        <BannerComponent/>
        <SidebarComponent/>
    </div>
</template>