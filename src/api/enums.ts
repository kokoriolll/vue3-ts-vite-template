// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import request from '@/utils/axios';

export function getFileTypeEnum() {
  return request({
    url: '/api/enums/DocumentTypeEnum/items',
    method: 'GET'
  });
}
