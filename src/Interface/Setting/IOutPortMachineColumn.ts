/**
 * OutPort 設備 表單欄位
 */
export interface IOutPortMachineColumn extends IOutPortExtendColumn {
  /** 是否啟用 */
  Enable: boolean

  /** 支援小數點位數 */
  DecimalPlaces: number

  /** 資料類型 */
  Mode: number

  /** 配方名稱ModBus初始地址 (0~65535) */
  RecipeName: number

  /** 寬度ModBus初始地址 (0~65535) */
  Width: number

  /** 配方名稱型態 */
  RNAddrType: number

  /** 寬度型態 */
  WidAddrType: number

  /** 通訊埠 */
  Port: string

  /** TCP IP位置 */
  IP: string

  /** 	TCP 埠號 */
  TCP_port: number
}
export default IOutPortMachineColumn
