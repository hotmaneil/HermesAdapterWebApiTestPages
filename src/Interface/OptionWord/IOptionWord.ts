/**
 * DB:選單資料模型
 */
interface IOptionWord {
  id: number

  /** 選單名稱 */
  displayName: string

  /** 是否啟用 */
  isEnabled: boolean
}
