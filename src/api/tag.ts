import { TagList } from '@/types/tag';
import request from '@/utils/request';


// 获取所有新闻列表
export function tagListApi(): Promise<{list:TagList}>  {
  return request.get('/api/v1/tag')
}

