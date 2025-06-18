import request from '@/utils/request'
import type { UpdateAlwaysRead } from '@/types/AlwaysRead/UpdateAlwaysRead'

/**
 * 更新經常讀取值
 * @param payload
 * @returns
 */
export function updateAlwaysReadValue(payload: UpdateAlwaysRead) {
  return request({
    url: '/api/AlwaysRead/UpdateAlwaysReadValue',
    method: 'post',
    data: payload
  })
}

/**
 * 讀取經常讀取值
 * @param payload
 * @returns
 */
export function readAlwaysReadValue(payload: IAlwaysReadSearch) {
  return request({
    url: '/api/AlwaysRead/ReadAlwaysReadValue',
    method: 'post',
    data: payload
  })
}
