// src/stores/token.ts
import { defineStore } from 'pinia';

export const useTokenStore = defineStore('token', {
    state: () => ({
        token: '' as string,
    }),
    actions: {
        set(token: string) {
            this.token = token;
            localStorage.setItem("token",token)
        },
        clear() {
            this.token = '';
            localStorage.removeItem('token');
        },
    }
});
