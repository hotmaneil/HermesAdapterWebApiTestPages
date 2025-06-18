/**
 * 信文歷史檢視模型
 */
interface IHistory {
  timestamp: string

  facing: string

  Type: string

  boardID: string

  createdBy: string

  failed: string

  /** 產品類型 */
  productTypeID: string

  flipped: string

  topBarcode: string

  bottomBarcode: string

  /** 板長 */
  length: number

  /** 板寬 */
  width: number

  /** 板厚 */
  thickness: number

  /** 輸送帶速度 */
  conveyorSpeed: number

  /** 頂部間隙高度 */
  topClearanceHeight: number

  /** 底部間隙高度 */
  bottomClearanceHeight: number

  /** 板重 */
  weight: number

  /** 工單號碼 */
  workOrderID: string

  /** 批號 */
  batchID: string

  /** 路線 */
  route: number

  /** 動作 */
  action: number

  sub: string
}
