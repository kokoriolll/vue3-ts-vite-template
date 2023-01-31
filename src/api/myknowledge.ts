// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import request from '@/utils/axios';

export function getKnowledge(data?: any) {
  return request({
    url: '/api/myknowledges',
    method: 'GET',
    params: { ...data }
  });
}

export function batchDeleteKnowledge(data: any[]) {
  return request({
    url: '/api/myknowledges/batchDelete',
    method: 'POST',
    data: [...data]
  });
}
