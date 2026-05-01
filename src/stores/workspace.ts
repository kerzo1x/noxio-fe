import { defineStore } from 'pinia'
import axios from 'axios'

export const useWorkspaceStore = defineStore('workspace', {
  state: () => ({
    workspaces: [] as any[],
    currentWorkspace: null as any,
    isLoading: false
  }),
  actions: {
    async fetchWorkspaces() {
      try {
        const { data } = await axios.get('/api/v1/workspaces')
        this.workspaces = data
        // Если воркспейс только один, выбираем его сразу
        if (this.workspaces.length === 1) {
          this.selectWorkspace(this.workspaces[0])
        }
      } catch (error) {
        console.error('Failed to fetch workspaces', error)
      }
    },
    async selectWorkspace(workspace: any) {
      this.isLoading = true
      try {
        // Здесь будет запрос на детали конкретного воркспейса
        // const { data } = await axios.get(`/api/v1/workspaces/${workspace.id}`)
        this.currentWorkspace = workspace
        // Тут можно вызвать загрузку папок (Folders) и Todo-листов
      } finally {
        this.isLoading = false
      }
    }
  }
})