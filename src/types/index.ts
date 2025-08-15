export interface BaseEntity {
  id: number
  created_at: string
  updated_at: string
  deleted_at?: string | null
}

export type WithoutBase<T extends BaseEntity> = Omit<T, keyof BaseEntity | 'data'>