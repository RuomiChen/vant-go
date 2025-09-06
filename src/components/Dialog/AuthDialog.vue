<template>
    <Dialog v-model="model" title="登录">
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field  :rules="[{ required: true, message: '请填写用户名' }]" v-model="form.username" name="username" label="账号" placeholder="请输入账号" required />
                <van-field  :rules="[{ required: true, message: '请填写密码' }]" v-model="form.password" type="password" name="password" label="密码" placeholder="请输入密码"
                    required />
            </van-cell-group>
            <div class="p-4">
                <van-button round block type="danger" native-type="submit">
                    登录
                </van-button>
            </div>
        </van-form>
    </Dialog>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { showToast } from "vant";
import { reactive } from "vue";
import Dialog from "./Dialog.vue";

const userStore = useUserStore()
const model = defineModel<boolean>({ default: false }) // 登录表单的开关

const emit = defineEmits<{
    (e: "login", payload: { username: string; password: string }): void,
    (e: "success"): void,
}>()

const form = reactive({
    username: "",
    password: ""
})

const onSubmit = async () => {
    try {
        await userStore.login(form.username, form.password);
        // 登录成功后可路由跳转
    } catch (err) {
        console.error('登录失败', err);
        return
    }
    showToast('登录成功')
    model.value = false
    emit('success')
}
</script>
