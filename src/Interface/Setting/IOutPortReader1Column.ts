/**
 * OutPort Reader1 表單欄位
 */
export interface IOutPortReader1Column extends IOutPortColumn, IOutPortExtendColumn {
  /** 寫入超時時長 */
  WriteTimeout: number
}
export default IOutPortReader1Column
