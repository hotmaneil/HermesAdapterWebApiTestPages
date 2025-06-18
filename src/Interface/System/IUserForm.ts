/**
 * 系統使用者表單
 */
interface IUserForm extends IUser {
  /** 密碼 */
  password: string | null

  /** 確認密碼 */
  confirmPassword: string | null

  /** 是否啟用 */
  isEnabled: boolean

  /** 修改者 */
  Modifier: string | null
}
