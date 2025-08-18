import { BaseEntity } from "."

export type CommentList = IComment []
export interface IComment  extends BaseEntity{
    user:{
        avatar:string,
        name:string
    }
    content:string,

}