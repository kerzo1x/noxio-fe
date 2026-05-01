<script setup>
import { ref } from 'vue'
import SidebarNav from '@/components/sidebar/SidebarNav.vue'
import SidebarWorkspace from '@/components/sidebar/SidebarWorkspace.vue'
import SidebarPicker from '@/components/sidebar/SidebarPicker.vue'

defineEmits(['pick'])

const active = ref('')
</script>

<template>
  <aside class="sidebar">
    <nav class="grow">
      <SidebarNav />
      <SidebarWorkspace v-model:active="active" />
    </nav>
    <SidebarPicker @pick="$emit('pick')" />
  </aside>
</template>

<style scoped>
.sidebar {
  width: 283px;
  height: 100dvh;
  background: #000;
  display: flex;
  flex-direction: column;
  padding: 24px 16px;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
}
</style>