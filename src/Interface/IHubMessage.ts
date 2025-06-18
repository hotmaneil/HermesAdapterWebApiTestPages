/**
 * SignalR Hub用的接收與發送之訊息
 */
interface IHubMessage {
  messageType: string
  face: string
}
export default IHubMessage
