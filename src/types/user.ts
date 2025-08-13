import { BaseEntity } from "."

// 用户信息类型定义
export interface UserInfo extends BaseEntity{
  name: string
  email: string
  avatar: string
  following:Number
  followers:Number
  likes:Number
}