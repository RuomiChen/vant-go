import { BaseEntity } from "."

export interface Tag extends BaseEntity{
    name : string
}
export type TagList = Tag []