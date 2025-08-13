// src/stores/user.ts
import { UserInfo } from '@/types/user';
import { defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as UserInfo | null,
  }),
  actions: {
    setuser(info: UserInfo) {
      this.user = info;
    },
    clearuser() {
      this.user = null;
    },
  }, persist: {
    key: 'user', // 存储的 key
    storage: localStorage, // 或 sessionStorage
  },
});
