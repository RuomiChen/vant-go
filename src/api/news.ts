import { NewsList } from '@/types/news';
import request from '@/utils/request';


// 获取所有新闻列表
export function topNewsListApi(): Promise<NewsList>  {
  return request.get('/api/v1/news/top')
}

