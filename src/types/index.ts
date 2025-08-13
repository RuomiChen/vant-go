export interface BaseEntity {
  id: number
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
}