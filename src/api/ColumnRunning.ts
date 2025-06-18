import request from '@/utils/request'
import type { InputColumn } from '@/types/InputColumn'

/**
 * 依照參數取得上下游及上位等等各種狀態
 * @param payload
 * @returns
 */
export function columnStatusChange(payload: InputColumn) {
  return request({
    url: '/api/ColumnRunning/ColumnStatusChange',
    method: 'post',
    data: payload
  })
}
