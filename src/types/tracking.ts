import { BaseEntity, WithoutBase } from "."
import { News } from "./news"

export type TrackingList = ITracking []
export interface ITracking extends BaseEntity{
    from: string
    to: string
    extra?: any
    action: string
    data:News|null
}

export type TrackingRequest = WithoutBase<ITracking>