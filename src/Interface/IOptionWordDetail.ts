/**
 * DB:下拉選單語系資料
 */
interface IOptionWordDetail {
  optionWordID: number
  optionWordName: string
  detailId: number
  code: string
  sequence: number
  value: string
  languageContext: string
}
export default IOptionWordDetail
