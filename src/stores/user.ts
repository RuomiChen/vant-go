// src/stores/user.ts
import { loginApi, LoginResponse } from '@/api/auth';
import router from '@/router';
import { UserInfo } from '@/types/user';
import { defineStore } from 'pinia';
import { useTokenStore } from './token';


export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as UserInfo | null,
    }),
    actions: {
        async login(username: string, password: string) {
            const tokenStore = useTokenStore();

            const { token, user }: LoginResponse = await loginApi({
                username,
                password
            })
            console.log('user',user);
            console.log('token',token);
            
            this.set(user)
            tokenStore.set(token);
        },
        set(info: UserInfo) {
            this.user = info;
            localStorage.setItem("user", JSON.stringify(info))
        },
        clear() {
            this.user = null;
            localStorage.removeItem('user');

        },
        logout() {
            const tokenStore = useTokenStore();
            this.clear()
            tokenStore.clear()
            router.push('/auth')
        }
    }
});
