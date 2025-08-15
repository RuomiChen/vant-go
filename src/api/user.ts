import request from '@/utils/request';

export interface changePwdReq {
  oldPassword: string
  newPassword : any
}

// 登录
export function changePwdApi(data: changePwdReq): Promise<any>  {
  return request.post('/api/v1/users/change-password', data)
}

