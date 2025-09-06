import { CreateGroupRequest, GroupList, IGroup } from '@/types/group';
import request from '@/utils/request';


// 创建群组
export function createGroupApi(data:CreateGroupRequest): Promise<IGroup>  {
  return request.post('/api/v1/group/create',data)
}
// 获取所有群组
export function getGroupApi(): Promise<GroupList>  {
  return request.get('/api/v1/group/all_group',)
}


