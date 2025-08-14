import axios, { AxiosRequestHeaders } from 'axios'
import { showToast } from 'vant'

export const SERVER_URL = 'http://127.0.0.1:3002'

const request = axios.create({
    baseURL: SERVER_URL,
    timeout: 10000
})

request.interceptors.request.use(
    (config: any) => {
        const token = localStorage.getItem('token')

        if (!config.headers) {
            config.headers = {} as AxiosRequestHeaders
        }

        if (token) {
            // 断言成 AxiosRequestHeaders，确保 TS 不报错
            (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        // 正常返回，直接拿 data
        const res = response.data
        return res.data
    },
    (error) => {
        // error.response 里有后端返回的状态码和数据
        if (error.response) {
            const res = error.response.data
            if (res.code === 1002) {
                showToast(res.message || '请求失败')
            } else {
                showToast(res.message || '请求失败')
            }
        } else {
            showToast(error.message || '网络错误')
        }

        return Promise.reject(error)
    }
)

export default request