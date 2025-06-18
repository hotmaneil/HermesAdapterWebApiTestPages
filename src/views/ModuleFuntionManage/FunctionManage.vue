<template>
  <n-card :title="$t('Function')" style="margin-bottom: 16px">
    <n-select
      v-model:value="currentModeuldId"
      :options="moduleDropDownList"
      @change="getFunctionDataList"
    />
    <n-button type="success" ghost @click="handleCreateButtonClick"> {{ $t('New') }} </n-button>
    <n-data-table size="smail" :columns="columns" :data="functionList" />
  </n-card>

  <n-modal v-model:show="showModal">
    <n-card
      style="width: 600px"
      :title="formMode === 'New' ? $t('New') : $t('Modify')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> </template>
      <n-form ref="formUser" :model="functionForm">
        <n-form-item path="Code" :label="$t('Authority.Code')">
          <n-Input v-model:value="functionForm.code" />
        </n-form-item>

        <n-form-item path="DisplayName" :label="$t('Authority.DisplayName')">
          <n-Input v-model:value="functionForm.displayName" />
        </n-form-item>

        <n-form-item path="Rank" :label="$t('Authority.Rank')">
          <n-Input-number :min="1" v-model:value="functionForm.rank" />
        </n-form-item>

        <n-form-item path="IsMainFunction" :label="$t('Authority.IsMainFunction')">
          <n-switch v-model:value="functionForm.isMainFunction" />
        </n-form-item>

        <n-form-item path="ActionName" :label="$t('Authority.ActionName')">
          <n-Input v-model:value="functionForm.actionName" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button type="info" ghost @click="createOrUpdateFunction()"> {{ $t('Save') }} </n-button>
        <n-button type="error" ghost @click="showModal = false"> {{ $t('Cancel') }} </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { DropDownList } from '@/types/DropDownList'
import { getModuleDropDownList, getFunctionList, updateFunction } from '@/api/System'
import { renderLanguage, renderLanguageReturn } from '@/utils/Common'
import { FormModeEnum } from '@/Enum/enums'
import type { DataTableColumns } from 'naive-ui'
import { NButton, NTag } from 'naive-ui'

export default defineComponent({
  data() {
    return {
      /** 模組下拉選單 */
      moduleDropDownList: [] as DropDownList[],

      /** 目前模組Id */
      currentModeuldId: 1,

      columns: [] as DataTableColumns<IFunction>,

      /**
       * 功能列表
       */
      functionList: [] as IFunction[],

      showModal: false,

      /** 功能表單 */
      functionForm: {} as IFunction,

      /** 表單模式 */
      formMode: '',

      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail')
    }
  },

  created() {
    this.setModuleDropDownList()
    this.setFunctionColumns()
    this.getFunctionDataList(this.currentModeuldId)
  },

  methods: {
    /**
     * 建立模組下拉選單列表
     */
    setModuleDropDownList() {
      const vm = this
      getModuleDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.moduleDropDownList = dataList
      })
    },

    /**
     * 按下新增按鈕事件
     */
    handleCreateButtonClick() {
      this.functionForm = {} as IFunction
      this.showModal = true
      this.formMode = FormModeEnum.New
    },

    /**
     * 設定功能表格欄位
     */
    setFunctionColumns() {
      var vm = this
      vm.columns = [
        {
          title: renderLanguage('Authority.Code'),
          key: 'code'
        },
        {
          title: renderLanguage('Authority.DisplayName'),
          key: 'displayName'
        },

        {
          title: renderLanguage('Authority.Rank'),
          key: 'rank'
        },
        {
          title: renderLanguage('Authority.IsMainFunction'),
          key: 'isMainFunction',
          render(row: IFunction) {
            switch (row.isMainFunction) {
              case true:
                return h(NTag, { type: 'success' }, { default: () => 'Yes' })

              case false:
                return h(NTag, { type: 'error' }, { default: () => 'No' })
            }
          }
        },
        {
          title: renderLanguage('Authority.ActionName'),
          key: 'actionName'
        },
        {
          title: renderLanguage('Modify'),
          key: 'Modify',
          render(row: IFunction) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'info',
                ghost: true,
                onClick: () => vm.getFunctionData(row)
              },
              { default: () => renderLanguageReturn('Modify') }
            )
          }
        }
      ]
    },

    /**
     * 取得功能列表用的資料
     */
    getFunctionDataList(selectedValue: number) {
      const vm = this
      const payload: ISystemModuleId = {
        SystemModuleId: selectedValue
      }
      getFunctionList(payload).then((response) => {
        const dataList: IFunction[] = response.data.payload
        console.log('getFunctionList', dataList)

        if (dataList === null) {
          vm.functionList = [] as IFunction[]
        } else {
          vm.functionList = dataList
        }
      })
    },

    /**
     * 新增或更新功能
     */
    createOrUpdateFunction() {
      const vm = this
      const payload: IFunction = vm.functionForm
      payload.systemModuleId = vm.currentModeuldId
      if (
        (vm.functionForm.actionName === null || vm.functionForm.actionName === undefined) &&
        vm.functionForm.isMainFunction === true
      ) {
        payload.actionName = 'MainPage'
        payload.isEnabled = true
      } else {
        payload.isEnabled = true
      }

      console.log('payload', payload)
      updateFunction(payload).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.saveSuccess)
          this.showModal = false
          vm.getFunctionDataList(vm.currentModeuldId)
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.saveFail)
        }
      })
    },

    /**
     * 取得功能資料
     */
    getFunctionData(input: IFunction) {
      const vm = this
      vm.functionForm = input

      this.showModal = true
      this.formMode = FormModeEnum.Modify
    }
  }
})
</script>
