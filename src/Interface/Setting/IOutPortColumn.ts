/**
 * OutPort 共用表單欄位
 */
interface IOutPortColumn {
  /** 關聯於 */
  Name: number

  /** 是否啟用 */
  Enable: boolean

  /** 通訊埠 */
  Port: string

  /** 啟動信文 */
  start_message: string

  /** 讀取失敗信文 */
  read_failure_message: string

  /** TCP IP位置 */
  IP: string

  /** TCP 埠號 */
  TCP_port: number

  /** 寫入前綴 */
  WritePrefix: number

  /** 寫入後綴 */
  WriteSuffix: number
}
