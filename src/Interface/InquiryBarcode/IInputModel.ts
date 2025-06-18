/**
 * QBI及QWI專用 檢視或輸入模型
 */
interface IInputModel extends IName {
  Value: string | undefined | null
}

/**
 * 屬性名稱
 */
interface IName {
  Name: string
}
