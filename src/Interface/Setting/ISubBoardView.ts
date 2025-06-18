import type IDefaultSubKey from '@/Interface/Setting/IDefaultSubKey'

/**
 * 板資料檢視模型
 */
interface ISubBoardView extends IDefaultSubKey {
  isChecked: boolean

  /** 狀態名稱 */
  sbStatusName: string
}

export default ISubBoardView
