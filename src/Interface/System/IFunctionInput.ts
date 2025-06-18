/**
 * 功能輸入模型
 */
interface IFunctionInput {
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

  /** 動作名稱 */
  actionName: string | null

  IsEnabled: boolean
}
