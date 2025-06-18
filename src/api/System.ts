import request from '@/utils/request'
import type InputIntIdModel from '@/Interface/InputIntIdModel'

/**
 * 更新使用者
 * @param payload
 * @returns
 */
export function updateUser(payload: IUserForm) {
  return request({
    url: '/api/System/UpdateUser',
    method: 'post',
    data: payload
  })
}

/**
 * 刪除使用者
 * @param payload
 * @returns
 */
export function deleteUser(payload: IInputAccount) {
  return request({
    url: '/api/System/DeleteUser',
    method: 'post',
    data: payload
  })
}

/**
 * 取得單一使用者資料
 * @param payload
 * @returns
 */
export function getUser(payload: InputIntIdModel) {
  return request({
    url: '/api/System/GetUser',
    method: 'post',
    data: payload
  })
}

/**
 * 取得所有使用者對應角色之列表
 * @returns
 */
export function getAllUserRoleList() {
  return request({
    url: '/api/System/GetAllUserRoleList',
    method: 'get'
  })
}

/**
 * 取得所有角色列表
 * @returns
 */
export function getAllRoleList() {
  return request({
    url: '/api/System/GetAllRoleList',
    method: 'get'
  })
}

/**
 * 取得角色下拉選單列表
 * @returns
 */
export function getRoleDropDownList() {
  return request({
    url: '/api/System/GetRoleDropDownList',
    method: 'get'
  })
}

/**
 * 取得模組下拉選單列表
 * @returns
 */
export function getModuleDropDownList() {
  return request({
    url: '/api/System/GetModuleDropDownList',
    method: 'get'
  })
}

/**
 * 依照模組Id取得功能列表
 * @param payload
 * @returns
 */
export function getFunctionList(payload: ISystemModuleId) {
  return request({
    url: '/api/System/GetFunctionList',
    method: 'post',
    data: payload
  })
}

/**
 * 更新功能
 * @param payload
 * @returns
 */
export function updateFunction(payload: IFunction) {
  return request({
    url: '/api/System/UpdateFunction',
    method: 'post',
    data: payload
  })
}

/**
 * 取得模組功能多重下拉選單用資料
 * @returns
 */
export function getFunctionMultiDropDownList() {
  return request({
    url: '/api/System/GetFunctionMultiDropDownList',
    method: 'get'
  })
}

/**
 * 更新角色之功能權限
 * @param payload
 * @returns
 */
export function updateAccessControl(payload: IAccessControl[]) {
  return request({
    url: '/api/System/UpdateAccessControl',
    method: 'post',
    data: payload
  })
}

/**
 * 依照角色Id取得功能權限列表
 * @param payload
 * @returns
 */
export function getAccessControlList(payload: InputIntIdModel) {
  return request({
    url: '/api/System/GetAccessControlList',
    method: 'post',
    data: payload
  })
}

/**
 * 登入
 * @param payload
 * @returns
 */
export function login(payload: ILoginInput) {
  return request({
    url: '/api/System/Login',
    method: 'post',
    data: payload
  })
}

/**
 * 取得使用者基本資料
 * @param payload
 * @returns
 */
export function getUserProfile(payload: IAccountInput) {
  return request({
    url: '/api/System/GetUserProfile',
    method: 'post',
    data: payload
  })
}

/**
 * 重新啟動Windows Service
 * @returns
 */
export function restartWindowsService() {
  return request({
    url: '/api/System/RestartWindowsService',
    method: 'get'
  })
}

/**
 * 重新啟動PC
 * @returns
 */
export function restartPC() {
  return request({
    url: '/api/System/RestartPC',
    method: 'get'
  })
}
