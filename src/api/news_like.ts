import request from '@/utils/request';


// 喜欢文章
export function likeNewsApi(id:string): Promise<any>  {
  return request.post(`/api/v1/news_like/like/${id}`)
}