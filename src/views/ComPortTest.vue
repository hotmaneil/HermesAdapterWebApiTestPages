<template>
  <n-card :title="$t('OutportTest')" style="margin-bottom: 16px">
    <n-form ref="formComPortTest">
      <n-form-item path="Machine" :label="$t('Settings.Machine')">
        <n-select
          v-model:value="comPortTestForm.equipmentName"
          :options="comTestEquipmentDropDownList"
        />
      </n-form-item>

      <n-form-item
        path="selectedType"
        :label="$t('ComTest.TypeSelect')"
        v-if="comPortTestForm.equipmentName === 'M1'"
      >
        <n-select v-model:value="selectedType" :options="typeDropDownList" />
      </n-form-item>

      <n-form-item path="Width" :label="$t('Settings.Width')" v-if="enableWidth">
        <n-input-number :min="0" v-model:value="comPortTestForm.testWidth" @keydown.enter.prevent />
      </n-form-item>

      <n-form-item
        path="RecipeName"
        :label="$t('RecipeName')"
        v-if="
          comPortTestForm.equipmentName === 'M1' &&
          (selectedType === 'RecipeName' || selectedType === 'Both')
        "
      >
        <n-input v-model:value="comPortTestForm.recipeName" @keydown.enter.prevent />
      </n-form-item>
    </n-form>
  </n-card>
  <n-button type="info" ghost v-if="enableSubmitBtn" @click="submitToComTest()">
    {{ $t('Submit') }}
  </n-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { DropDownStringDisableList } from '@/types/DropDownDisableList'
import { getCookie } from 'typescript-cookie'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import { getOptionWordDetailList } from '@/api/OptionWord'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'
import { columnStatusChange } from '@/api/ColumnRunning'
import type { InputColumn } from '@/types/InputColumn'
import type IMvcColumnRunnung from '@/Interface/IMvcColumnRunnung'
import { getSettingList } from '@/api/Setting'
import type IMvcSetting from '@/Interface/IMvcSetting'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import { executeComTest } from '@/api/ComTest'
import { renderLanguage, renderLanguageReturn } from '@/utils/Common'
import moment from 'moment'
import { TypeEnum } from '@/Enum/enums'

export default defineComponent({
  computed: {
    /** 啟用width欄位 */
    enableWidth() {
      let enable = false

      //TODO:這個邏輯應該要拿掉了
      // var conditionReader =
      //   this.isReaderError === true ||
      //   (!this.isComTestReader1Enable && !this.isComTestReader2Enable)

      var conditionMachine = this.isMachineError === false

      if (
        this.comPortTestForm.equipmentName === 'M1' &&
        this.isComTestMachineEnable &&
        // conditionReader &&
        conditionMachine &&
        (this.selectedType === TypeEnum.Width || this.selectedType === TypeEnum.Both)
      ) {
        enable = true
      }
      return enable
    },

    /** 啟用提交按鈕 */
    enableSubmitBtn() {
      let enable = false
      var condition1 = !this.isReaderError && !this.isMachineError
      var condition2 = !this.isReaderError && this.isComTestMachineEnable
      var condition3 =
        this.isComTestReader1Enable && this.isComTestReader2Enable && !this.isMachineError

      console.log('condition1', condition1)
      console.log('condition2', condition2)
      console.log('condition3', condition3)

      if (condition1 || condition2 || condition3) {
        enable = true
      }

      return enable
    }
  },
  data() {
    return {
      /** Com Port 設備下拉選單 */
      comTestEquipmentDropDownList: [] as DropDownStringDisableList[],

      /** 類別選擇下拉選單 */
      typeDropDownList: [] as DropDownStringDisableList[],

      /** 條碼機是否錯誤 */
      isReaderError: false,

      /** 設備是否錯誤 */
      isMachineError: false,

      /** com測試設備是否啟用 */
      isComTestMachineEnable: false,

      /** com測試Reader1是否啟用 */
      isComTestReader1Enable: false,

      /** com測試Reader2是否啟用 */
      isComTestReader2Enable: false,

      /**
       * Com Port測試表單
       */
      comPortTestForm: {
        recipeName: 'TEST'
      } as IComPortTestForm,

      /** 類別選擇 */
      selectedType: '',

      noMRNotTest: renderLanguage('ComTest.NoMRNotTest'),
      submitSuccess: renderLanguage('ComTest.SubmitSuccess'),
      readerTestSuccess: renderLanguage('ComTest.ReaderTestSuccess'),
      readerTestFail: renderLanguage('ComTest.ReaderTestFail'),
      width: renderLanguageReturn('Settings.Width'),
      recipeName: renderLanguageReturn('RecipeName'),
      Both: renderLanguageReturn('Both')
    }
  },

  created() {
    this.getData()
    this.settypeDropDownList()
  },

  methods: {
    /**
     * 依序取得資料使用await
     */
    async getData() {
      const vm = this
      // await vm
      //   .getReaderMachineStatus()
      //   .then((first) => {
      //     console.log(first)
      //     return vm.getPartSetting()
      //   })
      //   .then((second) => {
      //     console.log(second)
      //     return vm.setComTestEquipmentDropDownList()
      //   })
      //   .then((third) => {
      //     console.log(third)
      //   })

      // 可讀性更加清楚的寫法
      const first = await vm.getReaderMachineStatus()
      console.log(first)

      const second = await vm.getPartSetting()
      console.log(second)

      const third = await vm.setComTestEquipmentDropDownList()
      console.log(third)
    },

    /**
     * 取得條碼機與設備的狀態
     */
    getReaderMachineStatus() {
      return new Promise((resolve, reject) => {
        const vm = this

        const payload: InputColumn = {
          FindColumnName: 'Reader'
        }
        columnStatusChange(payload).then((response) => {
          if (response.data.statusCode === 200) {
            const data: IMvcColumnRunnung = response.data.payload

            if (data.iF_RUNNING === 'E') {
              vm.isReaderError = true
            }
          } else if (response.data.statusCode === 500) {
            reject('get Reader data fail')
          }
        })

        const payloadMachine: InputColumn = {
          FindColumnName: 'MACHINE'
        }
        columnStatusChange(payloadMachine).then((response) => {
          if (response.data.statusCode === 200) {
            const data: IMvcColumnRunnung = response.data.payload
            if (data.iF_RUNNING === 'E') {
              vm.isMachineError = true
            }
          } else if (response.data.statusCode === 500) {
            reject('get MACHINE data fail')
          }
        })

        resolve('getReaderMachineStatus finished')
        console.log('first', moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss'))
      })
    },

    /**
     * 建立 Com Test下拉選單
     */
    setComTestEquipmentDropDownList() {
      return new Promise((resolve, reject) => {
        const vm = this
        const language = getCookie('Language')
        if (language !== undefined) {
          const payload: OptionWordSearch = {
            OptionWordId: undefined,
            OptionWordName: 'ComTestEquipment',
            Language: language
          }

          getOptionWordDetailList(payload).then((response) => {
            console.log('getOptionWordDetailList response', response)
            if (response.status === 200) {
              const dataList: IOptionWordDetail[] = response.data

              dataList.forEach((element) => {
                var isDisable = false
                switch (element.value) {
                  case 'R1':
                    isDisable = vm.isReaderError || !vm.isComTestReader1Enable
                    break
                  case 'R2':
                    isDisable = vm.isReaderError || !vm.isComTestReader2Enable
                    break
                  case 'M1':
                    isDisable = vm.isMachineError || !vm.isComTestMachineEnable
                    break
                }

                let option: DropDownStringDisableList = {
                  label: element.languageContext,
                  value: element.value,
                  disabled: isDisable
                }

                vm.comTestEquipmentDropDownList.push(option)

                resolve('setComTestEquipmentDropDownList finished!')
                console.log('third', moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss'))
              })
            } else if (response.status === 500) {
              reject('setComTestEquipmentDropDownList fail!')
            }
          })
        }
      })
    },

    /**
     * 取得部份設定
     */
    getPartSetting() {
      return new Promise((resolve, reject) => {
        const payload: SettingSearch = {
          Group: 'OutPort',
          Type: '',
          Name: 'Enable'
        }

        getSettingList(payload).then((response) => {
          if (response.data.statusCode === 200) {
            const vm = this
            const dataList: IMvcSetting[] = response.data.payload

            const findMachine = dataList.find((x) => x.type === 'Machine')
            if (findMachine !== undefined) {
              let boolValue = findMachine.value.toLowerCase() === 'true'
              vm.isComTestMachineEnable = boolValue
            }

            const findReader1 = dataList.find((x) => x.type === 'Reader1')
            if (findReader1 !== undefined) {
              let boolValue = findReader1.value.toLowerCase() === 'true'
              vm.isComTestReader1Enable = boolValue
            }

            const findReader2 = dataList.find((x) => x.type === 'Reader2')
            if (findReader2 !== undefined) {
              let boolValue = findReader2.value.toLowerCase() === 'true'
              vm.isComTestReader2Enable = boolValue
            }

            resolve('getPartSetting finished!')
            console.log('second', moment(new Date()).format('YYYY-MM-DD HH:mm:ss.ssss'))
          } else if (response.data.statusCode === 500) {
            reject('getPartSetting fail!')
          }
        })
      })
    },

    /**
     * 建立類別選擇下拉選單
     */
    settypeDropDownList() {
      const vm = this

      const payload: SettingSearch = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'Mode'
      }

      let data: IMvcSetting = {
        row_Id: 0,
        group: '',
        type: '',
        name: '',
        value: ''
      }
      getSettingList(payload)
        .then((response) => {
          const dataList: IMvcSetting[] = response.data.payload
          data = dataList[0]
        })
        .finally(() => {
          let optionList: DropDownStringDisableList[] = [
            {
              label: vm.width,
              value: TypeEnum.Width,
              disabled: data.value === '1'
            },
            {
              label: vm.recipeName,
              value: TypeEnum.RecipeName,
              disabled: data.value === '2'
            },
            {
              label: vm.Both,
              value: TypeEnum.Both,
              disabled: false
            }
          ]
          vm.typeDropDownList = optionList
        })
    },

    /**
     * 提交做Com測試
     */
    submitToComTest() {
      const vm = this
      let inputList: IComTest[] = [
        {
          Type: 'NAME',
          Status: vm.comPortTestForm.equipmentName
        },
        {
          Type: 'ISTEST',
          Status: 'Y'
        }
      ]

      if (vm.comPortTestForm.equipmentName === 'M1') {
        const addItem: IComTest = {
          Type: 'WIDTH',
          Status: vm.comPortTestForm.testWidth.toString()
        }
        inputList.push(addItem)
      }

      var account = getCookie('Account')
      const payload: IComTestCollection = {
        InputList: inputList,
        Operator: account
      }
      executeComTest(payload).then((response) => {
        let result = response.data.payload
        switch (vm.comPortTestForm.equipmentName) {
          case 'M1':
            if (result === 'noMR') {
              window.$message.error(vm.noMRNotTest)
            } else {
              window.$message.success(vm.submitSuccess)
            }
            break

          case 'R1':
          case 'R2':
            if (result === 'Y') {
              window.$message.success(vm.readerTestSuccess)
            } else {
              window.$message.error(vm.readerTestFail)
            }
            break
        }
      })
    }
  }
})
</script>
