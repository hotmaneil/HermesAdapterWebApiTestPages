<template>
  <n-button type="info" ghost @click="SaveButtonClickByAsync" v-if="isEnableSaveBtn">
    {{ $t('Save') }}
  </n-button>

  <n-spin size="large" :show="isShowLoading">
    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <n-card title="">
          <n-form ref="formMain">
            <n-form-item path="WorkOrderData" :label="$t('Settings.WorkOrderData')">
              <n-radio-group
                name="radiogroupWorkOrderData"
                v-model:value="workOrderFormData.WorkOrderData"
              >
                <n-radio-button value="0"> {{ $t('Settings.Inquire') }} </n-radio-button>
                <n-radio-button value="1"> {{ $t('Settings.ManualKeyin') }} </n-radio-button>
              </n-radio-group>

              <n-tag type="warning">{{ $t('Settings.WorkOrderDataWarnMsg') }}</n-tag>
            </n-form-item>

            <n-form-item path="QWINoData" :label="$t('Settings.NoDataAction')">
              <n-radio-group name="radiogroupQWINoData" v-model:value="workOrderFormData.QWINoData">
                <n-radio-button value="0"> {{ $t('Settings.StopAndWait') }} </n-radio-button>
                <n-radio-button value="1"> {{ $t('Settings.CreateNewProfile') }} </n-radio-button>
              </n-radio-group>

              <n-tag type="warning">{{ $t('Settings.QWINoDataWarnMsg') }}</n-tag>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>

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
              <n-select
                v-model:value="workOrderFormData.Topbarcodetype"
                :options="barcodeTypeDropDownList"
              />
            </n-form-item>

            <n-form-item path="Bottombarcodetitle" label="BottomBarCode">
              <n-input
                v-model:value="workOrderFormData.Bottombarcodetitle"
                @keydown.enter.prevent
              />
              <n-select
                v-model:value="workOrderFormData.Bottombarcodetype"
                :options="barcodeTypeDropDownList"
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

              <n-form-item-gi :span="12" path="ConveyorSpeed" :label="$t('Settings.ConveyorSpeed')">
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

            <n-form-item path="Action" :label="$t('Settings.Action')" v-if="versionNumber > 130">
              <n-input-number
                v-model:value="workOrderFormData.Action"
                @keydown.enter.prevent
                disabled
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :title="$t('Settings.SubBoards')">
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>{{ $t('Select') }}</th>
                <th>{{ $t('Postion') }}</th>
                <th>{{ $t('Barcode') }}</th>
                <th>{{ $t('Status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in defaultSubList" :key="item.key">
                <td>
                  <n-checkbox
                    v-model:checked="item.isChecked"
                    @update:checked="handleChecked(item)"
                  ></n-checkbox>
                </td>
                <td>{{ item.sB_POS }}</td>
                <td>
                  <n-input v-model:value="item.sB_BC" type="text" />
                </td>
                <td>
                  <n-select v-model:value="item.sB_ST" :options="subBoardStatusDropDownList" />
                </td>
              </tr>
            </tbody>
          </n-table>
          <n-button type="info" ghost @click="addNewDefaultSub"
            >{{ $t('Settings.AddSubBoard') }}
          </n-button>
          <n-button type="error" ghost @click="removeFromDefaultSubList">
            {{ $t('Settings.DeleteSubBoard') }}
          </n-button>
        </n-card>
      </n-gi>
    </n-grid>
  </n-spin>
  <n-button type="info" ghost @click="SaveButtonClickByAsync" v-if="isEnableSaveBtn">
    {{ $t('Save') }}
  </n-button>
</template>

<!-- Options 選項式寫法-->

<script lang="ts">
import { defineComponent } from 'vue'
import type { IWorkOrderFormColumn } from '@/Interface/Setting/IWorkOrderFormColumn'
import type { DropDownList } from '@/types/DropDownList'
import { getCookie } from 'typescript-cookie'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import {
  getSettingList,
  updateSettingByList,
  getDefaultSubBoardListWithLang,
  updateDefaultSubBoardList
} from '@/api/Setting'
import type IMvcSetting from '@/Interface/IMvcSetting'
import type { UpdateParam } from '@/types/Setting/UpdateParam'
import type IDefaultSubKey from '@/Interface/Setting/IDefaultSubKey'
import type ISubBoardView from '@/Interface/Setting/ISubBoardView'
import type { Pagination } from '@/types/Pagination'
import {
  renderLanguage,
  returnStringValueFromSource,
  returnIntValueFromSource,
  returnFloatValueFromSource
} from '@/utils/Common'
import type { DataTableColumns, DataTableRowKey } from 'naive-ui'
import { mapState } from 'pinia'
import { AccessControlList } from '@/stores/accessControlList'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import type { UpdateParamUser } from '@/types/Setting/UpdateParamUser'
import { getOptionWordDetailList } from '@/api/OptionWord'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'

export default defineComponent({
  inject: ['renewLang'],
  computed: {
    ...mapState(AccessControlList, ['storeAccessControlList'])
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

      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail'),

      /**
       * 預設子板資料之欄位
       */
      defaultSubColumnList: [] as DataTableColumns<IDefaultSubKey>,

      /**
       * 預設子板資料列表
       */
      defaultSubList: [] as ISubBoardView[],

      pagination: {
        page: 1,
        pageSize: 10
      } as Pagination,

      /** 子板狀態下拉選單 */
      subBoardStatusDropDownList: [] as DropDownList[],

      /** 已勾選的子板資料清單 */
      checkedDefaultSubList: [] as DataTableRowKey[],

      /** 是否顯示載入中 */
      isShowLoading: false,

      /** 版本號碼 */
      versionNumber: 150 as number,

      /** 是否啟用儲存按鈕 */
      isEnableSaveBtn: false,

      /** WindowsService忙碌訊息 */
      windowsServiceBusyMessage: renderLanguage('WindowsServiceBusy')
    }
  },

  created() {
    this.setFailedBoardDropDownList()
    this.setFlippedBoardDropDownList()
    this.setBarcodeTypeDropDownList()
    this.setSubBoardStatusDropDownList()
  },

  mounted() {
    this.GetWorOrderList()
    this.SetDefaultSubColumns()
    this.LoadDefaultSubList()

    this.getVersionNumber()
    this.getAccessControl()
  },

  methods: {
    /** 取得存取權限 */
    getAccessControl() {
      const vm = this
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        vm.storeAccessControlList.forEach((element) => {
          if (element.functionCode === 'WorkOrder' && element.functionActionName === 'Modify') {
            vm.isEnableSaveBtn = true
          }
        })
      }
    },

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
    GetWorOrderList() {
      const payload: SettingSearch = {
        Group: 'Hermes',
        Type: 'Recipe',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload

        vm.workOrderFormData.WorkOrderData = returnStringValueFromSource(
          dataList,
          'Recipe',
          'WorkOrderData'
        )

        vm.workOrderFormData.QWINoData = returnStringValueFromSource(
          dataList,
          'Recipe',
          'QWINoData'
        )

        vm.workOrderFormData.WorkOrderID = returnStringValueFromSource(
          dataList,
          'Recipe',
          'WorkOrderID'
        )

        vm.workOrderFormData.BatchID = returnStringValueFromSource(dataList, 'Recipe', 'BatchID')

        vm.workOrderFormData.FailedBoard = returnIntValueFromSource(
          dataList,
          'Recipe',
          'FailedBoard'
        )

        vm.workOrderFormData.ProductTypeID = returnStringValueFromSource(
          dataList,
          'Recipe',
          'ProductTypeID'
        )

        vm.workOrderFormData.FlippedBoard = returnIntValueFromSource(
          dataList,
          'Recipe',
          'FlippedBoard'
        )

        vm.workOrderFormData.Topbarcodetitle = returnStringValueFromSource(
          dataList,
          'Recipe',
          'Topbarcodetitle'
        )

        vm.workOrderFormData.Bottombarcodetitle = returnStringValueFromSource(
          dataList,
          'Recipe',
          'Bottombarcodetitle'
        )

        vm.workOrderFormData.Topbarcodetype = returnIntValueFromSource(
          dataList,
          'Recipe',
          'Topbarcodetype'
        )

        vm.workOrderFormData.Bottombarcodetype = returnIntValueFromSource(
          dataList,
          'Recipe',
          'Bottombarcodetype'
        )

        vm.workOrderFormData.Length = returnFloatValueFromSource(dataList, 'Recipe', 'Length')
        vm.workOrderFormData.Width = returnFloatValueFromSource(dataList, 'Recipe', 'Width')
        vm.workOrderFormData.Thickness = returnFloatValueFromSource(dataList, 'Recipe', 'Thickness')

        vm.workOrderFormData.ConveyorSpeed = returnFloatValueFromSource(
          dataList,
          'Recipe',
          'ConveyorSpeed'
        )

        vm.workOrderFormData.TopClearanceHeight = returnFloatValueFromSource(
          dataList,
          'Recipe',
          'TopClearanceHeight'
        )

        vm.workOrderFormData.BottomClearanceHeight = returnFloatValueFromSource(
          dataList,
          'Recipe',
          'BottomClearanceHeight'
        )

        vm.workOrderFormData.Weight = returnFloatValueFromSource(dataList, 'Recipe', 'Weight')
        vm.workOrderFormData.Route = returnIntValueFromSource(dataList, 'Recipe', 'Route')
        vm.workOrderFormData.Action = returnIntValueFromSource(dataList, 'Recipe', 'Action')
      })
    },

    /**
     * 完成載入
     */
    finishLoading() {
      var vm = this
      setTimeout(() => {
        vm.isShowLoading = false
      }, 1000)
    },

    /**
     * 更新工單資訊
     */
    updateWorkInfo() {
      return new Promise((resolve, reject) => {
        const vm = this

        let updateList: UpdateParam[] = []

        let workOrderData: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'WorkOrderData',
          Value: vm.workOrderFormData.WorkOrderData
        }
        updateList.push(workOrderData)

        let qWINoData: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'QWINoData',
          Value: vm.workOrderFormData.QWINoData
        }
        updateList.push(qWINoData)

        let workOrderID: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'WorkOrderID',
          Value: vm.workOrderFormData.WorkOrderID
        }
        updateList.push(workOrderID)

        let batchID: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'BatchID',
          Value: vm.workOrderFormData.BatchID
        }
        updateList.push(batchID)

        let failedBoard: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'FailedBoard',
          Value: vm.workOrderFormData.FailedBoard.toString()
        }
        updateList.push(failedBoard)

        let productTypeID: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'ProductTypeID',
          Value: vm.workOrderFormData.ProductTypeID
        }
        updateList.push(productTypeID)

        let flippedBoard: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'FlippedBoard',
          Value: vm.workOrderFormData.FlippedBoard.toString()
        }
        updateList.push(flippedBoard)

        let topbarcodetitle: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Topbarcodetitle',
          Value: vm.workOrderFormData.Topbarcodetitle
        }
        updateList.push(topbarcodetitle)

        let bottombarcodetitle: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Bottombarcodetitle',
          Value: vm.workOrderFormData.Bottombarcodetitle
        }
        updateList.push(bottombarcodetitle)

        let topbarcodetype: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Topbarcodetype',
          Value: vm.workOrderFormData.Topbarcodetype.toString()
        }
        updateList.push(topbarcodetype)

        let bottombarcodetype: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Bottombarcodetype',
          Value: vm.workOrderFormData.Bottombarcodetype.toString()
        }
        updateList.push(bottombarcodetype)

        let length: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Length',
          Value: vm.workOrderFormData.Length.toString()
        }
        updateList.push(length)

        let width: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Width',
          Value: vm.workOrderFormData.Width.toString()
        }
        updateList.push(width)

        let thickness: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Thickness',
          Value: vm.workOrderFormData.Thickness.toString()
        }
        updateList.push(thickness)

        let conveyorSpeed: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'ConveyorSpeed',
          Value: vm.workOrderFormData.ConveyorSpeed.toString()
        }
        updateList.push(conveyorSpeed)

        let topClearanceHeight: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'TopClearanceHeight',
          Value: vm.workOrderFormData.TopClearanceHeight.toString()
        }
        updateList.push(topClearanceHeight)

        let bottomClearanceHeight: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'BottomClearanceHeight',
          Value: vm.workOrderFormData.BottomClearanceHeight.toString()
        }
        updateList.push(bottomClearanceHeight)

        let weight: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Weight',
          Value: vm.workOrderFormData.Weight.toString()
        }
        updateList.push(weight)

        let route: UpdateParam = {
          Group: 'Hermes',
          Type: 'Recipe',
          Name: 'Route',
          Value: vm.workOrderFormData.Route.toString()
        }
        updateList.push(route)

        var account = getCookie('Account')
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
    },

    /**
     * 更新所有預設子板列表
     */
    updateAllDefaultSubBoardList() {
      return new Promise((resolve, reject) => {
        var vm = this
        let payload: IDefaultSub[] = vm.defaultSubList
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
    },

    /**
     * 儲存按鈕事件使用await
     * @param e
     */
    async SaveButtonClickByAsync(e: MouseEvent) {
      e.preventDefault()

      const vm = this
      vm.isShowLoading = true

      await vm
        .updateWorkInfo()
        .then((first) => {
          console.log('first', first)
          return vm.updateAllDefaultSubBoardList()
        })
        .then((second) => {
          console.log('second', second)
          window.$message.success(vm.saveSuccess)
          vm.finishLoading()
        })
        .catch((fail) => {
          console.log('fail', fail)
          window.$message.error(vm.saveFail)
          vm.finishLoading()
        })
    },

    /**
     * 設定欄位
     */
    SetDefaultSubColumns() {
      var vm = this
      vm.defaultSubColumnList = [
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
          key: 'sB_BC'
        },

        {
          title: renderLanguage('Status'),
          key: 'sbStatusName'
        }
      ]
    },

    /**
     * 載入預設子板資料列表
     */
    LoadDefaultSubList() {
      var vm = this
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
          let dataList: ISubBoardView[] = response.data.payload
          dataList.forEach((element) => {
            element.key = countNum
            countNum++
          })
          vm.defaultSubList = response.data.payload
        })
      }
    },

    /**
     * 新增預設子板資料列
     */
    addNewDefaultSub() {
      var vm = this
      const addItem: ISubBoardView = {
        key: vm.defaultSubList.length + 1,
        sB_POS: vm.defaultSubList.length + 1,
        sB_BC: '',
        sB_ST: 0,
        isChecked: false,
        sbStatusName: ''
      }
      vm.defaultSubList.push(addItem)
    },

    /**
     * 勾選子板資料
     * @param value
     */
    handleChecked(value: ISubBoardView) {
      console.log('handleChecked', value)
      var vm = this

      if (value.isChecked) {
        vm.checkedDefaultSubList.push(value.key)
      } else {
        const index = vm.checkedDefaultSubList.findIndex((x) => x === value.key)
        console.log('index', index)
        if (index > -1) {
          vm.checkedDefaultSubList.splice(index, 1)
        }
      }
    },

    /**
     * 從預設子板資料列移除
     */
    removeFromDefaultSubList() {
      var vm = this
      vm.checkedDefaultSubList.forEach((removeItem) => {
        const index = vm.defaultSubList.findIndex((x) => x.key === removeItem)
        console.log('defaultSubList index', index)
        if (index > -1) {
          vm.defaultSubList.splice(index, 1)
        }

        //更改position number
        let countNum = 1
        vm.defaultSubList.forEach((element) => {
          element.sB_POS = countNum
          countNum++
        })
      })
    },

    /**
     * 取得版本號碼
     */
    getVersionNumber() {
      const vm = this
      let versionNumber = getCookie('VersionNumber')
      if (versionNumber === undefined) {
        vm.versionNumber = 150
      } else {
        vm.versionNumber = parseInt(versionNumber)
      }
    }
  }
})
</script>
