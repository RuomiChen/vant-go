<template>
    <div>
        <Navbar :item="navbar" />
        <van-form @submit="onSubmit">
            <van-cell-group inset>
                <van-field v-model="form.oldPassword" type="password" name="oldPassword" label="旧密码" placeholder="旧密码"
                    :rules="[{ required: true, message: '请输入旧密码' }]" />
                <van-field v-model="form.newPassword" type="password" name="password" label="新密码" placeholder="新密码"
                    :rules="[{ required: true, message: '请输入新密码' }]" />
                <van-field v-model="form.confirmPassword" type="password" name="confirmPassword" label="确认密码" placeholder="确认密码"
              :rules="[{ validator }]"  />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="danger" native-type="submit">
                    更改密码
                </van-button>
            </div>
        </van-form>
    </div>
</template>
<script lang="ts" setup>
import { changePwdApi } from '@/api/user';
import Navbar from '@/components/Navbar/Navbar.vue';
import router from '@/router';
import { INavbar } from '@/types/navbar';
import { showToast } from 'vant';
import { reactive, ref } from 'vue';


const navbar = ref<INavbar>({
    title: '修改密码',
    leftIcon: 'arrow-left',
})

const form = reactive({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
})

const validator = () => {
    if(!form.confirmPassword) return '请再次输入密码'
    if(form.newPassword!==form.confirmPassword) return '两次输入密码不一致'
    return ''
}

const onSubmit = async () =>{
   try {
    // 调用接口
    const message = await changePwdApi({ ...form })

    // 成功提示
    showToast({ type: 'success', message })
    // 清空表单
    form.oldPassword = ''
    form.newPassword = ''
    form.confirmPassword = ''
    router.push({name:'Auth'})
  } catch (err: any) {
    form.newPassword = ''
    form.confirmPassword = ''
  }
}
</script>