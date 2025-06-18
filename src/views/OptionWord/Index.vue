<template>
  <n-card :title="$t('OptionSetting')" style="margin-bottom: 16px">
    <n-button type="success" ghost @click="handleCreateButtonClick">
      {{ $t('New') }}
    </n-button>
    <n-data-table size="smail" :columns="columns" :data="optionWordList" />
  </n-card>

  <!--表單-->
  <n-modal v-model:show="showFormModal">
    <n-card
      style="width: 600px"
      :title="formMode === 'New' ? $t('New') : $t('Modify')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> </template>
      <n-form ref="formUser" :model="optionWordForm">
        <n-form-item path="DisplayName" :label="$t('Authority.DisplayName')">
          <n-Input v-model:value="optionWordForm.displayName" />
        </n-form-item>

        <n-form-item path="Enable" :label="$t('Settings.Enable')" v-if="formMode === 'Modify'">
          <n-switch v-model:value="optionWordForm.isEnabled" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button type="info" ghost @click="createOrUpdateOptionWord()">
          {{ $t('Save') }}
        </n-button>
        <n-button type="error" ghost @click="showFormModal = false"> {{ $t('Cancel') }} </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { FormModeEnum } from '@/Enum/enums'
import { h, defineComponent } from 'vue'
import { getOptionWordList, updateOptionWord } from '@/api/OptionWord'
import type { DataTableColumns } from 'naive-ui'
import { renderLanguage, renderLanguageReturn } from '@/utils/Common'
import { NButton, NTag } from 'naive-ui'

export default defineComponent({
  data() {
    return {
      /** 選單列表 */
      optionWordList: [] as IOptionWord[],

      columns: [] as DataTableColumns<IOptionWord>,

      showModal: false,

      /** 選取的選單Id */
      selectedOptionId: 0 as number,

      /** 選單選項表單 */
      optionWordForm: {} as IOptionWord,

      /** 選單選項表單對話框顯示 */
      showFormModal: false,

      /** 表單模式 */
      formMode: '',

      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail')
    }
  },

  created() {
    this.setColumns()
    this.getAllOptionWordList()
  },

  methods: {
    /**
     * 設定欄位
     */
    setColumns() {
      var vm = this
      vm.columns = [
        {
          title: renderLanguage('Authority.DisplayName'),
          key: 'displayName'
        },
        {
          title: renderLanguage('Settings.Enable'),
          key: 'isEnabled',
          render(row: IOptionWord) {
            switch (row.isEnabled) {
              case true:
                return h(NTag, { type: 'success' }, { default: () => 'Yes' })

              case false:
                return h(NTag, { type: 'error' }, { default: () => 'No' })
            }
          }
        },
        {
          title: renderLanguage('Modify'),
          key: 'Modify',
          render(row: IOptionWord) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'tertiary',
                ghost: true,
                onClick: () => vm.getFormData(row)
              },
              { default: () => renderLanguageReturn('Modify') }
            )
          }
        },
        {
          title: renderLanguage('Detail'),
          key: 'Detail',
          render(row: IOptionWord) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'info',
                ghost: true,
                onClick: () => vm.redirectDetailPage(row)
              },
              { default: () => renderLanguageReturn('Detail') }
            )
          }
        }
      ]
    },

    /**
     * 取得選單列表
     */
    getAllOptionWordList() {
      const vm = this
      getOptionWordList().then((response) => {
        const dataList: IOptionWord[] = response.data.payload
        if (dataList === null) {
          vm.optionWordList = [] as IFunction[]
        } else {
          vm.optionWordList = dataList
        }
      })
    },

    /**
     * 按下新增按鈕事件
     */
    handleCreateButtonClick() {
      this.optionWordForm = {} as IOptionWord
      this.showFormModal = true
      this.formMode = FormModeEnum.New
    },

    /**
     * 新增與更新選項選單
     */
    createOrUpdateOptionWord() {
      const vm = this
      const payload: IOptionWord = vm.optionWordForm
      updateOptionWord(payload).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.saveSuccess)
          vm.showFormModal = false
          vm.getAllOptionWordList()
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.saveFail)
        }
      })
    },

    /**
     * 取得表單資料
     * @param row
     */
    getFormData(row: IOptionWord) {
      const vm = this
      vm.optionWordForm = row
      vm.showFormModal = true
      vm.formMode = FormModeEnum.Modify
    },

    /**
     * 導向到明細頁面
     */
    redirectDetailPage(input: IOptionWord) {
      const vm = this
      vm.$router.push({
        path: '/optionWordDetail/' + input.id
      })
    }
  }
})
</script>
