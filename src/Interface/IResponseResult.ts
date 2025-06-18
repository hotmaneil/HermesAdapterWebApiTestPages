/**
 * API回應結果資料模型
 * response.data
 */
interface IResponseResult {
  message: string

  payload: object

  responseTime: Date

  statusCode: number
}
