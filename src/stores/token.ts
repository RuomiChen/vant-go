// src/stores/token.ts
import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
  state: () => ({
    token: '' as string,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    clearToken() {
      this.token = '';
    },
  }, persist: {
    key: 'token', // 存储的 key
    storage: localStorage, // 或 sessionStorage
  },
});
