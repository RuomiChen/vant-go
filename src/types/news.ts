import { BaseEntity } from "."

export interface News extends BaseEntity {
  title: string
  content: string
  cover: string
  author: string
  views: number
  is_like:boolean
  like_count:number
}

export type NewsList = News[]
