<template>
  <n-spin size="large" :show="isShowLoading">
    <n-form ref="formRef" :model="formData" :rules="rules">
      <n-form-item path="ModelName" :label="$t('Settings.ModelName')">
        <n-input v-model:value="formData.ModelName" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="MachineID" :label="$t('Settings.MachineID')">
        <n-input v-model:value="formData.MachineID" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="DisplayName" :label="$t('Settings.DisplayName')">
        <n-input v-model:value="formData.DisplayName" @keydown.enter.prevent />
      </n-form-item>
      <n-form-item path="BoardMode" :label="$t('Settings.BoardMode')">
        <n-select v-model:value="formData.BoardMode" :options="boardModeOptionList" />
        <n-tag type="warning">
          {{ $t('Settings.BoardModeWarning') }}
        </n-tag>
      </n-form-item>
      <n-form-item path="fifoRange" :label="$t('Settings.fifoRange')">
        <n-space vertical>
          <n-slider v-model:value="formData.fifoRange" :step="1" :min="2" :max="50" />
          <n-input-number
            v-model:value="formData.fifoRange"
            :min="2"
            :max="50"
            @keydown.enter.prevent
          />
        </n-space>
      </n-form-item>
    </n-form>
    <n-button type="info" ghost @click="handleSaveButtonClick" v-if="isEnableSaveBtn">
      {{ $t('Save') }}
    </n-button>
  </n-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { FormInst, FormRules } from 'naive-ui'
import type { CommonFormColumn } from '@/types/Setting/CommonFormColumn'
import { getSettingList, updateSettingByList } from '@/api/Setting'
import { getOptionWordDetailList } from '@/api/OptionWord'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import type IMvcSetting from '@/Interface/IMvcSetting'
import { getCookie } from 'typescript-cookie'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'
import type { DropDownList } from '@/types/DropDownList'
import type { UpdateParam } from '@/types/Setting/UpdateParam'
import { renderLanguage } from '@/utils/Common'
import { mapState } from 'pinia'
import { AccessControlList } from '@/stores/accessControlList'
import type { UpdateParamUser } from '@/types/Setting/UpdateParamUser'

export default defineComponent({
  name: 'CommonForm',
  //保留看未來是否用到
  // setup() {
  //   const formRef = ref<FormInst | null>(null)
  //   return {
  //     formRef,
  //     handleValidateClick(e: MouseEvent) {
  //       e.preventDefault()
  //       formRef.value?.validate((errors) => {
  //         if (!errors) {
  //           window.$message.success('Valid')
  //         } else {
  //           console.log(errors)
  //           window.$message.error('Invalid')
  //         }
  //       })
  //     }
  //   }
  // },
  inject: ['renewLang'],
  computed: {
    ...mapState(AccessControlList, ['storeAccessControlList'])
  },
  watch: {
    renewLang: {
      handler(val, oldVal) {
        console.log(`renewLang handler val: ${val},oldVal:${oldVal}`)
        this.SetBoardModeOptionList()
      },
      deep: true
    }
  },
  data() {
    return {
      formRef: ref<FormInst | null>(null),
      formData: {} as CommonFormColumn,

      /** 板資料處裡模式下拉選單 */
      boardModeOptionList: [] as DropDownList[],
      rules: {
        ModelName: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ],
        MachineID: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ],
        DisplayName: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ]
      } as FormRules,
      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail'),

      /** 是否啟用儲存按鈕 */
      isEnableSaveBtn: false,

      /** 是否顯示載入中 */
      isShowLoading: false
    }
  },

  created() {
    this.GetSettingList()
    this.SetBoardModeOptionList()
    this.getAccessControl()
  },

  methods: {
    /** 取得存取權限 */
    getAccessControl() {
      const vm = this
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        vm.storeAccessControlList.forEach((element) => {
          if (element.functionCode === 'Common' && element.functionActionName === 'Modify') {
            vm.isEnableSaveBtn = true
          }
        })
      }
    },

    /**
     * 取得MACHINE設定列表
     */
    GetSettingList() {
      const payload: SettingSearch = {
        Group: 'MACHINE',
        Type: '',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload
        const findModelName = dataList.find((x) => x.name === 'ModelName')
        if (findModelName !== undefined) {
          vm.formData.ModelName = findModelName.value
        }

        const findMachineID = dataList.find((x) => x.name === 'MachineID')
        if (findMachineID !== undefined) {
          vm.formData.MachineID = findMachineID.value
        }

        const findDisplayName = dataList.find((x) => x.name === 'DisplayName')
        if (findDisplayName !== undefined) {
          vm.formData.DisplayName = findDisplayName.value
        }

        const findBoardMode = dataList.find((x) => x.name === 'BoardMode')
        if (findBoardMode !== undefined) {
          vm.formData.BoardMode = parseInt(findBoardMode.value)
        }

        const findfifoRange = dataList.find((x) => x.name === 'fifoRange')
        if (findfifoRange !== undefined) {
          vm.formData.fifoRange = parseInt(findfifoRange.value)
        }
      })
    },

    /**
     * 建立板資料處裡模式下拉選單
     */
    SetBoardModeOptionList() {
      const vm = this
      vm.boardModeOptionList = []
      const language = getCookie('Language')
      if (language !== undefined) {
        const payload: OptionWordSearch = {
          OptionWordId: undefined,
          OptionWordName: 'BoardMode',
          Language: language
        }

        getOptionWordDetailList(payload).then((response) => {
          const dataList: IOptionWordDetail[] = response.data

          dataList.forEach((element) => {
            let option: DropDownList = {
              label: element.languageContext,
              value: parseInt(element.value)
            }
            vm.boardModeOptionList.push(option)
          })
        })
      }
    },

    /**
     * 儲存按鈕事件
     */
    handleSaveButtonClick(e: MouseEvent) {
      e.preventDefault()

      const vm = this

      this.$refs['formRef'].validate((errors) => {
        if (errors) {
          console.log(errors)
          window.$message.error('validate invalid!')
        } else {
          vm.isShowLoading = true

          let updateList: UpdateParam[] = []

          let modelName: UpdateParam = {
            Group: 'MACHINE',
            Type: 'MACHINE',
            Name: 'ModelName',
            Value: vm.formData.ModelName
          }
          updateList.push(modelName)

          let machineID: UpdateParam = {
            Group: 'MACHINE',
            Type: 'MACHINE',
            Name: 'MachineID',
            Value: vm.formData.MachineID
          }
          updateList.push(machineID)

          let displayName: UpdateParam = {
            Group: 'MACHINE',
            Type: 'MACHINE',
            Name: 'DisplayName',
            Value: vm.formData.DisplayName
          }
          updateList.push(displayName)

          let boardMode: UpdateParam = {
            Group: 'MACHINE',
            Type: 'MACHINE',
            Name: 'BoardMode',
            Value: vm.formData.BoardMode.toString()
          }
          updateList.push(boardMode)

          let fifoRange: UpdateParam = {
            Group: 'MACHINE',
            Type: 'MACHINE',
            Name: 'fifoRange',
            Value: vm.formData.fifoRange.toString()
          }
          updateList.push(fifoRange)

          var account = getCookie('Account')
          const payload: UpdateParamUser = {
            InputList: updateList,
            Operator: account
          }

          updateSettingByList(payload)
            .then((response) => {
              console.log('updateSettingByList response', response)
              if (response.data.statusCode == 200) {
                window.$message.success(vm.saveSuccess)
                vm.finishLoading()
              } else if (response.data.statusCode == 500) {
                window.$message.error(vm.saveFail)
              }
            })
            .catch((error) => {
              console.log('updateSettingByList error', error)
              window.$message.error(error.code)
              vm.finishLoading()
            })
        }
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
    }
  }
})
</script>
