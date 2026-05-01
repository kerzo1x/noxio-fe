<script setup>
import homeIcon from '@/assets/img/home.svg'
import noxioIcon from '@/assets/img/noxioai.svg'
import settingsIcon from '@/assets/img/settings.svg'

const topNav = [
  { label: 'Home', icon: homeIcon },
  { label: 'Noxio AI', icon: noxioIcon },
  { label: 'Settings', icon: settingsIcon },
]
</script>

<template>
  <div
    v-for="item in topNav"
    :key="item.label"
    class="nav-link"
  >
    <img :src="item.icon" :alt="item.label" class="icon" />
    <span>{{ item.label }}</span>
  </div>
</template>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  font-weight: 500;
  transition: color 0.2s, background 0.2s;
}

.nav-link:hover,
.nav-link.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.nav-link:hover .icon,
.nav-link.active .icon {
  opacity: 1;
}
</style>
