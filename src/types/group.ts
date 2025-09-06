export enum IType {
    PUBLIC = "public",
    PRIVATE = "private"
}

export interface CreateGroupRequest {
    name: string
    description: string
    type: IType
}
export type GroupList = IGroup []

export interface IGroup {
  id: number
  created_at: string
  updated_at: string
  name: string
  description: string
  type: string
  owner_id: number
  owner: Owner | null
}

export interface Owner {
  id: number
  created_at: string
  updated_at: string
  username: string
  avatar: string
  name: string
  Email: string
}
