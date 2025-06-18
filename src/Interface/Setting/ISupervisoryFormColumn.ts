/**
 * Supervisory 表單欄位
 */
export interface ISupervisoryFormColumn {
  /** 是否啟用 */
  Enable: boolean

  /** TCP 埠號 */
  Port: number

  /** 回應存活確認 */
  CheckAliveResponse: boolean

  /** 組態設定相關 */
  Configuration: boolean

  /** 板況追蹤相關 */
  BoardTracking: boolean

  /** 查詢工單資訊 */
  QueryWorkOrderInfo: boolean

  /** 發送工單資訊 */
  SendWorkOrderInfo: boolean

  /** 回覆工單訊息 */
  ReplyWorkOrderInfo: boolean
}
export default ISupervisoryFormColumn
