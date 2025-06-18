/**
 * DB:發送的訊息
 */
interface IMvcMessageReceive {
  id: string
  messagE_TYPE: string
  face: string
  receivE_TIME: Date
}
export default IMvcMessageReceive
