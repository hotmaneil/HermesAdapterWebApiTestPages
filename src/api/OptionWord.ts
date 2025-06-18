import request from '@/utils/request'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import type InputIntIdModel from '@/Interface/InputIntIdModel'

/**
 * 依照條件取得選項清單含不同語系名稱之列表
 * @param payload
 * @returns
 */
export function getOptionWordDetailList(payload: OptionWordSearch) {
  return request({
    url: '/api/OptionWord/GetOptionWordDetailList',
    method: 'post',
    data: payload
  })
}

/**
 * 取得選單列表
 * @returns
 */
export function getOptionWordList() {
  return request({
    url: '/api/OptionWord/GetOptionWordList',
    method: 'get'
  })
}

/**
 * 依照ID取得單筆選單資料
 * @param payload
 * @returns
 */
export function getOptionWord(payload: InputIntIdModel) {
  return request({
    url: '/api/OptionWord/GetOptionWord',
    method: 'post',
    data: payload
  })
}

/**
 * 依照OptionWord Id取得選單之選項列表
 * @param payload
 * @returns
 */
export function getOptionWordDetailListByOptionWordId(payload: IOptionWordIdSearch) {
  return request({
    url: '/api/OptionWord/GetOptionWordDetailListByOptionWordId',
    method: 'post',
    data: payload
  })
}

/**
 * 依照選項Id取得選項語系列表
 * @param payload
 * @returns
 */
export function getOptionWordDetailLangList(payload: InputIntIdModel) {
  return request({
    url: '/api/OptionWord/GetOptionWordDetailLangList',
    method: 'post',
    data: payload
  })
}

/**
 * 新增與更新選項選單
 * @param payload
 * @returns
 */
export function updateOptionWord(payload: IOptionWord) {
  return request({
    url: '/api/OptionWord/UpdateOptionWord',
    method: 'post',
    data: payload
  })
}

/**
 * 新增或更新選項明細
 * @param payload
 * @returns
 */
export function updateOptionWordDetail(payload: IOptionWordDetailData) {
  return request({
    url: '/api/OptionWord/UpdateOptionWordDetail',
    method: 'post',
    data: payload
  })
}

/**
 * 新增或更新選項之語系列表
 * @param payload
 * @returns
 */
export function updateOptionWordDetailNameList(payload: IOptionWordDetailName[]) {
  return request({
    url: '/api/OptionWord/UpdateOptionWordDetailNameList',
    method: 'post',
    data: payload
  })
}
