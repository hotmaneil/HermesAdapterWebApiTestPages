import { useI18n } from 'vue-i18n'
import type { UpdateAlwaysRead } from '@/types/AlwaysRead/UpdateAlwaysRead'
import { updateAlwaysReadValue, readAlwaysReadValue } from '@/api/AlwaysRead'
import type IMvcSetting from '@/Interface/IMvcSetting'
import { Theme } from '@/stores/theme'
import { ThemeModeEnum } from '@/Enum/enums'

/**
 * 繫結語系
 * @param {*} name
 */
export function renderLanguage(name: string) {
  const { t } = useI18n()
  return () => t(name)
}

/**
 * 繫結語系並直接回傳
 * @param {*} name
 * @returns
 */
export function renderLanguageReturn(name: string) {
  const { t } = useI18n()
  return t(name)
}

/**
 * 隨狀態變更css顏色
 * @param param
 * @returns
 */
export function judgeStatusForClass(param: string) {
  switch (param) {
    case 'S':
      return Theme().storeTheme === ThemeModeEnum.Dark ? 'noUsedDark' : 'noUsed'
    case 'Y':
      return Theme().storeTheme === ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
    case 'N':
      return Theme().storeTheme === ThemeModeEnum.Dark ? 'disconnectedDark' : 'disconnected'
    default:
      return 'noUsed'
  }
}

/**
 * 更新經常讀取值
 */
export function updateAlwaysRead(ParamName: string) {
  return new Promise((resolve, reject) => {
    const payload: UpdateAlwaysRead = {
      Name: ParamName,
      Value: true
    }

    updateAlwaysReadValue(payload).then((response) => {
      console.log('updateAlwaysReadValue statusCode', response.data.statusCode)
      if (response.data.statusCode === 200) {
        resolve(`updateAlwaysReadValue success`)
      } else if (response.data.statusCode === 500) {
        resolve(`updateAlwaysReadValue fail`)
      }
    })
  })
}

/**
 * 從資料來源取得字串值
 * @param dataList
 * @param inputType
 * @param inputName
 */
export function returnStringValueFromSource(
  dataList: IMvcSetting[],
  inputType: string,
  inputName: string
) {
  const findParam = dataList.find((x) => x.type == inputType && x.name === inputName)
  if (findParam !== undefined) {
    return findParam.value
  } else {
    return ''
  }
}

/**
 * 從資料來源取得數值
 * @param dataList
 * @param inputType
 * @param inputName
 */
export function returnIntValueFromSource(
  dataList: IMvcSetting[],
  inputType: string,
  inputName: string
) {
  const findParam = dataList.find((x) => x.type == inputType && x.name === inputName)
  if (findParam !== undefined) {
    return parseInt(findParam.value)
  } else {
    return 0
  }
}

/**
 * 從資料來源取得浮點數
 * @param dataList
 * @param inputType
 * @param inputName
 * @returns
 */
export function returnFloatValueFromSource(
  dataList: IMvcSetting[],
  inputType: string,
  inputName: string
) {
  const findParam = dataList.find((x) => x.type == inputType && x.name === inputName)
  if (findParam !== undefined) {
    return parseFloat(findParam.value)
  } else {
    return 0
  }
}

/**
 * 從資料來源取得布林值
 * @param dataList
 * @param inputType
 * @param inputName
 */
export function returnBoolValueFromSource(
  dataList: IMvcSetting[],
  inputType: string,
  inputName: string
) {
  const findParam = dataList.find((x) => x.type == inputType && x.name === inputName)
  if (findParam !== undefined) {
    const boolValue = findParam.value.toLowerCase() === 'true'
    return boolValue
  } else {
    return false
  }
}
