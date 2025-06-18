/**
 * 工單資訊 表單欄位
 */
export interface IWorkOrderFormColumn {
  /** 工單資訊來源 */
  WorkOrderData: string

  /** 無資料動作 */
  QWINoData: string

  /** 工單號碼 */
  WorkOrderID: string

  /** 批號 */
  BatchID: string

  /** 板子判定狀況 */
  FailedBoard: number

  /** 產品類型 */
  ProductTypeID: string

  /** 板子翻轉狀況 */
  FlippedBoard: number

  Topbarcodetitle: string
  Bottombarcodetitle: string

  Topbarcodetype: number
  Bottombarcodetype: number

  /** 板長 */
  Length: number

  /** 板寬 */
  Width: number

  /** 板厚 */
  Thickness: number

  /** 輸送帶速度 */
  ConveyorSpeed: number

  /** 頂部間隙高度 */
  TopClearanceHeight: number

  /** 底部間隙高度 */
  BottomClearanceHeight: number

  /** 板重 */
  Weight: number

  /** 路線 */
  Route: number

  /** 動作 */
  Action: number
}
export default IWorkOrderFormColumn
