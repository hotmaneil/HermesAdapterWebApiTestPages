/**
 * Hermes 表單欄位
 */
export interface IHermesFormColumn {
  /** 是否啟用 */
  Enable: boolean

  /** 存活確認間隔秒數 */
  CheckAliveInterval: number

  /** 查詢回復逾時秒數 */
  QueryResponseTimeout: number

  /** 版本 */
  Version: number

  /** 延遲啟動秒數 */
  StratTransportDelayTime: number

  /** 命令預留數量 */
  Reserved_quantity: number

  /** 命令是否作用 */
  Command_effect: boolean

  /** 命令作用方向 */
  Command_Path: number

  /** 發送命令 */
  Give_Command_Order: boolean
}
export default IHermesFormColumn
