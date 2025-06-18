/**
 * DB View:使用者與對應角色
 */
interface IUserRole {
  id: number

  /** 使用者Id */
  userId: number

  /** 使用者帳號 */
  userCode: string

  /** 使用者名稱 */
  userName: string

  /** 是否啟用 */
  isEnabled: boolean

  /** 角色Id */
  roleId: number

  /** 角色名稱 */
  roleName: string

  /** 角色描述 */
  roleDescription: string
}
export default IUserRole
