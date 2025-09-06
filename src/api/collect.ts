import request from "@/utils/request";

export function collectListApi(): Promise<any>  {
  return request.get('/api/v1/news_collect/collects')
}
