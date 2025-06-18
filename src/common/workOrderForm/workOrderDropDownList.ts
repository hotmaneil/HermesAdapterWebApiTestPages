import { ref } from 'vue'
import type { DropDownList } from '@/types/DropDownList'
import { getCookie } from 'typescript-cookie'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import { getOptionWordDetailList } from '@/api/OptionWord'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'

export function workOrderDropDownList() {
  /** 板子判定狀況下拉炫單 */
  const failedBoardDropDownList = ref([] as DropDownList[])

  /**
   * 建立板子判定狀況下拉選單
   */
  function setFailedBoardDropDownList() {
    failedBoardDropDownList.value = []
    const language = getCookie('Language')
    if (language !== undefined) {
      const payload: OptionWordSearch = {
        OptionWordId: undefined,
        OptionWordName: 'FailedBoard',
        Language: language
      }

      getOptionWordDetailList(payload).then((response) => {
        const dataList: IOptionWordDetail[] = response.data

        dataList.forEach((element) => {
          const option: DropDownList = {
            label: element.languageContext,
            value: parseInt(element.value)
          }
          failedBoardDropDownList.value.push(option)
        })
      })
    }
  }

  /** 板子翻轉狀況下拉炫單 */
  const flippedBoardDropDownList = ref([] as DropDownList[])

  /**
   * 建立板子翻轉狀況下拉選單
   */
  function setFlippedBoardDropDownList() {
    flippedBoardDropDownList.value = []
    const language = getCookie('Language')

    if (language !== undefined) {
      const payload: OptionWordSearch = {
        OptionWordId: undefined,
        OptionWordName: 'FlippedBoard',
        Language: language
      }

      getOptionWordDetailList(payload).then((response) => {
        const dataList: IOptionWordDetail[] = response.data

        dataList.forEach((element) => {
          const option: DropDownList = {
            label: element.languageContext,
            value: parseInt(element.value)
          }
          flippedBoardDropDownList.value.push(option)
        })
      })
    }
  }

  /** Barcode 型態下拉炫單 */
  const barcodeTypeDropDownList = ref([] as DropDownList[])

  /**
   * 建立 Barcode 型態下拉選單
   */
  function setBarcodeTypeDropDownList() {
    barcodeTypeDropDownList.value = []
    const language = getCookie('Language')

    if (language !== undefined) {
      const payload: OptionWordSearch = {
        OptionWordId: undefined,
        OptionWordName: 'BarcodeType',
        Language: language
      }

      getOptionWordDetailList(payload).then((response) => {
        const dataList: IOptionWordDetail[] = response.data

        dataList.forEach((element) => {
          const option: DropDownList = {
            label: element.languageContext,
            value: parseInt(element.value)
          }
          barcodeTypeDropDownList.value.push(option)
        })
      })
    }
  }

  /** 子板狀態下拉選單 */
  const subBoardStatusDropDownList = ref([] as DropDownList[])

  /**
   * 建立子板狀態下拉選單
   */
  function setSubBoardStatusDropDownList() {
    const language = getCookie('Language')
    subBoardStatusDropDownList.value = []

    if (language !== undefined) {
      const payload: OptionWordSearch = {
        OptionWordId: undefined,
        OptionWordName: 'SubboardStatus',
        Language: language
      }

      getOptionWordDetailList(payload).then((response) => {
        const dataList: IOptionWordDetail[] = response.data

        dataList.forEach((element) => {
          const option: DropDownList = {
            label: element.languageContext,
            value: parseInt(element.value)
          }
          subBoardStatusDropDownList.value.push(option)
        })
      })
    }
  }

  return {
    failedBoardDropDownList,
    setFailedBoardDropDownList,

    flippedBoardDropDownList,
    setFlippedBoardDropDownList,

    barcodeTypeDropDownList,
    setBarcodeTypeDropDownList,

    subBoardStatusDropDownList,
    setSubBoardStatusDropDownList
  }
}
