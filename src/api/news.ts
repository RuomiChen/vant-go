import { NewsList } from '@/types/news';
import request from '@/utils/request';


// 获取所有新闻列表
export function topNewsListApi(): Promise<NewsList>  {
  return request.get('/api/v1/news/top')
}

//根据标签id
export function getNewsByTag(tagId: number, page = 1, size = 10): Promise<NewsList>  {
  return request.get(`/api/v1/news/tags/${tagId}`,{params:{page,size}})
}

