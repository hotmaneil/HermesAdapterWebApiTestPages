/**
 * DB:系統訊息日誌
 */
interface IMessageLog {
  loG_INDEX: string
  loG_TIME: string
  messagE_TYPE: string
  messagE_CONTENT: string
  operatoR_NAME: string
}
export default IMessageLog
