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

<!-- 
  Options 選項式寫法
  WorkOrder設定表單和跳出WorkOrder表單之對話框皆有兩個共同的function，因此抽出改以composition寫法改進
-->

<script lang="ts">
import type { PropType } from 'vue'
import { h, defineComponent } from 'vue'
import { getSettingList, getAllDefaultSubBoardList } from '@/api/Setting'
import { updateKeyInSubList, updateList, userInputUpdateList } from '@/api/InquiryBarcode'
import type { DropDownList } from '@/types/DropDownList'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import type IDefaultSubKey from '@/Interface/Setting/IDefaultSubKey'
import type { IWorkOrderFormColumn } from '@/Interface/Setting/IWorkOrderFormColumn'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type IMvcSetting from '@/Interface/IMvcSetting'
import type { Pagination } from '@/types/Pagination'
import { renderLanguage } from '@/utils/Common'
import { NInput, NSelect } from 'naive-ui'
import { getCookie } from 'typescript-cookie'
import { getOptionWordDetailList } from '@/api/OptionWord'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'

export default defineComponent({
  props: {
    showModal: {
      type: Boolean as PropType<Boolean>,
      required: true
    },
    renewLang: {
      type: String as PropType<String>,
      required: true
    }
  },

  computed: {
    showModalValue: {
      get() {
        return this.showModal
      },
      set(newValue: boolean) {
        this.$emit('update:showWorkOrderModal', newValue)
      }
    }
  },

  watch: {
    renewLang: {
      handler(val, oldVal) {
        console.log(`renewLang handler val: ${val},oldVal:${oldVal}`)
        this.setFailedBoardDropDownList()
        this.setFlippedBoardDropDownList()
        this.setBarcodeTypeDropDownList()
        this.setSubBoardStatusDropDownList()
      },
      deep: true
    }
  },

  data() {
    return {
      workOrderFormData: {} as IWorkOrderFormColumn,

      /** 板子判定狀況下拉炫單 */
      failedBoardDropDownList: [] as DropDownList[],

      /** 板子翻轉狀況下拉炫單 */
      flippedBoardDropDownList: [] as DropDownList[],

      /** Barcode 型態下拉炫單 */
      barcodeTypeDropDownList: [] as DropDownList[],

      /** 子板狀態下拉選單 */
      subBoardStatusDropDownList: [] as DropDownList[],

      /** 版本號碼 */
      versionNumber: 150 as number,

      /**
       * 輸入子板資料之欄位
       */
      keyInSubColumnList: [] as DataTableColumns<IDefaultSubKey>,

      /**
       * 輸入子板資料列表
       */
      keyInSubList: [] as IDefaultSubKey[],

      /** 已勾選的子板資料清單 */
      checkedSubList: [] as DataTableRowKey[],

      pagination: {
        page: 1,
        pageSize: 10
      } as Pagination,

      submitWorkOrderSuccess: renderLanguage('SubmitWorkOrderSuccess'),
      submitWorkOrderFail: renderLanguage('SubmitWorkOrderFail'),
      submitsubBoardListSuccess: renderLanguage('SubmitsubBoardListSuccess'),
      submitsubBoardListFail: renderLanguage('SubmitsubBoardListFail')
    }
  },

  created() {
    this.getWorOrderList()
    this.setkeyInSubColumns()
    this.loadSubList()

    this.setFailedBoardDropDownList()
    this.setFlippedBoardDropDownList()
    this.setBarcodeTypeDropDownList()
    this.setSubBoardStatusDropDownList()
  },

  methods: {
    /**
     * 建立板子判定狀況下拉選單
     */
    setFailedBoardDropDownList() {
      const vm = this
      vm.failedBoardDropDownList = []
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
            vm.failedBoardDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 建立板子翻轉狀況下拉選單
     */
    setFlippedBoardDropDownList() {
      const vm = this
      vm.flippedBoardDropDownList = []
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
            vm.flippedBoardDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 建立 Barcode 型態下拉選單
     */
    setBarcodeTypeDropDownList() {
      const vm = this
      vm.barcodeTypeDropDownList = []
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
            vm.barcodeTypeDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 建立子板狀態下拉選單
     */
    setSubBoardStatusDropDownList() {
      const vm = this
      const language = getCookie('Language')
      vm.subBoardStatusDropDownList = []

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
            vm.subBoardStatusDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 取得工單設定列表
     */
    getWorOrderList() {
      const payload: SettingSearch = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload

        const findWorkOrderData = dataList.find((x) => x.name === 'WorkOrderData')
        if (findWorkOrderData !== undefined) {
          vm.workOrderFormData.WorkOrderData = findWorkOrderData.value
        }

        const findQWINoData = dataList.find((x) => x.name === 'QWINoData')
        if (findQWINoData !== undefined) {
          vm.workOrderFormData.QWINoData = findQWINoData.value
        }

        const findWorkOrderID = dataList.find((x) => x.name === 'WorkOrderID')
        if (findWorkOrderID !== undefined) {
          vm.workOrderFormData.WorkOrderID = findWorkOrderID.value
        }

        const findBatchID = dataList.find((x) => x.name === 'BatchID')
        if (findBatchID !== undefined) {
          vm.workOrderFormData.BatchID = findBatchID.value
        }

        const findFailedBoard = dataList.find((x) => x.name === 'FailedBoard')
        if (findFailedBoard !== undefined) {
          vm.workOrderFormData.FailedBoard = parseInt(findFailedBoard.value)
        }

        const findProductTypeID = dataList.find((x) => x.name === 'ProductTypeID')
        if (findProductTypeID !== undefined) {
          vm.workOrderFormData.ProductTypeID = findProductTypeID.value
        }

        const findFlippedBoard = dataList.find((x) => x.name === 'FlippedBoard')
        if (findFlippedBoard !== undefined) {
          vm.workOrderFormData.FlippedBoard = parseInt(findFlippedBoard.value)
        }

        const findTopbarcodetitle = dataList.find((x) => x.name === 'Topbarcodetitle')
        if (findTopbarcodetitle !== undefined) {
          vm.workOrderFormData.Topbarcodetitle = findTopbarcodetitle.value
        }

        const findBottombarcodetitle = dataList.find((x) => x.name === 'Bottombarcodetitle')
        if (findBottombarcodetitle !== undefined) {
          vm.workOrderFormData.Bottombarcodetitle = findBottombarcodetitle.value
        }

        const findTopbarcodetype = dataList.find((x) => x.name === 'Topbarcodetype')
        if (findTopbarcodetype !== undefined) {
          vm.workOrderFormData.Topbarcodetype = parseInt(findTopbarcodetype.value)
        }

        const findBottombarcodetype = dataList.find((x) => x.name === 'Bottombarcodetype')
        if (findBottombarcodetype !== undefined) {
          vm.workOrderFormData.Bottombarcodetype = parseInt(findBottombarcodetype.value)
        }

        const findLength = dataList.find((x) => x.name === 'Length')
        if (findLength !== undefined) {
          vm.workOrderFormData.Length = parseFloat(findLength.value)
        }

        const findWidth = dataList.find((x) => x.name === 'Width')
        if (findWidth !== undefined) {
          vm.workOrderFormData.Width = parseFloat(findWidth.value)
        }

        const findThickness = dataList.find((x) => x.name === 'Thickness')
        if (findThickness !== undefined) {
          vm.workOrderFormData.Thickness = parseFloat(findThickness.value)
        }

        const findConveyorSpeed = dataList.find((x) => x.name === 'ConveyorSpeed')
        if (findConveyorSpeed !== undefined) {
          vm.workOrderFormData.ConveyorSpeed = parseFloat(findConveyorSpeed.value)
        }

        const findTopClearanceHeight = dataList.find((x) => x.name === 'TopClearanceHeight')
        if (findTopClearanceHeight !== undefined) {
          vm.workOrderFormData.TopClearanceHeight = parseFloat(findTopClearanceHeight.value)
        }

        const findBottomClearanceHeight = dataList.find((x) => x.name === 'BottomClearanceHeight')
        if (findBottomClearanceHeight !== undefined) {
          vm.workOrderFormData.BottomClearanceHeight = parseFloat(findBottomClearanceHeight.value)
        }

        const findWeight = dataList.find((x) => x.name === 'Weight')
        if (findWeight !== undefined) {
          vm.workOrderFormData.Weight = parseFloat(findWeight.value)
        }

        const findRoute = dataList.find((x) => x.name === 'Route')
        if (findRoute !== undefined) {
          vm.workOrderFormData.Route = parseInt(findRoute.value)
        }

        const findAction = dataList.find((x) => x.name === 'Action')
        if (findAction !== undefined) {
          vm.workOrderFormData.Action = parseInt(findAction.value)
        }
      })
    },

    /**
     * 設定欄位
     */
    setkeyInSubColumns() {
      var vm = this
      vm.keyInSubColumnList = [
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
                vm.keyInSubList[index].sB_BC = newValue
              }
            })
          }
        },
        {
          title: renderLanguage('Status'),
          key: 'sB_ST',
          render(row, index) {
            return h(NSelect, {
              options: vm.subBoardStatusDropDownList,
              value: row.sB_ST,
              onUpdateValue(newValue) {
                vm.keyInSubList[index].sB_ST = newValue
              }
            })
          }
        }
      ]
    },

    /**
     * 勾選子板資料
     */
    handleCheck(rowKeys: DataTableRowKey[]) {
      console.log('handleCheck rowKeys', rowKeys)
      var vm = this
      vm.checkedSubList = rowKeys
    },

    /**
     * 新增子板資料列
     */
    addNewSub() {
      var vm = this
      const addItem: IDefaultSubKey = {
        key: vm.keyInSubList.length + 1,
        sB_POS: vm.keyInSubList.length + 1,
        sB_BC: '',
        sB_ST: 0
      }
      vm.keyInSubList.push(addItem)
    },

    /**
     * 從子板資料列移除
     */
    removeFromSubList() {
      var vm = this
      vm.checkedSubList.forEach((removeItem) => {
        const findItem = vm.keyInSubList.find((x) => x.key === removeItem)
        console.log('findItem', findItem)
        if (findItem !== undefined) {
          vm.keyInSubList.splice(findItem.key - 1, 1)
        }

        //更改position number
        let countNum = 1
        vm.keyInSubList.forEach((element) => {
          element.sB_POS = countNum
          countNum++
        })
      })
    },

    /**
     * 提交
     */
    submit() {
      var vm = this
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
          Name: 'WorkOrderID',
          Value: vm.workOrderFormData.WorkOrderID
        },
        {
          Name: 'BatchID',
          Value: vm.workOrderFormData.BatchID
        },
        {
          Name: 'FailedBoard',
          Value: vm.workOrderFormData.FailedBoard.toString()
        },
        {
          Name: 'ProductTypeID',
          Value: vm.workOrderFormData.ProductTypeID
        },
        {
          Name: 'FlippedBoard',
          Value: vm.workOrderFormData.FlippedBoard.toString()
        },
        {
          Name: 'Length',
          Value: vm.workOrderFormData.Length.toString()
        },
        {
          Name: 'Width',
          Value: vm.workOrderFormData.Width.toString()
        },
        {
          Name: 'Thickness',
          Value: vm.workOrderFormData.Thickness.toString()
        },
        {
          Name: 'ConveyorSpeed',
          Value: vm.workOrderFormData.ConveyorSpeed.toString()
        },
        {
          Name: 'TopClearanceHeight',
          Value: vm.workOrderFormData.TopClearanceHeight.toString()
        },
        {
          Name: 'BottomClearanceHeight',
          Value: vm.workOrderFormData.BottomClearanceHeight.toString()
        },
        {
          Name: 'Weight',
          Value: vm.workOrderFormData.Weight.toString()
        },
        {
          Name: 'Route',
          Value: vm.workOrderFormData.Route.toString()
        }
      ]

      updateList(payload).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.submitWorkOrderSuccess)
          this.$emit('finishSubmitWorkOrder')
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.submitWorkOrderFail)
        }
      })

      let subPayload: IDefaultSub[] = vm.keyInSubList
      updateKeyInSubList(subPayload).then((subResponse) => {
        if (subResponse.data.statusCode === 200) {
          window.$message.success(vm.submitsubBoardListSuccess)
          vm.showModalValue = false
        } else if (subResponse.data.statusCode === 500) {
          window.$message.error(vm.submitsubBoardListFail)
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
    },

    /**
     * 載入子板資料列表
     */
    loadSubList() {
      var vm = this

      getAllDefaultSubBoardList().then((response) => {
        console.log('getAllDefaultSubBoardList response.data.payload', response.data.payload)
        let countNum = 1
        let dataList: IDefaultSubKey[] = response.data.payload
        dataList.forEach((element) => {
          element.key = countNum
          countNum++
        })
        vm.keyInSubList = response.data.payload
      })
    }
  }
})
</script>
