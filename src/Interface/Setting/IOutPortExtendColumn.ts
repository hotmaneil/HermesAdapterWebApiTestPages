/**
 * OutPort 共用表單延伸欄位
 */
interface IOutPortExtendColumn {
  /** 格式 */
  Type: string

  /** 鮑率 */
  BaudRate: number

  /** 奇偶性 */
  Parity: number

  /** 資料位元 */
  DataBits: number

  /** 停止位元 */
  StopBit: number
}
