import { ref } from 'vue'
import type { DataTableRowKey } from 'naive-ui'
import type ISubBoardView from '@/Interface/Setting/ISubBoardView'
import { getDefaultSubBoardListWithLang, updateDefaultSubBoardList } from '@/api/Setting'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import { getCookie } from 'typescript-cookie'

export function defaultSubListForm() {
  /** 預設子板資料列表 */
  const defaultSubList = ref([] as ISubBoardView[])

  /**
   * 載入預設子板資料列表
   */
  function loadDefaultSubList() {
    const language = getCookie('Language')
    if (language !== undefined) {
      const payload: OptionWordSearch = {
        OptionWordId: undefined,
        OptionWordName: 'SubboardStatus',
        Language: language
      }
      getDefaultSubBoardListWithLang(payload).then((response) => {
        console.log('getDefaultSubBoardListWithLang response.data.payload', response.data.payload)
        let countNum = 1
        const dataList: ISubBoardView[] = response.data.payload
        dataList.forEach((element) => {
          element.key = countNum
          countNum++
        })
        defaultSubList.value = response.data.payload
      })
    }
  }

  /**
   * 新增預設子板資料列
   */
  function addNewDefaultSub() {
    const addItem: ISubBoardView = {
      key: defaultSubList.value.length + 1,
      sB_POS: defaultSubList.value.length + 1,
      sB_BC: '',
      sB_ST: 0,
      isChecked: false,
      sbStatusName: ''
    }
    defaultSubList.value.push(addItem)
  }

  /**
   * 更新所有預設子板列表
   */
  function updateAllDefaultSubBoardList() {
    return new Promise((resolve, reject) => {
      const payload: IDefaultSub[] = defaultSubList.value
      updateDefaultSubBoardList(payload).then((subResponse) => {
        if (subResponse.data.statusCode === 200) {
          const msg = 'update All DefaultSubBoardList success'
          resolve(msg)
        } else if (subResponse.data.statusCode === 500) {
          const msg = 'update All DefaultSubBoardList fail'
          reject(msg)
        }
      })
    })
  }

  /** 已勾選的子板資料清單 */
  const checkedDefaultSubList = ref([] as DataTableRowKey[])

  /**
   * 從預設子板資料列移除
   */
  function removeFromDefaultSubList() {
    checkedDefaultSubList.value.forEach((removeItem) => {
      const index = defaultSubList.value.findIndex((x) => x.key === removeItem)
      console.log('defaultSubList index', index)
      if (index > -1) {
        defaultSubList.value.splice(index, 1)
      }

      //更改position number
      let countNum = 1
      defaultSubList.value.forEach((element) => {
        element.sB_POS = countNum
        countNum++
      })
    })
  }

  /**
   * 勾選子板資料
   * @param value
   */
  function handleChecked(value: ISubBoardView) {
    console.log('handleChecked', value)

    if (value.isChecked) {
      checkedDefaultSubList.value.push(value.key)
    } else {
      const index = checkedDefaultSubList.value.findIndex((x) => x === value.key)
      console.log('index', index)
      if (index > -1) {
        checkedDefaultSubList.value.splice(index, 1)
      }
    }
  }

  return {
    defaultSubList,
    loadDefaultSubList,
    addNewDefaultSub,
    updateAllDefaultSubBoardList,

    checkedDefaultSubList,
    removeFromDefaultSubList,
    handleChecked
  }
}
