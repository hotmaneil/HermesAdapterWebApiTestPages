/**
 * DB:板紀錄
 */
interface IRecordBoard {
  recorD_INDEX: string
  recorD_TIME: string
  boarD_ID: string
  boarD_ID_CREATOR: string
  producT_TYPE_ID: string
  toP_BARCODE: string
  bottoM_BARCODE: string
  worK_ORDER_ID: string
  length: number
  width: number
  thickness: number
  toP_CLEARANCE_HEIGHT: number
  bottoM_CLEARANCE_HEIGHT: number
  batcH_ID: string
  faileD_BOARD: number
  flippeD_BOARD: number
  conveyoR_SPEED: number
  weight: number
  route: number
  action: number
}

export default IRecordBoard
