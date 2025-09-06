import { BaseEntity } from "."

export interface INews extends BaseEntity {
  title: string
  content: string
  cover: string
  author: string
  views: number
  is_like:boolean
  like_count:number
  collect_count:number
  is_collect:boolean
}

export type NewsList = INews[]
