/**
 * 登入輸入模型
 */
interface ILoginInput extends IAccountInput {
  /** 密碼 */
  Password: string
}

/**
 * 輸入帳號模型
 */
interface IAccountInput {
  /** 帳號 */
  Account: string
}
