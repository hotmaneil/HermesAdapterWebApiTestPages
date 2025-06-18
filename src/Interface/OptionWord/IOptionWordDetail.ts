/**
 * DB:選單內容也就是選項的資料模型
 */
interface IOptionWordDetailData {
  id: number

  optionWordId: number

  optionWordName: string | undefined | null

  sequence: number

  code: string

  value: string

  isEnabled: boolean
}
