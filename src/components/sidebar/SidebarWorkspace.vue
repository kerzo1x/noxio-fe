<script setup>
import folderIcon from '@/assets/img/folder.svg'
import todoIcon from '@/assets/img/todo.svg'
import taskIcon from '@/assets/img/task.svg'
import selectorIcon from '@/assets/img/selector.svg'

const props = defineProps({
  active: {
    type: String,
    default: '',
  },
  items: {
    type: Array,
    default: () => ([
      { id: 'folders', label: 'Folders', icon: folderIcon },
      { id: 'todo', label: 'To do', icon: todoIcon },
    ]),
  },
  todoTasks: {
    type: Array,
    default: () => ([
      { id: 'todo-1', label: 'To do' },
      { id: 'todo-2', label: 'To do' },
    ]),
  },
})

const emit = defineEmits(['update:active'])

const setActive = (id) => {
  emit('update:active', id)
}
</script>

<template>
  <p class="section-label">Your workspace</p>

  <div
    v-for="item in props.items"
    :key="item.id"
    class="nav-link workspace"
    :class="{ active: props.active === item.id }"
    @click="setActive(item.id)"
  >
    <img :src="item.icon" :alt="item.label" class="icon" />
    <span>{{ item.label }}</span>
    <img
      :src="selectorIcon"
      class="selector"
      :class="{ active: props.active === item.id }"
      :alt="`${item.label} selector`"
    />
  </div>

  <template v-if="props.active === 'todo'">
    <div class="subtasks">
      <div v-for="task in props.todoTasks" :key="task.id" class="nav-link">
        <img :src="taskIcon" alt="task" class="icon small" />
        <span>{{ task.label }}</span>
      </div>
    </div>
  </template>
</template>

<style scoped>
.section-label {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.3);
  margin: 24px 0 8px;
  padding: 0 12px;
}

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

.nav-link.workspace {
  justify-content: space-between;
}

.nav-link.workspace:hover {
  background: transparent;
  color: rgba(255, 255, 255, 0.5);
}

.nav-link.workspace.active {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.subtasks {
  margin-left: 20px;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 4px;
}

.icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.icon.small {
  transform: scale(0.9);
}

.nav-link:hover .icon,
.nav-link.active .icon {
  opacity: 1;
}

.nav-link.workspace:hover .icon {
  opacity: 0.7;
}

.nav-link.workspace.active .icon {
  opacity: 1;
}

.selector {
  width: 16px;
  height: 16px;
  margin-left: auto;
  opacity: 0;
  transform: rotate(180deg);
  transition: transform 0.3s, opacity 0.2s;
}

.selector.active {
  opacity: 1;
  transform: rotate(360deg);
}
</style>
