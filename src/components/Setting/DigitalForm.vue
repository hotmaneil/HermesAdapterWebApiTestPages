<template>
  <n-spin size="large" :show="isShowLoading">
    <n-button type="info" ghost @Click="saveDigitalSettingList()" v-if="isEnableSaveBtn">
      {{ $t('Save') }}
    </n-button>

    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-card :title="$t('Settings.Input')">
          <n-form ref="inputForm" :model="inputFormData">
            <n-grid :span="24" :x-gap="24">
              <n-form-item-gi :span="24" path="" label="0">
                <n-select
                  v-model:value="inputFormData.InOutput_0"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input0')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_0"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="1">
                <n-select
                  v-model:value="inputFormData.InOutput_1"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input1')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_1"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="2">
                <n-select
                  v-model:value="inputFormData.InOutput_2"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input2')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_2"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="3">
                <n-select
                  v-model:value="inputFormData.InOutput_3"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input3')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_3"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="4">
                <n-select
                  v-model:value="inputFormData.InOutput_4"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input4')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_4"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="5">
                <n-select
                  v-model:value="inputFormData.InOutput_5"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input5')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_5"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="6">
                <n-select
                  v-model:value="inputFormData.InOutput_6"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input6')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_6"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="7">
                <n-select
                  v-model:value="inputFormData.InOutput_7"
                  :options="digitalInputDropDownList"
                  @change="commonSelectedInputChange($event, 'Input7')"
                />
                <n-select
                  v-model:value="inputFormData.InOutput_ePtntl_7"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :title="$t('Settings.Output')">
          <n-form ref="outputForm" :model="outputFormData">
            <n-grid :span="24" :x-gap="24">
              <n-form-item-gi :span="24" path="" label="0">
                <n-select
                  v-model:value="outputFormData.InOutput_0"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input0')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_0"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="1">
                <n-select
                  v-model:value="outputFormData.InOutput_1"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input1')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_1"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="2">
                <n-select
                  v-model:value="outputFormData.InOutput_2"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input2')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_2"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="3">
                <n-select
                  v-model:value="outputFormData.InOutput_3"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input3')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_3"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="4">
                <n-select
                  v-model:value="outputFormData.InOutput_4"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input4')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_4"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="5">
                <n-select
                  v-model:value="outputFormData.InOutput_5"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input5')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_5"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="6">
                <n-select
                  v-model:value="outputFormData.InOutput_6"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input6')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_6"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>

              <n-form-item-gi :span="24" path="" label="7">
                <n-select
                  v-model:value="outputFormData.InOutput_7"
                  :options="digitalOutputDropDownList"
                  @change="commonSelectedOutputChange($event, 'Input7')"
                />
                <n-select
                  v-model:value="outputFormData.InOutput_ePtntl_7"
                  :options="potentialDropDownList"
                />
              </n-form-item-gi>
            </n-grid>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
    <n-button type="info" ghost @click="saveDigitalSettingList()" v-if="isEnableSaveBtn">
      {{ $t('Save') }}
    </n-button>
  </n-spin>
</template>

<script lang="ts">
import type IMvcSetting from '@/Interface/IMvcSetting'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'
import type { IInOutputFormColumn } from '@/Interface/Setting/IInOutputFormColumn'
import { getOptionWordDetailList } from '@/api/OptionWord'
import { getSettingList, updateSettingByList } from '@/api/Setting'
import type { DropDownDisableList } from '@/types/DropDownDisableList'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import { getCookie } from 'typescript-cookie'
import { defineComponent } from 'vue'
import type { UpdateParam } from '@/types/Setting/UpdateParam'
import { renderLanguage, updateAlwaysRead } from '@/utils/Common'
import { mapState } from 'pinia'
import { AccessControlList } from '@/stores/accessControlList'
import type { UpdateParamUser } from '@/types/Setting/UpdateParamUser'
import { AlwaysReadParamEnum } from '@/Enum/enums'
import { readAlwaysReadValue } from '@/api/AlwaysRead'
import moment from 'moment'

export default defineComponent({
  inject: ['renewLang'],
  computed: {
    ...mapState(AccessControlList, ['storeAccessControlList'])
  },
  watch: {
    renewLang: {
      handler(val, oldVal) {
        console.log(`renewLang handler val: ${val},oldVal:${oldVal}`)
        this.setPotentialDropDownList()
        this.getDropDownListAndGetDataToRefresh()
      },
      deep: true
    }
  },
  data() {
    return {
      /** Digital Input */
      inputFormData: {} as IInOutputFormColumn,

      /** Digital Output */
      outputFormData: {} as IInOutputFormColumn,

      /** Digital Input下拉選單 */
      digitalInputDropDownList: [] as DropDownDisableList[],

      /** Digital Output下拉選單 */
      digitalOutputDropDownList: [] as DropDownDisableList[],

      /** 電位下拉選單 */
      potentialDropDownList: [] as DropDownDisableList[],

      /** 已選取的Digital Input之陣列 */
      alreadySelecteInputValueList: [] as number[],

      /** 已選取的Digital Output之陣列 */
      alreadySelectedOutputValueList: [] as number[],

      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail'),

      /** 是否啟用儲存按鈕 */
      isEnableSaveBtn: false,

      /** 是否顯示載入中 */
      isShowLoading: false,

      /** WindowsService忙碌訊息 */
      windowsServiceBusyMessage: renderLanguage('WindowsServiceBusy')
    }
  },

  created() {
    this.setPotentialDropDownList()
    this.getDropDownListAndGetDataToRefresh()
  },

  mounted() {
    this.getAccessControl()
  },

  methods: {
    /**
     * 依序取得下拉選單與資料並更新下拉選單
     */
    async getDropDownListAndGetDataToRefresh() {
      var vm = this

      const digitalInputList = await vm.setDigitalInputDropDownList()
      console.log(digitalInputList)

      const digitalOutputList = await vm.setDigitalOutputDropDownList()
      console.log(digitalOutputList)

      const inputOutputList = await vm.getInputOutputList()
      console.log(inputOutputList)

      const refreshDigitalInputList = await vm.refreshDigitalInputDropDownList()
      console.log(refreshDigitalInputList)

      const refreshDigitalOutputList = await vm.refreshDigitalOutputDropDownList()
      console.log(refreshDigitalOutputList)
    },

    /** 取得存取權限 */
    getAccessControl() {
      const vm = this
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        vm.storeAccessControlList.forEach((element) => {
          if (element.functionCode === 'DigitalIO' && element.functionActionName === 'Modify') {
            vm.isEnableSaveBtn = true
          }
        })
      }
    },

    /**
     * 建立 Digital Input下拉選單
     */
    setDigitalInputDropDownList() {
      return new Promise((resolve, reject) => {
        const vm = this
        vm.digitalInputDropDownList = []
        const language = getCookie('Language')

        if (language !== undefined) {
          const payload: OptionWordSearch = {
            OptionWordId: undefined,
            OptionWordName: 'DigitalInput',
            Language: language
          }

          getOptionWordDetailList(payload).then((response) => {
            if (response.status === 200) {
              const dataList: IOptionWordDetail[] = response.data

              dataList.forEach((element) => {
                let option: DropDownDisableList = {
                  label: element.languageContext,
                  value: parseInt(element.value),
                  disabled: false
                }
                vm.digitalInputDropDownList.push(option)
              })

              var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss')
              const msg = `getOptionWordDetailList(DigitalInput) success,time:${returnTime}`
              resolve(msg)
            } else if (response.status === 500) {
              const msg = 'getOptionWordDetailList(DigitalInput) fail'
              reject(msg)
            }
          })
        }
      })
    },

    /**
     * 建立 Digital Output下拉選單
     */
    setDigitalOutputDropDownList() {
      return new Promise((resolve, reject) => {
        const vm = this
        vm.digitalOutputDropDownList = []
        const language = getCookie('Language')

        if (language !== undefined) {
          const payload: OptionWordSearch = {
            OptionWordId: undefined,
            OptionWordName: 'DigitalOutput',
            Language: language
          }

          getOptionWordDetailList(payload).then((response) => {
            if (response.status === 200) {
              const dataList: IOptionWordDetail[] = response.data

              dataList.forEach((element) => {
                let option: DropDownDisableList = {
                  label: element.languageContext,
                  value: parseInt(element.value),
                  disabled: false
                }
                vm.digitalOutputDropDownList.push(option)
              })

              var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss')
              const msg = `getOptionWordDetailList(DigitalOutput) success,time:${returnTime}`
              resolve(msg)
            } else if (response.status === 500) {
              const msg = 'getOptionWordDetailList(DigitalOutput) fail'
              reject(msg)
            }
          })
        }
      })
    },

    /**
     * 建立電位下拉選單
     */
    setPotentialDropDownList() {
      const vm = this
      vm.potentialDropDownList = []
      const language = getCookie('Language')

      if (language !== undefined) {
        const payload: OptionWordSearch = {
          OptionWordId: undefined,
          OptionWordName: 'Potential',
          Language: language
        }
        getOptionWordDetailList(payload).then((response) => {
          const dataList: IOptionWordDetail[] = response.data

          dataList.forEach((element) => {
            let option: DropDownDisableList = {
              label: element.languageContext,
              value: parseInt(element.value),
              disabled: false
            }
            vm.potentialDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 取得輸入輸出之表單資料
     */
    getInputOutputList() {
      return new Promise((resolve, reject) => {
        const payload: SettingSearch = {
          Group: 'Digital',
          Type: '',
          Name: ''
        }

        getSettingList(payload)
          .then((response) => {
            if (response.data.statusCode === 200) {
              const vm = this
              const dataList: IMvcSetting[] = response.data.payload

              /**
               * Input
               */
              vm.inputFormData.InOutput_0 = vm.findToSetValue(dataList, 'Input', '0')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_0)
              vm.inputFormData.InOutput_ePtntl_0 = vm.findToSetValue(dataList, 'Input_ePtntl', '0')

              vm.inputFormData.InOutput_1 = vm.findToSetValue(dataList, 'Input', '1')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_1)
              vm.inputFormData.InOutput_ePtntl_1 = vm.findToSetValue(dataList, 'Input_ePtntl', '1')

              vm.inputFormData.InOutput_2 = vm.findToSetValue(dataList, 'Input', '2')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_2)
              vm.inputFormData.InOutput_ePtntl_2 = vm.findToSetValue(dataList, 'Input_ePtntl', '2')

              vm.inputFormData.InOutput_3 = vm.findToSetValue(dataList, 'Input', '3')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_3)
              vm.inputFormData.InOutput_ePtntl_3 = vm.findToSetValue(dataList, 'Input_ePtntl', '3')

              vm.inputFormData.InOutput_4 = vm.findToSetValue(dataList, 'Input', '4')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_4)
              vm.inputFormData.InOutput_ePtntl_4 = vm.findToSetValue(dataList, 'Input_ePtntl', '4')

              vm.inputFormData.InOutput_5 = vm.findToSetValue(dataList, 'Input', '5')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_5)
              vm.inputFormData.InOutput_ePtntl_5 = vm.findToSetValue(dataList, 'Input_ePtntl', '5')

              vm.inputFormData.InOutput_6 = vm.findToSetValue(dataList, 'Input', '6')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_6)
              vm.inputFormData.InOutput_ePtntl_6 = vm.findToSetValue(dataList, 'Input_ePtntl', '6')

              vm.inputFormData.InOutput_7 = vm.findToSetValue(dataList, 'Input', '7')
              vm.addAlreadySelectedInputValueList(vm.inputFormData.InOutput_7)
              vm.inputFormData.InOutput_ePtntl_7 = vm.findToSetValue(dataList, 'Input_ePtntl', '7')

              /**
               * Output
               */
              vm.outputFormData.InOutput_0 = vm.findToSetValue(dataList, 'Output', '0')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_0)
              vm.outputFormData.InOutput_ePtntl_0 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '0'
              )

              vm.outputFormData.InOutput_1 = vm.findToSetValue(dataList, 'Output', '1')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_1)
              vm.outputFormData.InOutput_ePtntl_1 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '1'
              )

              vm.outputFormData.InOutput_2 = vm.findToSetValue(dataList, 'Output', '2')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_2)
              vm.outputFormData.InOutput_ePtntl_2 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '2'
              )

              vm.outputFormData.InOutput_3 = vm.findToSetValue(dataList, 'Output', '3')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_3)
              vm.outputFormData.InOutput_ePtntl_3 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '3'
              )

              vm.outputFormData.InOutput_4 = vm.findToSetValue(dataList, 'Output', '4')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_4)
              vm.outputFormData.InOutput_ePtntl_4 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '4'
              )

              vm.outputFormData.InOutput_5 = vm.findToSetValue(dataList, 'Output', '5')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_5)
              vm.outputFormData.InOutput_ePtntl_5 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '5'
              )

              vm.outputFormData.InOutput_6 = vm.findToSetValue(dataList, 'Output', '6')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_6)
              vm.outputFormData.InOutput_ePtntl_6 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '6'
              )

              vm.outputFormData.InOutput_7 = vm.findToSetValue(dataList, 'Output', '7')
              vm.addAlreadySelectedOutputValueList(vm.outputFormData.InOutput_7)
              vm.outputFormData.InOutput_ePtntl_7 = vm.findToSetValue(
                dataList,
                'Output_ePtntl',
                '7'
              )

              var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss')
              const msg = `getInputOutputList success,time:${returnTime}`
              resolve(msg)
            } else if (response.data.statusCode === 500) {
              const msg = 'getInputOutputList fail'
              reject(msg)
            }
          })
          .catch((error: object) => {
            console.log('getSettingList error', error)
          })
      })
    },

    /**
     * 更新 Digital Input下拉選單
     */
    refreshDigitalInputDropDownList() {
      return new Promise((resolve, reject) => {
        try {
          const vm = this
          vm.digitalInputDropDownList.forEach((element) => {
            var findIndex = vm.alreadySelecteInputValueList.find((x) => x === element.value)
            if (findIndex !== undefined && findIndex > -1) {
              element.disabled = true
            }
          })

          var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss')
          resolve(`refreshDigitalInputDropDownList,time:${returnTime}`)
        } catch (ex) {
          reject(`refreshDigitalInputDropDownList ex:${ex}`)
        }
      })
    },

    /**
     * 更新 Digital Output下拉選單
     */
    refreshDigitalOutputDropDownList() {
      return new Promise((resolve, reject) => {
        try {
          const vm = this
          vm.digitalOutputDropDownList.forEach((element) => {
            var findIndex = vm.alreadySelectedOutputValueList.find((x) => x === element.value)
            if (findIndex !== undefined && findIndex > -1) {
              element.disabled = true
            }
          })

          var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss')
          resolve(`refreshDigitalOutputDropDownList,time:${returnTime}`)
        } catch (ex) {
          reject(`refreshDigitalOutputDropDownList ex:${ex}`)
        }
      })
    },

    /**
     * 找出並設值
     * @param dataList
     * @param type
     * @param name
     */
    findToSetValue(dataList: IMvcSetting[], type: string, name: string) {
      let getValue: number = 0
      const findFromList = dataList.find((x) => x.type === type && x.name === name)
      if (findFromList !== undefined) {
        getValue = parseInt(findFromList.value)
      }
      return getValue
    },

    /**
     * Digital Input
     */

    /**
     * 加入已選取的Digital Input之陣列
     */
    addAlreadySelectedInputValueList(value: number) {
      const vm = this
      var isExist = vm.alreadySelecteInputValueList.includes(value)
      if (!isExist && value !== 99) vm.alreadySelecteInputValueList.push(value)
    },

    /**
     * 共用Input下拉選擇變更
     * @param selectedNewValue
     * @param column
     */
    commonSelectedInputChange(selectedNewValue: number, column: string) {
      const vm = this

      if (selectedNewValue !== undefined || selectedNewValue !== null) {
        switch (column) {
          case 'Input0':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_0)
            break
          case 'Input1':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_1)
            break
          case 'Input2':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_2)
            break
          case 'Input3':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_3)
            break
          case 'Input4':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_4)
            break
          case 'Input5':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_5)
            break
          case 'Input6':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_6)
            break
          case 'Input7':
            vm.findExistInputAndRemove(vm.inputFormData.InOutput_7)
            break
        }

        if (selectedNewValue === 99) {
          console.log('不做動作')
        } else {
          var find = vm.alreadySelecteInputValueList.find((x) => x === selectedNewValue)
          if (find === undefined) {
            vm.alreadySelecteInputValueList.push(selectedNewValue)
            vm.digitalInputDropDownListChange(selectedNewValue, true)
          }
        }
      }
    },

    /**
     * 尋找存在Input值並移除
     * @param OldValue
     */
    findExistInputAndRemove(OldValue: number | null) {
      const vm = this
      if (OldValue !== null) {
        var findExist = vm.alreadySelecteInputValueList.find((x) => x === OldValue)
        if (findExist !== undefined) {
          const findIndex = vm.alreadySelecteInputValueList.findIndex((y) => y === OldValue)

          if (findIndex !== undefined) {
            vm.alreadySelecteInputValueList.splice(findIndex, 1)
          }
          vm.digitalInputDropDownListChange(OldValue, false)
        }
      }
    },

    /**
     * Digital Input下拉選單變更
     */
    digitalInputDropDownListChange(SelectedValue: number, disabled: boolean) {
      const vm = this
      vm.digitalInputDropDownList.forEach((element) => {
        if (SelectedValue === element.value) {
          element.disabled = disabled
        }
      })
    },

    /**
     * Digital Output
     */

    /**
     * 加入已選取的Digital Output之陣列
     * @param value
     */
    addAlreadySelectedOutputValueList(value: number) {
      const vm = this
      var isExist = vm.alreadySelectedOutputValueList.includes(value)
      if (!isExist && value !== 99) vm.alreadySelectedOutputValueList.push(value)
    },

    /**
     * 共用Output下拉選擇變更
     * @param selectedNewValue
     * @param column
     */
    commonSelectedOutputChange(selectedNewValue: number, column: string) {
      const vm = this

      if (selectedNewValue !== undefined || selectedNewValue !== null) {
        switch (column) {
          case 'Input0':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_0)
            break
          case 'Input1':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_1)
            break
          case 'Input2':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_2)
            break
          case 'Input3':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_3)
            break
          case 'Input4':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_4)
            break
          case 'Input5':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_5)
            break
          case 'Input6':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_6)
            break
          case 'Input7':
            vm.findExistOutputAndRemove(vm.outputFormData.InOutput_7)
            break
        }

        if (selectedNewValue === 99) {
          console.log('不做動作')
        } else {
          var find = vm.alreadySelectedOutputValueList.find((x) => x === selectedNewValue)
          if (find === undefined) {
            vm.alreadySelectedOutputValueList.push(selectedNewValue)
            vm.digitalOutputDropDownListChange(selectedNewValue, true)
          }
        }
      }
    },

    /**
     * 尋找存在Out值並移除
     * @param OldValue
     */
    findExistOutputAndRemove(OldValue: number | null) {
      const vm = this
      if (OldValue !== null) {
        var findExist = vm.alreadySelectedOutputValueList.find((x) => x === OldValue)
        if (findExist !== undefined) {
          const findIndex = vm.alreadySelectedOutputValueList.findIndex((y) => y === OldValue)

          if (findIndex !== undefined) {
            vm.alreadySelectedOutputValueList.splice(findIndex, 1)
          }
          vm.digitalOutputDropDownListChange(OldValue, false)
        }
      }
    },

    /**
     * Digital Output下拉選單變更
     */
    digitalOutputDropDownListChange(SelectedValue: number, disabled: boolean) {
      const vm = this
      vm.digitalOutputDropDownList.forEach((element) => {
        if (SelectedValue === element.value) {
          element.disabled = disabled
        }
      })
    },

    /**
     * 儲存Digital設定列表
     */
    saveDigitalSettingList() {
      let updateList: UpdateParam[] = []

      const vm = this
      vm.isShowLoading = true

      /**
       * Input
       */

      let input0: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '0',
        Value: vm.inputFormData.InOutput_0.toString()
      }
      updateList.push(input0)

      let input_ePtntl_0: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '0',
        Value: vm.inputFormData.InOutput_ePtntl_0.toString()
      }
      updateList.push(input_ePtntl_0)

      let input1: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '1',
        Value: vm.inputFormData.InOutput_1.toString()
      }
      updateList.push(input1)

      let input_ePtntl_1: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '1',
        Value: vm.inputFormData.InOutput_ePtntl_1.toString()
      }
      updateList.push(input_ePtntl_1)

      let input2: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '2',
        Value: vm.inputFormData.InOutput_2.toString()
      }
      updateList.push(input2)

      let input_ePtntl_2: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '2',
        Value: vm.inputFormData.InOutput_ePtntl_2.toString()
      }
      updateList.push(input_ePtntl_2)

      let input3: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '3',
        Value: vm.inputFormData.InOutput_3.toString()
      }
      updateList.push(input3)

      let input_ePtntl_3: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '3',
        Value: vm.inputFormData.InOutput_ePtntl_3.toString()
      }
      updateList.push(input_ePtntl_3)

      let input4: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '4',
        Value: vm.inputFormData.InOutput_4.toString()
      }
      updateList.push(input4)

      let input_ePtntl_4: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '4',
        Value: vm.inputFormData.InOutput_ePtntl_4.toString()
      }
      updateList.push(input_ePtntl_4)

      let input5: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '5',
        Value: vm.inputFormData.InOutput_5.toString()
      }
      updateList.push(input5)

      let input_ePtntl_5: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '5',
        Value: vm.inputFormData.InOutput_ePtntl_5.toString()
      }
      updateList.push(input_ePtntl_5)

      let input6: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '6',
        Value: vm.inputFormData.InOutput_6.toString()
      }
      updateList.push(input6)

      let input_ePtntl_6: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '6',
        Value: vm.inputFormData.InOutput_ePtntl_6.toString()
      }
      updateList.push(input_ePtntl_6)

      let input7: UpdateParam = {
        Group: 'Digital',
        Type: 'Input',
        Name: '7',
        Value: vm.inputFormData.InOutput_7.toString()
      }
      updateList.push(input7)

      let input_ePtntl_7: UpdateParam = {
        Group: 'Digital',
        Type: 'Input_ePtntl',
        Name: '7',
        Value: vm.inputFormData.InOutput_ePtntl_7.toString()
      }
      updateList.push(input_ePtntl_7)

      /**
       * Output
       */

      let output0: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '0',
        Value: vm.outputFormData.InOutput_0.toString()
      }
      updateList.push(output0)

      let output_ePtntl_0: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '0',
        Value: vm.outputFormData.InOutput_ePtntl_0.toString()
      }
      updateList.push(output_ePtntl_0)

      let output1: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '1',
        Value: vm.outputFormData.InOutput_1.toString()
      }
      updateList.push(output1)

      let output_ePtntl_1: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '1',
        Value: vm.outputFormData.InOutput_ePtntl_1.toString()
      }
      updateList.push(output_ePtntl_1)

      let output2: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '2',
        Value: vm.outputFormData.InOutput_2.toString()
      }
      updateList.push(output2)

      let output_ePtntl_2: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '2',
        Value: vm.outputFormData.InOutput_ePtntl_2.toString()
      }
      updateList.push(output_ePtntl_2)

      let output3: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '3',
        Value: vm.outputFormData.InOutput_3.toString()
      }
      updateList.push(output3)

      let output_ePtntl_3: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '3',
        Value: vm.outputFormData.InOutput_ePtntl_3.toString()
      }
      updateList.push(output_ePtntl_3)

      let output4: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '4',
        Value: vm.outputFormData.InOutput_4.toString()
      }
      updateList.push(output4)

      let output_ePtntl_4: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '4',
        Value: vm.outputFormData.InOutput_ePtntl_4.toString()
      }
      updateList.push(output_ePtntl_4)

      let output5: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '5',
        Value: vm.outputFormData.InOutput_5.toString()
      }
      updateList.push(output5)

      let output_ePtntl_5: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '5',
        Value: vm.outputFormData.InOutput_ePtntl_5.toString()
      }
      updateList.push(output_ePtntl_5)

      let output6: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '6',
        Value: vm.outputFormData.InOutput_6.toString()
      }
      updateList.push(output6)

      let output_ePtntl_6: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '6',
        Value: vm.outputFormData.InOutput_ePtntl_6.toString()
      }
      updateList.push(output_ePtntl_6)

      let output7: UpdateParam = {
        Group: 'Digital',
        Type: 'Output',
        Name: '7',
        Value: vm.outputFormData.InOutput_7.toString()
      }
      updateList.push(output7)

      let output_ePtntl_7: UpdateParam = {
        Group: 'Digital',
        Type: 'Output_ePtntl',
        Name: '7',
        Value: vm.outputFormData.InOutput_ePtntl_7.toString()
      }
      updateList.push(output_ePtntl_7)

      var account = getCookie('Account')
      const payload: UpdateParamUser = {
        InputList: updateList,
        Operator: account
      }

      updateSettingByList(payload).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.saveSuccess)
          updateAlwaysRead(AlwaysReadParamEnum.DIOChange)
          vm.finishLoadingByAlwaysRead()
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.saveFail)
        }
      })
    },

    /**
     * 先讀取經常讀取值做判斷並完成載入
     */
    finishLoadingByAlwaysRead() {
      var vm = this

      //定時詢問DB確認是否回寫完成
      let count = 0
      const interval = setInterval(function () {
        count++
        const payload: IAlwaysReadSearch = {
          Name: AlwaysReadParamEnum.DIOChange
        }
        readAlwaysReadValue(payload).then((response) => {
          if (response.data.statusCode == 200) {
            const data: IAlwaysRead = response.data.payload
            if (data.value === false) {
              vm.isShowLoading = false
              clearInterval(interval)
            }
          } else if (response.data.statusCode == 500) {
            console.log('readAlwaysReadValue DIOChange fail!')
            vm.isShowLoading = false
            clearInterval(interval)
          }
        })

        //逾時1分鐘沒回應就關閉Loading與提示
        if (count >= 30) {
          clearInterval(interval)
          vm.isShowLoading = false
          window.$message.warning(vm.windowsServiceBusyMessage)
        }
      }, 2000)
    }
  }
})
</script>
