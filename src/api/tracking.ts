import { NewsList } from '@/types/news';
import { TrackingList, TrackingRequest } from '@/types/tracking';
import request from '@/utils/request';


// 记录
export function recordApi(data:TrackingRequest): Promise<NewsList>  {
  return request.post('/api/v1/tracking/record',data)
}

interface getRecordListReq{
    action:string
}

//获取所有记录
export function getRecordListApi(params:getRecordListReq): Promise<TrackingList>  {
  return request.get('/api/v1/tracking/record',{params})
}

