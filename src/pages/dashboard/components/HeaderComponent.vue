<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(defineProps<{
  userName?: string;
  avatarUrl?: string;
  sharedWith?: { name: string; avatarUrl?: string }[];
}>(), {
  userName: 'User User',
  avatarUrl: './user.png',
  sharedWith: () => [
    { name: 'User 1' },
    { name: 'User 2' },
    { name: 'User 3' },
  ],
});

const searchQuery = ref('');
const hasNotifications = ref(true);
</script>

<template>
  <header class="h-16 px-6 flex items-center bg-panel-bg border-b border-panel-input-border/50">


    <div class="flex-1">
    </div>

    <div class="w-full max-w-sm relative group">
      <svg
        class="absolute left-3.5 top-1/2 -translate-y-1/2 text-panel-placeholder group-focus-within:text-panel-text transition-colors pointer-events-none"
        xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search items"
        class="field-input mt-0! pl-10 h-10 py-0 text-sm w-full"
      />
    </div>

    <div class="flex-1 flex items-center justify-end gap-5">

      <div class="flex items-center gap-2.5">
        <div class="flex items-center -space-x-2">
          <div
            v-for="(person, i) in sharedWith"
            :key="i"
            class="w-6 h-6 rounded-full border-2 border-panel-bg overflow-hidden bg-panel-input-bg flex-shrink-0"
            :title="person.name"
          >
            <img
              v-if="person.avatarUrl"
              :src="person.avatarUrl"
              :alt="person.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full bg-panel-label/30" />
          </div>
        </div>

        <button class="text-panel-label hover:text-panel-text text-sm font-medium transition-colors cursor-pointer">
          Share
        </button>
      </div>

      <!-- Notifications -->
      <button class="relative text-panel-label hover:text-panel-text transition-colors cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
        </svg>
        <span v-if="hasNotifications"
          class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-error rounded-full border-2 border-panel-bg" />
      </button>

      <!-- User -->
      <div class="flex items-center gap-2.5 pl-4 border-l border-panel-input-border cursor-pointer group">
        <img
          :src="avatarUrl"
          :alt="userName"
          class="w-8 h-8 rounded-full object-cover border border-panel-input-border bg-panel-input-bg"
          @error="($event.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`"
        />
        <span class="text-sm font-medium text-panel-text hidden sm:block">{{ userName }}</span>
        <svg class="text-panel-placeholder group-hover:text-panel-text transition-colors"
          xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>

    </div>
  </header>
</template>