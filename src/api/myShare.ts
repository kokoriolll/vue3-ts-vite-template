// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import request from '@/utils/axios';

export function getMyShareList(data: any) {
  return request({
    url: '/api/knowledgeshares',
    methods: 'GET',
    params: { ...data }
  });
}
