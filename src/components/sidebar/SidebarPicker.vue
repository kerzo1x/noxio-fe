<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useWorkspaceStore } from '@/stores/workspace'
import selectorIcon from '@/assets/img/selector.svg'
import addIcon from '@/assets/img/add.svg'

const workspaceStore = useWorkspaceStore()

const rootRef = ref(null)
const createNameInputRef = ref(null)
const dropdownOpen = ref(false)
const isCreatingWorkspace = ref(false)
const newWorkspaceName = ref('')
const createSubmitting = ref(false)

const toggleDropdown = (e) => {
  e.stopPropagation()
  dropdownOpen.value = !dropdownOpen.value
}

const closeDropdown = () => {
  dropdownOpen.value = false
  isCreatingWorkspace.value = false
  newWorkspaceName.value = ''
}

const onDocumentClick = (e) => {
  if (!rootRef.value) return
  if (rootRef.value.contains(e.target)) return
  if (dropdownOpen.value) closeDropdown()
  else if (isCreatingWorkspace.value) {
    isCreatingWorkspace.value = false
    newWorkspaceName.value = ''
  }
}

const onDocumentKeydown = (e) => {
  if (e.key === 'Escape') {
    if (dropdownOpen.value) closeDropdown()
    else if (isCreatingWorkspace.value) {
      isCreatingWorkspace.value = false
      newWorkspaceName.value = ''
    }
  }
}

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
  document.addEventListener('keydown', onDocumentKeydown)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  document.removeEventListener('keydown', onDocumentKeydown)
})

const focusCreateInput = () => {
  nextTick(() => {
    createNameInputRef.value?.focus?.()
  })
}

const startCreateWorkspace = () => {
  newWorkspaceName.value = ''
  isCreatingWorkspace.value = true
  focusCreateInput()
}

const submitNewWorkspace = async () => {
  const name = newWorkspaceName.value.trim()
  if (!name || createSubmitting.value) return

  createSubmitting.value = true
  try {
    await workspaceStore.createWorkspace(name)
    closeDropdown()
  } catch (err) {
    console.error('Create workspace failed:', err)
  } finally {
    createSubmitting.value = false
  }
}

const onCreateInputKeydown = (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    submitNewWorkspace()
  }
}

const handlePickWorkspace = (workspace) => {
  workspaceStore.selectWorkspace(workspace)
  closeDropdown()
}
</script>

<template>
  <div ref="rootRef" class="picker-root">
    <div
      v-if="workspaceStore.isLoading && workspaceStore.workspaces.length === 0"
      class="loading-placeholder"
    >
      Checking workspaces...
    </div>

    <template v-else-if="workspaceStore.workspaces.length > 0">
      <div
        class="workspace-switcher"
        role="button"
        tabindex="0"
        :aria-expanded="dropdownOpen"
        aria-haspopup="listbox"
        @click="toggleDropdown"
        @keydown.enter.prevent="toggleDropdown"
        @keydown.space.prevent="toggleDropdown"
      >
        <div class="avatar">
          {{ workspaceStore.activeWorkspace?.name?.charAt(0) || '?' }}
        </div>
        <span class="truncate">
          {{ workspaceStore.activeWorkspace?.name || 'Loading...' }}
        </span>
        <img
          :src="selectorIcon"
          alt=""
          class="icon"
          :class="{ 'icon--open': dropdownOpen }"
        />
      </div>

      <div
        v-show="dropdownOpen"
        class="dropdown"
        role="listbox"
        @click.stop
      >
        <div
          v-if="isCreatingWorkspace"
          class="dropdown-item dropdown-item--create-inline"
          @click.stop
        >
          <input
            ref="createNameInputRef"
            v-model="newWorkspaceName"
            type="text"
            class="create-name-input"
            placeholder="Workspace name"
            autocomplete="off"
            :disabled="createSubmitting"
            @keydown="onCreateInputKeydown"
          />
          <button
            type="button"
            class="create-submit-btn"
            :disabled="createSubmitting || !newWorkspaceName.trim()"
            aria-label="Create workspace"
            @click="submitNewWorkspace"
          >
            <img :src="addIcon" alt="" class="dropdown-add-icon" />
          </button>
        </div>
        <button
          v-else
          type="button"
          class="dropdown-item dropdown-item--action"
          @click.stop="startCreateWorkspace"
        >
          <span class="dropdown-item-label">New workspace</span>
          <img :src="addIcon" alt="" class="dropdown-add-icon" />
        </button>

        <template v-if="workspaceStore.workspaces.length > 1">
          <div class="dropdown-divider" />
          <button
            v-for="ws in workspaceStore.workspaces"
            :key="ws.id"
            type="button"
            class="dropdown-item dropdown-item--workspace"
            :class="{
              'is-current':
                workspaceStore.activeWorkspace?.id === ws.id,
            }"
            role="option"
            :aria-selected="workspaceStore.activeWorkspace?.id === ws.id"
            @click="handlePickWorkspace(ws)"
          >
            <div class="avatar avatar--sm">
              {{ ws.name?.charAt(0) || '?' }}
            </div>
            <span class="dropdown-item-label">{{ ws.name }}</span>
          </button>
        </template>
      </div>
    </template>

    <div
      v-else-if="isCreatingWorkspace"
      class="workspace-switcher workspace-switcher--create-inline"
      @click.stop
    >
      <input
        ref="createNameInputRef"
        v-model="newWorkspaceName"
        type="text"
        class="create-name-input create-name-input--root"
        placeholder="Workspace name"
        autocomplete="off"
        :disabled="createSubmitting"
        @keydown="onCreateInputKeydown"
      />
      <button
        type="button"
        class="create-submit-btn"
        :disabled="createSubmitting || !newWorkspaceName.trim()"
        aria-label="Create workspace"
        @click="submitNewWorkspace"
      >
        <img :src="addIcon" alt="" class="icon" />
      </button>
    </div>
    <button
      v-else
      type="button"
      class="workspace-switcher workspace-switcher--create"
      @click.stop="startCreateWorkspace"
    >
      <span class="truncate">Create workspace</span>
      <img :src="addIcon" alt="" class="icon" />
    </button>
  </div>
</template>

<style scoped>
.picker-root {
  position: relative;
  width: 100%;
}

.loading-placeholder {
  padding: 12px;
  color: rgba(255, 255, 255, 0.45);
  font-size: 14px;
}

.workspace-switcher {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

button.workspace-switcher {
  border: none;
  margin: 0;
  background: transparent;
  font: inherit;
  color: inherit;
  text-align: left;
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

.avatar--sm {
  width: 28px;
  height: 28px;
  font-size: 13px;
}

.truncate {
  flex: 1;
  min-width: 0;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: auto;
  opacity: 0.7;
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.icon--open {
  transform: rotate(180deg);
}

.workspace-switcher:hover .icon {
  opacity: 1;
}

.dropdown {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% + 4px);
  top: auto;
  z-index: 40;
  padding: 4px;
  border-radius: 12px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.45);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;
  padding: 8px 10px 4px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.15s;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.dropdown-item--action {
  justify-content: flex-start;
}

.dropdown-add-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin-left: auto;
  opacity: 0.75;
}

.dropdown-item--workspace.is-current {
  background: rgba(255, 255, 255, 0.08);
}

.dropdown-item-label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-divider {
  height: 1px;
  margin: 1px 4px 3px;
  background: rgba(255, 255, 255, 0.1);
}

.dropdown-item--create-inline {
  cursor: default;
  gap: 8px;
  padding: 8px 10px 4px;
  width: 100%;
  box-sizing: border-box;
}

.dropdown-item--create-inline:hover {
  background: transparent;
}

.workspace-switcher--create-inline {
  cursor: default;
  width: 100%;
  box-sizing: border-box;
}

.workspace-switcher--create-inline:hover {
  background: transparent;
}

.create-name-input {
  flex: 1 1 auto;
  min-width: 0;
  width: 0;
  box-sizing: border-box;
  height: 1.625rem;
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  font: inherit;
  font-size: 13px;
  line-height: 1.2;
  outline: none;
}

.create-name-input:focus {
  border-color: rgba(255, 255, 255, 0.22);
}

.create-name-input:disabled {
  opacity: 0.6;
}

.create-name-input--root {
  margin-right: 4px;
}

.create-submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  align-self: center;
  padding: 4px;
  border: none;
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  color: inherit;
  opacity: 0.85;
  transition: opacity 0.15s, background 0.15s;
}

.create-submit-btn:hover:not(:disabled) {
  opacity: 1;
  background: rgba(255, 255, 255, 0.08);
}

.create-submit-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
</style>
