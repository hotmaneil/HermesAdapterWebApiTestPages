import request from '@/utils/request'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type { UpdateParamUser } from '@/types/Setting/UpdateParamUser'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'

/**
 * 依照參數搜尋出設定列表
 * @param payload
 * @returns
 */
export function getSettingList(payload: SettingSearch) {
  return request({
    url: '/api/Setting/GetSettingList',
    method: 'post',
    data: payload
  })
}

/**
 * 依照欄位名更新設定
 * @param payload
 * @returns
 */
export function updateSettingByList(payload: UpdateParamUser) {
  return request({
    url: '/api/Setting/UpdateSettingByList',
    method: 'post',
    data: payload
  })
}

/**
 * 取得版本 下拉選單項目清單
 * @returns
 */
export function getVersionDropDownList() {
  return request({
    url: '/api/Setting/GetVersionDropDownList',
    method: 'get'
  })
}

/**
 * 取得所有預設子板資料列表
 * @returns
 */
export function getAllDefaultSubBoardList() {
  return request({
    url: '/api/Setting/GetAllDefaultSubBoardList',
    method: 'get'
  })
}

/**
 * 依照語系取得預設子板資料檢視列表
 * @param payload
 * @returns
 */
export function getDefaultSubBoardListWithLang(payload: OptionWordSearch) {
  return request({
    url: '/api/Setting/GetDefaultSubBoardListWithLang',
    method: 'post',
    data: payload
  })
}

/**
 * 更新預設子板資料列表
 * @param payload
 * @returns
 */
export function updateDefaultSubBoardList(payload: IDefaultSub[]) {
  return request({
    url: '/api/Setting/UpdateDefaultSubBoardList',
    method: 'post',
    data: payload
  })
}

/**
 * 取得關聯於下拉選單列表
 * @returns
 */
export function getLinkbyNameDropDownList() {
  return request({
    url: '/api/Setting/GetLinkbyNameDropDownList',
    method: 'get'
  })
}

/**
 * 取得Port下拉選單列表
 * @returns
 */
export function getPortDropDownList() {
  return request({
    url: '/api/Setting/GetPortDropDownList',
    method: 'get'
  })
}

/**
 * 取得格式下拉選單列表
 * @returns
 */
export function getFormatTypeDropDownList() {
  return request({
    url: '/api/Setting/GetFormatTypeDropDownList',
    method: 'get'
  })
}

/**
 * 取得鮑率下拉選單列表
 * @returns
 */
export function getBaudRateDropDownList() {
  return request({
    url: '/api/Setting/GetBaudRateDropDownList',
    method: 'get'
  })
}

/**
 * 取得奇偶性下拉選單列表
 * @returns
 */
export function getParityDropDownList() {
  return request({
    url: '/api/Setting/GetParityDropDownList',
    method: 'get'
  })
}

/**
 * 取得資料位元下拉選單列表
 * @returns
 */
export function getDataBitsDropDownList() {
  return request({
    url: '/api/Setting/GetDataBitsDropDownList',
    method: 'get'
  })
}

/**
 * 取得停止位元下拉選單列表
 * @returns
 */
export function getStopBitDropDownList() {
  return request({
    url: '/api/Setting/GetStopBitDropDownList',
    method: 'get'
  })
}

/**
 * 取得寫入前綴與寫入後綴 用的下拉選單列表
 * @returns
 */
export function getWritefixfForPreSufDropDownList() {
  return request({
    url: '/api/Setting/GetWritefixfForPreSufDropDownList',
    method: 'get'
  })
}

/**
 * 取得資料類型(Mode)下拉選單列表
 * @returns
 */
export function getDatatypeDropDownList() {
  return request({
    url: '/api/Setting/GetDatatypeDropDownList',
    method: 'get'
  })
}
