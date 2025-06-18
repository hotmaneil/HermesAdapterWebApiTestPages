/**
 * Hermes 上下游共用表單欄位
 */
interface IStreamFormColumn {
  /** 是否啟用 */
  Enable: boolean

  /** TCP IP位置 */
  IP: string

  /** TCP 埠號 */
  Port: number

  /** 回應存活確認 */
  CheckAliveResponse: boolean

  /** 板預告 */
  BoardForecast: boolean

  /** 命令 */
  Command: boolean

  /** 發送BA及MR先後順序 */
  Order: number

  /** 跳脫狀態時間 */
  BreakStatusTime: number
}
