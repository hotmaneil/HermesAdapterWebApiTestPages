/**
 * DB View:角色檢視模型
 */
interface IRole {
  id: number

  /** 角色名稱 */
  name: string

  /** 描述 */
  description: string

  /** 是否啟用 */
  isEnabled: boolean
}
