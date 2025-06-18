import request from '@/utils/request'

/**
 * 執行Com測試
 * @param payload
 * @returns
 */
export function executeComTest(payload: IComTestCollection) {
  return request({
    url: '/api/ComTest/ExecuteComTest',
    method: 'post',
    data: payload
  })
}
