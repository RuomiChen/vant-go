import { INews, NewsList } from '@/types/news';
import request from '@/utils/request';


// 获取所有新闻列表
export function topNewsListApi(): Promise<NewsList>  {
  return request.get('/api/v1/news/top')
}

//根据标签id
export function getNewsByTag(tagId: number, page = 1, size = 10): Promise<NewsList>  {
  return request.get(`/api/v1/news/tags/${tagId}`,{params:{page,size}})
}

//根据id获取新闻
export function getNewsById(id: number): Promise<INews>  {
  return request.get(`/api/v1/news/${id}`)
}

// 喜欢文章
export function likeNewsApi(id:string): Promise<any>  {
  return request.post(`/api/v1/news_like/like/${id}`)
}
export function collectNewsApi(id:string): Promise<any>  {
  return request.post(`/api/v1/news_collect/collect/${id}`)
}




