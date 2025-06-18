import { ref } from 'vue'
import type { IWorkOrderFormColumn } from '@/Interface/Setting/IWorkOrderFormColumn'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type IMvcSetting from '@/Interface/IMvcSetting'
import { getSettingList, updateSettingByList } from '@/api/Setting'
import {
  returnStringValueFromSource,
  returnIntValueFromSource,
  returnFloatValueFromSource
} from '@/utils/Common'
import type { UpdateParam } from '@/types/Setting/UpdateParam'
import { getCookie } from 'typescript-cookie'
import type { UpdateParamUser } from '@/types/Setting/UpdateParamUser'

export function formData() {
  const workOrderFormData = ref({} as IWorkOrderFormColumn)

  /**
   * 取得工單設定列表
   */
  function getWorOrderList() {
    return new Promise((resolve, reject) => {
      const payload: SettingSearch = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        if (response.data.statusCode === 200) {
          resolve('getWorOrderList ok')

          const dataList: IMvcSetting[] = response.data.payload

          workOrderFormData.value.WorkOrderData = returnStringValueFromSource(
            dataList,
            'Recipe',
            'WorkOrderData'
          )

          workOrderFormData.value.QWINoData = returnStringValueFromSource(
            dataList,
            'Recipe',
            'QWINoData'
          )

          workOrderFormData.value.WorkOrderID = returnStringValueFromSource(
            dataList,
            'Recipe',
            'WorkOrderID'
          )

          workOrderFormData.value.BatchID = returnStringValueFromSource(
            dataList,
            'Recipe',
            'BatchID'
          )

          workOrderFormData.value.FailedBoard = returnIntValueFromSource(
            dataList,
            'Recipe',
            'FailedBoard'
          )

          workOrderFormData.value.ProductTypeID = returnStringValueFromSource(
            dataList,
            'Recipe',
            'ProductTypeID'
          )

          workOrderFormData.value.FlippedBoard = returnIntValueFromSource(
            dataList,
            'Recipe',
            'FlippedBoard'
          )

          workOrderFormData.value.Topbarcodetitle = returnStringValueFromSource(
            dataList,
            'Recipe',
            'Topbarcodetitle'
          )

          workOrderFormData.value.Bottombarcodetitle = returnStringValueFromSource(
            dataList,
            'Recipe',
            'Bottombarcodetitle'
          )

          workOrderFormData.value.Topbarcodetype = returnIntValueFromSource(
            dataList,
            'Recipe',
            'Topbarcodetype'
          )

          workOrderFormData.value.Bottombarcodetype = returnIntValueFromSource(
            dataList,
            'Recipe',
            'Bottombarcodetype'
          )

          workOrderFormData.value.Length = returnFloatValueFromSource(dataList, 'Recipe', 'Length')
          workOrderFormData.value.Width = returnFloatValueFromSource(dataList, 'Recipe', 'Width')
          workOrderFormData.value.Thickness = returnFloatValueFromSource(
            dataList,
            'Recipe',
            'Thickness'
          )

          workOrderFormData.value.ConveyorSpeed = returnFloatValueFromSource(
            dataList,
            'Recipe',
            'ConveyorSpeed'
          )

          workOrderFormData.value.TopClearanceHeight = returnFloatValueFromSource(
            dataList,
            'Recipe',
            'TopClearanceHeight'
          )

          workOrderFormData.value.BottomClearanceHeight = returnFloatValueFromSource(
            dataList,
            'Recipe',
            'BottomClearanceHeight'
          )

          workOrderFormData.value.Weight = returnFloatValueFromSource(dataList, 'Recipe', 'Weight')
          workOrderFormData.value.Route = returnIntValueFromSource(dataList, 'Recipe', 'Route')
          workOrderFormData.value.Action = returnIntValueFromSource(dataList, 'Recipe', 'Action')
        } else if (response.data.statusCode === 500) {
          reject('getWorOrderList fail')
        }
      })
    })
  }

  /**
   * 更新工單資訊
   */
  function updateWorkInfo() {
    return new Promise((resolve, reject) => {
      const updateList: UpdateParam[] = []

      const workOrderData: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'WorkOrderData',
        Value: workOrderFormData.value.WorkOrderData
      }
      updateList.push(workOrderData)

      const qWINoData: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'QWINoData',
        Value: workOrderFormData.value.QWINoData
      }
      updateList.push(qWINoData)

      const workOrderID: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'WorkOrderID',
        Value: workOrderFormData.value.WorkOrderID
      }
      updateList.push(workOrderID)

      const batchID: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'BatchID',
        Value: workOrderFormData.value.BatchID
      }
      updateList.push(batchID)

      const failedBoard: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'FailedBoard',
        Value: workOrderFormData.value.FailedBoard.toString()
      }
      updateList.push(failedBoard)

      const productTypeID: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'ProductTypeID',
        Value: workOrderFormData.value.ProductTypeID
      }
      updateList.push(productTypeID)

      const flippedBoard: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'FlippedBoard',
        Value: workOrderFormData.value.FlippedBoard.toString()
      }
      updateList.push(flippedBoard)

      const topbarcodetitle: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Topbarcodetitle',
        Value: workOrderFormData.value.Topbarcodetitle
      }
      updateList.push(topbarcodetitle)

      const bottombarcodetitle: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Bottombarcodetitle',
        Value: workOrderFormData.value.Bottombarcodetitle
      }
      updateList.push(bottombarcodetitle)

      const topbarcodetype: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Topbarcodetype',
        Value: workOrderFormData.value.Topbarcodetype.toString()
      }
      updateList.push(topbarcodetype)

      const bottombarcodetype: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Bottombarcodetype',
        Value: workOrderFormData.value.Bottombarcodetype.toString()
      }
      updateList.push(bottombarcodetype)

      const length: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Length',
        Value: workOrderFormData.value.Length.toString()
      }
      updateList.push(length)

      const width: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Width',
        Value: workOrderFormData.value.Width.toString()
      }
      updateList.push(width)

      const thickness: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Thickness',
        Value: workOrderFormData.value.Thickness.toString()
      }
      updateList.push(thickness)

      const conveyorSpeed: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'ConveyorSpeed',
        Value: workOrderFormData.value.ConveyorSpeed.toString()
      }
      updateList.push(conveyorSpeed)

      const topClearanceHeight: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'TopClearanceHeight',
        Value: workOrderFormData.value.TopClearanceHeight.toString()
      }
      updateList.push(topClearanceHeight)

      const bottomClearanceHeight: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'BottomClearanceHeight',
        Value: workOrderFormData.value.BottomClearanceHeight.toString()
      }
      updateList.push(bottomClearanceHeight)

      const weight: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Weight',
        Value: workOrderFormData.value.Weight.toString()
      }
      updateList.push(weight)

      const route: UpdateParam = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: 'Route',
        Value: workOrderFormData.value.Route.toString()
      }
      updateList.push(route)

      const account = getCookie('Account')
      const payload: UpdateParamUser = {
        InputList: updateList,
        Operator: account
      }

      updateSettingByList(payload).then((response) => {
        if (response.data.statusCode === 200) {
          const msg = 'update updateWorkInfo success'
          resolve(msg)
        } else if (response.data.statusCode === 500) {
          const msg = 'update updateWorkInfo fail'
          reject(msg)
        }
      })
    })
  }

  /** 版本號碼 */
  const versionNumber = ref(150 as number)

  /**
   * 取得版本號碼
   */
  function getVersionNumber() {
    const vNumber = getCookie('VersionNumber')
    if (vNumber === undefined) {
      versionNumber.value = 150
    } else {
      versionNumber.value = parseInt(vNumber)
    }
  }

  return {
    workOrderFormData,
    getWorOrderList,
    updateWorkInfo,

    versionNumber,
    getVersionNumber
  }
}
