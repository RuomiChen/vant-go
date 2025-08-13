import request from '@/utils/request';

// 登录返回的数据类型
export interface LoginResponse {
  token: string
  user : any
}

// 登录
export function loginApi(data: { username: string; password: string }): Promise<LoginResponse>  {
  return request.post('/api/v1/auth/login', data)
}

// 注册
export function registerApi(data: { username: string; password: string }) {
  return request.post<null>('/api/v1/auth/register', data)
}
