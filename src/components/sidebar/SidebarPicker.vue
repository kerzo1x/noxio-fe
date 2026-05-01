<script setup>
import selectorIcon from '@/assets/img/selector.svg'

defineEmits(['pick'])
</script>

<template>
  <div class="workspace-switcher" @click="$emit('pick')">
    <div class="avatar">M</div>
    <span class="truncate">My Workspace</span>
    <img :src="selectorIcon" alt="workspace selector" class="icon opacity-30" />
  </div>
</template>

<style scoped>
.workspace-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.workspace-switcher:hover {
  background: #252525;
}

.avatar {
  width: 32px;
  height: 32px;
  background: #4a4a4a;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  flex-shrink: 0;
}

.truncate {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 140px;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.2s;
}
</style>
