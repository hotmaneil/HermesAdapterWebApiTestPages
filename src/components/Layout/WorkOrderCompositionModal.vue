<template>
  <n-modal v-model:show="showModalValue">
    <n-card
      style="width: 1224px"
      :title="$t('WorkOrder')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card :title="$t('Settings.WorkOrderInfo')">
            <n-form ref="formWorkOrder" :model="workOrderFormData">
              <n-form-item path="WorkOrderID" :label="$t('Settings.WorkOrderID')">
                <n-input v-model:value="workOrderFormData.WorkOrderID" @keydown.enter.prevent />
              </n-form-item>

              <n-form-item path="BatchID" :label="$t('Settings.BatchID')">
                <n-input v-model:value="workOrderFormData.BatchID" @keydown.enter.prevent />
              </n-form-item>

              <n-form-item path="FailedBoard" :label="$t('Settings.FailedBoard')">
                <n-select
                  v-model:value="workOrderFormData.FailedBoard"
                  :options="failedBoardDropDownList"
                />
              </n-form-item>

              <n-form-item path="ProductTypeID" :label="$t('Settings.ProductTypeID')">
                <n-input v-model:value="workOrderFormData.ProductTypeID" @keydown.enter.prevent />
              </n-form-item>

              <n-form-item path="FlippedBoard" :label="$t('Settings.FlippedBoard')">
                <n-select
                  v-model:value="workOrderFormData.FlippedBoard"
                  :options="flippedBoardDropDownList"
                />
              </n-form-item>

              <n-form-item path="Topbarcodetitle" label="TopBarCode">
                <n-input v-model:value="workOrderFormData.Topbarcodetitle" @keydown.enter.prevent />
              </n-form-item>

              <n-form-item path="Bottombarcodetitle" label="BottomBarCode">
                <n-input
                  v-model:value="workOrderFormData.Bottombarcodetitle"
                  @keydown.enter.prevent
                />
              </n-form-item>

              <n-grid :span="24" :x-gap="24">
                <n-form-item-gi :span="12" path="Length" :label="$t('Settings.Length')">
                  <n-input-number
                    :step="0.01"
                    v-model:value="workOrderFormData.Length"
                    @keydown.enter.prevent
                  />
                </n-form-item-gi>

                <n-form-item-gi :span="12" path="Width" :label="$t('Settings.Width')">
                  <n-input-number
                    :step="0.01"
                    v-model:value="workOrderFormData.Width"
                    @keydown.enter.prevent
                  />
                </n-form-item-gi>

                <n-form-item-gi :span="12" path="Thickness" :label="$t('Settings.Thickness')">
                  <n-input-number
                    :step="0.01"
                    v-model:value="workOrderFormData.Thickness"
                    @keydown.enter.prevent
                  />
                </n-form-item-gi>

                <n-form-item-gi
                  :span="12"
                  path="ConveyorSpeed"
                  :label="$t('Settings.ConveyorSpeed')"
                >
                  <n-input-number
                    :step="0.01"
                    v-model:value="workOrderFormData.ConveyorSpeed"
                    @keydown.enter.prevent
                  />
                </n-form-item-gi>

                <n-form-item-gi
                  :span="12"
                  path="TopClearanceHeight"
                  :label="$t('Settings.TopClearanceHeight')"
                >
                  <n-input-number
                    :step="0.01"
                    v-model:value="workOrderFormData.TopClearanceHeight"
                    @keydown.enter.prevent
                  />
                </n-form-item-gi>

                <n-form-item-gi
                  :span="12"
                  path="BottomClearanceHeight"
                  :label="$t('Settings.BottomClearanceHeight')"
                >
                  <n-input-number
                    :step="0.01"
                    v-model:value="workOrderFormData.BottomClearanceHeight"
                    @keydown.enter.prevent
                  />
                </n-form-item-gi>

                <n-form-item-gi :span="12" path="Weight" :label="$t('Settings.Weight')">
                  <n-input-number
                    :step="0.01"
                    v-model:value="workOrderFormData.Weight"
                    @keydown.enter.prevent
                  />
                </n-form-item-gi>

                <n-form-item-gi
                  :span="12"
                  path="Route"
                  :label="$t('Settings.Route')"
                  v-if="versionNumber > 130"
                >
                  <n-input-number v-model:value="workOrderFormData.Route" @keydown.enter.prevent />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </n-card>
        </n-gi>

        <n-gi>
          <n-card :title="$t('Settings.SubBoards')">
            <n-data-table
              :columns="keyInSubColumnList"
              :data="keyInSubList"
              :pagination="pagination"
              @update:checked-row-keys="handleCheck"
            />
            <n-button type="info" ghost @click="addNewSub">
              {{ $t('Settings.AddSubBoard') }}
            </n-button>
            <n-button type="error" ghost @click="removeFromSubList">
              {{ $t('Settings.DeleteSubBoard') }}
            </n-button>
          </n-card>
        </n-gi>
      </n-grid>
      <n-button type="info" ghost @click="submit()" size="large" block>
        {{ $t('Submit') }}
      </n-button>
    </n-card>
  </n-modal>
</template>

<!-- Composition 組合式寫法-->

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed, onMounted, ref, h, watch, inject } from 'vue'
import { getAllDefaultSubBoardList } from '@/api/Setting'
import { workOrderDropDownList } from '@/common/workOrderForm/workOrderDropDownList'
import { formData } from '@/common/workOrderForm/formData'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import type IDefaultSubKey from '@/Interface/Setting/IDefaultSubKey'
import { renderLanguage } from '@/utils/Common'
import { NInput, NSelect } from 'naive-ui'
import type { Pagination } from '@/types/Pagination'
import { updateKeyInSubList, updateList, userInputUpdateList } from '@/api/InquiryBarcode'
import { getCookie } from 'typescript-cookie'
import { getVaule } from '@/api/InquiryBarcode'

export default defineComponent({
  props: {
    showModal: {
      type: Boolean as PropType<boolean>,
      required: true
    }
  },
  setup(props, { emit }) {
    const renewLang = inject('renewLang') as String
    watch(renewLang, async (newVal, oldVal) => {
      console.log(`renewLang newVal: ${newVal},oldVal:${oldVal}`)
      setFailedBoardDropDownList()
      setFlippedBoardDropDownList()
      setBarcodeTypeDropDownList()
      setSubBoardStatusDropDownList()
    })

    const showModalValue = computed({
      get() {
        bundleInquiryBarcode()
        return props.showModal
      },
      set(newValue: boolean) {
        emit('update:showWorkOrderModal', newValue)
      }
    })
    const {
      failedBoardDropDownList,
      setFailedBoardDropDownList,

      flippedBoardDropDownList,
      setFlippedBoardDropDownList,

      barcodeTypeDropDownList,
      setBarcodeTypeDropDownList,

      subBoardStatusDropDownList,
      setSubBoardStatusDropDownList
    } = workOrderDropDownList()

    const { workOrderFormData, getWorOrderList, versionNumber, getVersionNumber } = formData()

    /**
     * 輸入子板資料之欄位
     */
    const keyInSubColumnList = ref([] as DataTableColumns<IDefaultSubKey>)

    /**
     * 輸入子板資料列表
     */
    const keyInSubList = ref([] as IDefaultSubKey[])

    /**
     * 已勾選的子板資料清單
     */
    const checkedSubList = ref([] as DataTableRowKey[])

    const pagination = ref({
      page: 1,
      pageSize: 10
    } as Pagination)

    /**
     * 設定欄位
     */
    function setkeyInSubColumns() {
      keyInSubColumnList.value = [
        {
          type: 'selection'
        },
        {
          title: renderLanguage('Postion'),
          key: 'sB_POS',
          width: 80
        },
        {
          title: renderLanguage('Barcode'),
          key: 'sB_BC',
          render(row, index) {
            return h(NInput, {
              value: row.sB_BC,
              onUpdateValue(newValue) {
                keyInSubList.value[index].sB_BC = newValue
              }
            })
          }
        },
        {
          title: renderLanguage('Status'),
          key: 'sB_ST',
          render(row, index) {
            return h(NSelect, {
              options: subBoardStatusDropDownList.value,
              value: row.sB_ST,
              onUpdateValue(newValue) {
                keyInSubList.value[index].sB_ST = newValue
              }
            })
          }
        }
      ]
    }

    /**
     * 勾選子板資料
     * @param rowKeys
     */
    function handleCheck(rowKeys: DataTableRowKey[]) {
      console.log('handleCheck rowKeys', rowKeys)
      checkedSubList.value = rowKeys
    }

    /**
     * 新增子板資料列
     */
    function addNewSub() {
      const addItem: IDefaultSubKey = {
        key: keyInSubList.value.length + 1,
        sB_POS: keyInSubList.value.length + 1,
        sB_BC: '',
        sB_ST: 0
      }
      keyInSubList.value.push(addItem)
    }

    /**
     * 從子板資料列移除
     */
    function removeFromSubList() {
      checkedSubList.value.forEach((removeItem) => {
        const findItem = keyInSubList.value.find((x) => x.key === removeItem)
        console.log('findItem', findItem)
        if (findItem !== undefined) {
          keyInSubList.value.splice(findItem.key - 1, 1)
        }

        //更改position number
        let countNum = 1
        keyInSubList.value.forEach((element) => {
          element.sB_POS = countNum
          countNum++
        })
      })
    }

    /**
     * 提交
     */
    function submit() {
      const payload: IInputModel[] = [
        {
          Name: 'KeyinIsAsked',
          Value: 'false'
        },
        {
          Name: 'KeyinIsSend',
          Value: 'true'
        },
        {
          Name: 'Topbarcode',
          Value: workOrderFormData.value.Topbarcodetitle
        },
        {
          Name: 'Bottombarcode',
          Value: workOrderFormData.value.Bottombarcodetitle
        },
        {
          Name: 'WorkOrderID',
          Value: workOrderFormData.value.WorkOrderID
        },
        {
          Name: 'BatchID',
          Value: workOrderFormData.value.BatchID
        },
        {
          Name: 'FailedBoard',
          Value: workOrderFormData.value.FailedBoard.toString()
        },
        {
          Name: 'ProductTypeID',
          Value: workOrderFormData.value.ProductTypeID
        },
        {
          Name: 'FlippedBoard',
          Value: workOrderFormData.value.FlippedBoard.toString()
        },
        {
          Name: 'Length',
          Value: workOrderFormData.value.Length.toString()
        },
        {
          Name: 'Width',
          Value: workOrderFormData.value.Width.toString()
        },
        {
          Name: 'Thickness',
          Value: workOrderFormData.value.Thickness.toString()
        },
        {
          Name: 'ConveyorSpeed',
          Value: workOrderFormData.value.ConveyorSpeed.toString()
        },
        {
          Name: 'TopClearanceHeight',
          Value: workOrderFormData.value.TopClearanceHeight.toString()
        },
        {
          Name: 'BottomClearanceHeight',
          Value: workOrderFormData.value.BottomClearanceHeight.toString()
        },
        {
          Name: 'Weight',
          Value: workOrderFormData.value.Weight.toString()
        },
        {
          Name: 'Route',
          Value: workOrderFormData.value.Route.toString()
        }
      ]

      updateList(payload).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(submitWorkOrderSuccess)
          emit('finishSubmitWorkOrder')
        } else if (response.data.statusCode === 500) {
          window.$message.error(submitWorkOrderFail)
        }
      })

      let subPayload: IDefaultSub[] = keyInSubList.value
      updateKeyInSubList(subPayload).then((subResponse) => {
        if (subResponse.data.statusCode === 200) {
          window.$message.success(submitsubBoardListSuccess)
          showModalValue.value = false
        } else if (subResponse.data.statusCode === 500) {
          window.$message.error(submitsubBoardListFail)
        }
      })

      var account = getCookie('Account')
      const userInput: IUserInputInquiryBarcode = {
        InputList: payload,
        Operator: account,
        InputSubList: subPayload
      }
      userInputUpdateList(userInput).then(() => {
        console.log('user input work order add log', userInput)
      })
    }

    /**
     * 載入子板資料列表
     */
    function loadSubList() {
      getAllDefaultSubBoardList().then((response) => {
        console.log('getAllDefaultSubBoardList response.data.payload', response.data.payload)
        let countNum = 1
        let dataList: IDefaultSubKey[] = response.data.payload
        dataList.forEach((element) => {
          element.key = countNum
          countNum++
        })
        keyInSubList.value = response.data.payload
      })
    }

    /**
     * 重新綁訂Inquery輸入的載入條碼
     */
    async function bundleInquiryBarcode() {
      const first = await getWorOrderList()
      console.log(first)

      const second = await getInquiryBarcode()
      console.log(second)
    }

    /**
     * 取得Inquery輸入的載入條碼
     */
    function getInquiryBarcode() {
      return new Promise((resolve, reject) => {
        const payloadTop: IName = {
          Name: 'Topbarcode'
        }

        getVaule(payloadTop).then((response) => {
          const data: IInquiryBarcode = response.data.payload
          console.log('getVaule data top', data)
          workOrderFormData.value.Topbarcodetitle = data.value
        })

        const payloadBottom: IName = {
          Name: 'Bottombarcode'
        }

        getVaule(payloadBottom).then((response) => {
          const data: IInquiryBarcode = response.data.payload
          workOrderFormData.value.Bottombarcodetitle = data.value
        })

        resolve('getInquiryBarcode finished')
      })
    }

    const submitWorkOrderSuccess = renderLanguage('SubmitWorkOrderSuccess')
    const submitWorkOrderFail = renderLanguage('SubmitWorkOrderFail')
    const submitsubBoardListSuccess = renderLanguage('SubmitsubBoardListSuccess')
    const submitsubBoardListFail = renderLanguage('SubmitsubBoardListFail')

    onMounted(() => {
      setFailedBoardDropDownList()
      setFlippedBoardDropDownList()
      setBarcodeTypeDropDownList()
      setSubBoardStatusDropDownList()

      setkeyInSubColumns()
      loadSubList()
      bundleInquiryBarcode()
    })

    return {
      showModalValue,

      failedBoardDropDownList,
      setFailedBoardDropDownList,

      flippedBoardDropDownList,
      setFlippedBoardDropDownList,

      barcodeTypeDropDownList,
      setBarcodeTypeDropDownList,

      subBoardStatusDropDownList,
      setSubBoardStatusDropDownList,

      workOrderFormData,
      getWorOrderList,
      bundleInquiryBarcode,
      getInquiryBarcode,

      versionNumber,
      getVersionNumber,

      keyInSubColumnList,
      keyInSubList,
      pagination,
      setkeyInSubColumns,
      checkedSubList,
      handleCheck,
      addNewSub,
      removeFromSubList,
      submit
    }
  }
})
</script>
