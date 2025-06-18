/**
 * DB View:系統使用者檢視模型
 */
interface IUser {
  id: number

  /** 帳號 */
  code: string | undefined

  /** 姓名 */
  name: string | undefined

  /** 角色Id */
  roleId: number | undefined

  /** 角色名稱 */
  roleName: string | undefined
}
