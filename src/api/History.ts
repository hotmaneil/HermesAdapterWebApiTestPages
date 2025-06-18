import request from '@/utils/request'

/**
 * 取得Hermes歷史列表
 * @param payload
 * @returns
 */
export function getHistoryList(payload: IHistorySearch) {
  return request({
    url: '/api/History/GetHistoryList',
    method: 'post',
    data: payload
  })
}

/**
 * 刪除今日暫存檔案
 * @param payload
 * @returns
 */
export function deleteTodayTempFile(payload: IHistorySearch) {
  return request({
    url: '/api/History/DeleteTodayTempFile',
    method: 'post',
    data: payload
  })
}
