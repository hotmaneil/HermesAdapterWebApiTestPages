import request from '@/utils/request'

/**
 * 取得所有板資料紀錄列表
 * @returns
 */
export function getRecordBoardList() {
  return request({
    url: '/api/Record/GetRecordBoardList',
    method: 'get'
  })
}

/**
 * 取得板子翻轉狀況 下拉選單項目清單
 * @returns
 */
export function getBoardFlippedTypeDropDownList() {
  return request({
    url: '/api/Record/GetBoardFlippedTypeDropDownList',
    method: 'get'
  })
}

/**
 * 建立板子品質狀況 下拉選單項目清單
 * @returns
 */
export function getBoardFailedTypeDropDownList() {
  return request({
    url: '/api/Record/GetBoardFailedTypeDropDownList',
    method: 'get'
  })
}
