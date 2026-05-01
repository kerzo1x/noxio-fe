import { defineStore } from 'pinia';
import api from '@/api';

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  avatar: string | null;

}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as User | null,
    loading: false
  }),
  actions: {
    async fetchUser() {
      this.loading = true;
      try {
        const { data } = await api.get('/auth/me');
        this.user = data.data;
      } catch (err) {
        console.error('Error loading user:', err);
        this.user = null;
      } finally {
        this.loading = false;
      }
    }
  }
});