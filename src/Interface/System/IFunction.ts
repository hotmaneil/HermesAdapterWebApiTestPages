/**
 * DB View:功能檢視模型
 */
interface IFunction {
  id: number

  /** 系統模組ID */
  systemModuleId: number

  /** 功能代號 */
  code: string

  /** 顯示名稱 */
  displayName: string

  rank: number

  /** 是否主頁 */
  isMainFunction: boolean

  /** 控制器名稱 */
  //   ControllerName: string | null

  /** 動作名稱 */
  actionName: string | null

  /** 是否啟用 */
  isEnabled: boolean
}
