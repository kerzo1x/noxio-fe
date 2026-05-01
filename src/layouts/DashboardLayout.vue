<script setup lang="ts">
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import HeaderComponent from '@/components/dashboard/HeaderComponent.vue';
import BannerComponent from '@/components/dashboard/BannerComponent.vue';
import SidebarLayout from '@/components/sidebar/SidebarLayout.vue';


const userStore = useUserStore();

onMounted(() => {
  userStore.fetchUser();
});
</script>

<template>
  <div class="flex flex-col h-dvh overflow-hidden">
    
    <HeaderComponent class="flex-none" />
    <BannerComponent class="flex-none" />
    <SidebarLayout class="flex-1 min-h-0" />
    
  </div>
</template>