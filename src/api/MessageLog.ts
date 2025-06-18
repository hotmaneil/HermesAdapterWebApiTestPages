import request from '@/utils/request'
import type { PageParam } from '@/types/PageParam'
import type { ScrollParam } from '@/types/ScrollParam'

/**
 * 依照分頁參數取得系統訊息日誌列表
 * @param payload
 * @returns
 */
export function getMessageLogList(payload: PageParam) {
  return request({
    url: '/api/MessageLog/GetMessageLogList',
    method: 'post',
    data: payload
  })
}

/**
 * 透過捲軸(Scroll) 取得系統訊息日誌列表
 * @param payload
 * @returns
 */
export function getMessageLogScrollData(payload: ScrollParam) {
  return request({
    url: '/api/MessageLog/GetMessageLogScrollData',
    method: 'post',
    data: payload
  })
}
