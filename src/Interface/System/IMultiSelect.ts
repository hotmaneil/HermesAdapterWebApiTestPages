/**
 * 多選下拉選單模型
 */
interface IMultiSelect extends ISelect {
  children: ISelect[]
}

/**
 * 下拉選單模型
 */
interface ISelect {
  label: string
  key: string
  disabled: null | boolean
}
