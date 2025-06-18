/**
 * DB:接收到的訊息
 */
interface IMvcMessageSend {
  id: string
  messagE_TYPE: string
  face: string
  senD_TIME: Date
}
export default IMvcMessageSend
