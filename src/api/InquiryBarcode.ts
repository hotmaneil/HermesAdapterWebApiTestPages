import request from '@/utils/request'

/**
 * 依照屬性名稱取得值
 * @param payload
 * @returns
 */
export function getVaule(payload: IName) {
  return request({
    url: '/api/InquiryBarcode/GetVaule',
    method: 'post',
    data: payload
  })
}

/**
 * 更新 QBI及QWI 各種屬性值
 * @param payload
 * @returns
 */
export function update(payload: IInputModel) {
  return request({
    url: '/api/InquiryBarcode/Update',
    method: 'post',
    data: payload
  })
}

/**
 * 更新 QBI及QWI 各種屬性值 列表
 * @param payload
 * @returns
 */
export function updateList(payload: IInputModel[]) {
  return request({
    url: '/api/InquiryBarcode/UpdateList',
    method: 'post',
    data: payload
  })
}

/**
 * 更新輸入的子板資料列表
 * @param payload
 * @returns
 */
export function updateKeyInSubList(payload: IDefaultSub[]) {
  return request({
    url: '/api/InquiryBarcode/UpdateKeyInSubList',
    method: 'post',
    data: payload
  })
}

/**
 * 使用者輸入的更新 QBI及QWI 各種屬性值 列表 加進Log
 * @param payload
 * @returns
 */
export function userInputUpdateList(payload: IUserInputInquiryBarcode) {
  return request({
    url: '/api/InquiryBarcode/UserInputUpdateList',
    method: 'post',
    data: payload
  })
}
