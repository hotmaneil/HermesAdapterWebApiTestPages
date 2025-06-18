/**
 * 使用者輸入QBI及QWI專用資料模型
 */
interface IUserInputInquiryBarcode {
  InputList: IInputModel[]
  InputSubList: IDefaultSub[] | null
  Operator: string | undefined
}
