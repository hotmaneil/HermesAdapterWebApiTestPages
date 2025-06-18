<template>
  <n-card :title="$t('Option')" style="margin-bottom: 16px">
    <template #header-extra>
      <n-button type="info" ghost @click="backToPreviousPage">
        {{ $t('Back') }}
      </n-button>
    </template>

    <n-divider dashed>
      {{ optionName }}
    </n-divider>

    <n-button type="success" ghost @click="handleCreateButtonClick">
      {{ $t('New') }}
    </n-button>
    <n-data-table size="smail" :columns="detailColumns" :data="detialList" />
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
      <n-form ref="formUser" :model="optionWordDetailForm">
        <n-form-item path="code" :label="$t('Authority.Code')">
          <n-Input v-model:value="optionWordDetailForm.code" />
        </n-form-item>

        <n-form-item path="sequence" :label="$t('Authority.Rank')">
          <n-Input-number v-model:value="optionWordDetailForm.sequence" />
        </n-form-item>

        <n-form-item path="value" :label="$t('Value')">
          <n-Input v-model:value="optionWordDetailForm.value" />
        </n-form-item>

        <n-form-item path="Enable" :label="$t('Settings.Enable')" v-if="formMode === 'Modify'">
          <n-switch v-model:value="optionWordDetailForm.isEnabled" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button type="info" ghost @click="createOrUpdateOptionWordDetail()">
          {{ $t('Save') }}
        </n-button>
        <n-button type="error" ghost @click="showFormModal = false"> {{ $t('Cancel') }} </n-button>
      </template>
    </n-card>
  </n-modal>

  <!--語系表單-->
  <n-modal v-model:show="showLangFormModal">
    <n-card
      style="width: 600px"
      :title="$t('Language')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> </template>
      <n-table :bordered="true" :single-line="false">
        <thead>
          <tr>
            <th>{{ $t('Language') }}</th>
            <th>{{ $t('Authority.DisplayName') }}</th>
          </tr>
        </thead>

        <tbody v-for="item in detailLangList" :key="item.id">
          <tr>
            <th>{{ item.langCultureId }}</th>
            <th>
              <n-Input v-model:value="item.name" />
            </th>
          </tr>
        </tbody>
      </n-table>
      <template #footer>
        <n-button type="info" ghost @click="updateOptionWordDetailLanguage()">
          {{ $t('Save') }}
        </n-button>
        <n-button type="error" ghost @click="cancelLangForm()">
          {{ $t('Cancel') }}
        </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { FormModeEnum } from '@/Enum/enums'
import { h, defineComponent } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import {
  getOptionWord,
  getOptionWordDetailListByOptionWordId,
  updateOptionWordDetail,
  getOptionWordDetailLangList,
  updateOptionWordDetailNameList
} from '@/api/OptionWord'
import { renderLanguage, renderLanguageReturn } from '@/utils/Common'
import { NButton, NTag } from 'naive-ui'
import type InputIntIdModel from '@/Interface/InputIntIdModel'

export default defineComponent({
  data() {
    return {
      /** 主選單名稱 */
      optionName: '',

      /** 選項明細列表 */
      detialList: [] as IOptionWordDetailData[],

      /** 選項明細欄位 */
      detailColumns: [] as DataTableColumns<IOptionWordDetailData>,

      /** 選項表單 */
      optionWordDetailForm: {} as IOptionWordDetailData,

      /** 選項表單對話框顯示 */
      showFormModal: false,

      /** 表單模式 */
      formMode: '',

      /** 選項語系對話框顯示 */
      showLangFormModal: false,

      /** 選項語系資料列表 */
      detailLangList: [] as IOptionWordDetailName[],

      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail')
    }
  },

  created() {
    this.getDetialList()
    this.setDetailColumns()
  },

  methods: {
    /**
     * 取得明細列表
     * @param input
     */
    getDetialList() {
      const vm = this

      const idPayload: InputIntIdModel = {
        Id: parseInt(this.$route.params.id.toString())
      }
      getOptionWord(idPayload).then((response) => {
        const data: IOptionWord = response.data.payload
        console.log('getOptionWord data', data)
        vm.optionWordDetailForm.optionWordId = data.id
        vm.optionName = `${data.displayName}`
      })

      const payload: IOptionWordIdSearch = {
        optionWordId: parseInt(this.$route.params.id.toString())
      }
      getOptionWordDetailListByOptionWordId(payload).then((response) => {
        console.log('getOptionWordDetailListByOptionWordId', response.data.payload)
        const dataList: IOptionWordDetailData[] = response.data.payload
        if (dataList === null) {
          vm.detialList = [] as IOptionWordDetailData[]
        } else {
          vm.detialList = dataList
        }
      })
    },

    /** 設定明細列表用的欄位 */
    setDetailColumns() {
      var vm = this
      vm.detailColumns = [
        {
          title: renderLanguage('Authority.Code'),
          key: 'code'
        },
        {
          title: renderLanguage('Authority.Rank'),
          key: 'sequence'
        },
        {
          title: renderLanguage('Value'),
          key: 'value'
        },
        {
          title: renderLanguage('Settings.Enable'),
          key: 'isEnabled',
          render(row: IOptionWordDetailData) {
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
          render(row: IOptionWordDetailData) {
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
          title: renderLanguage('EditLanguage'),
          key: 'Modify',
          render(row: IOptionWordDetailData) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'warning',
                ghost: true,
                onClick: () => vm.handleEditLangBtnClick(row)
              },
              { default: () => renderLanguageReturn('EditLanguage') }
            )
          }
        }
      ]
    },

    /**
     * 按下新增按鈕事件
     */
    handleCreateButtonClick() {
      const vm = this
      this.optionWordDetailForm = {} as IOptionWordDetailData
      const idPayload: InputIntIdModel = {
        Id: parseInt(this.$route.params.id.toString())
      }
      getOptionWord(idPayload).then((response) => {
        const data: IOptionWord = response.data.payload
        console.log('getOptionWord data', data)
        vm.optionWordDetailForm.optionWordId = data.id
      })
      this.showFormModal = true
      this.formMode = FormModeEnum.New
    },

    /**
     * 取得表單資料
     * @param row
     */
    getFormData(row: IOptionWordDetailData) {
      const vm = this
      vm.optionWordDetailForm = row
      this.showFormModal = true
      this.formMode = FormModeEnum.Modify
    },

    /**
     * 新增與更新選項
     */
    createOrUpdateOptionWordDetail() {
      const vm = this
      const payload: IOptionWordDetailData = vm.optionWordDetailForm
      console.log('payload', payload)
      updateOptionWordDetail(payload).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.saveSuccess)
          vm.showFormModal = false
          vm.getDetialList()
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.saveFail)
        }
      })
    },

    /**
     * 回上一頁到主表
     */
    backToPreviousPage() {
      const vm = this
      //   vm.$router.go(-1)
      vm.$router.push({
        path: '/optionWord'
      })
    },

    /**
     * 編輯語系按鈕按下事件
     */
    handleEditLangBtnClick(row: IOptionWordDetailData) {
      this.showLangFormModal = true
      this.setDefaultDetailLangList(row)
    },

    /**
     * 建立預設選項語系列表
     * @param row
     */
    setDefaultDetailLangList(row: IOptionWordDetailData) {
      const vm = this

      const payload: InputIntIdModel = {
        Id: row.id
      }
      getOptionWordDetailLangList(payload).then((response) => {
        const dataList: IOptionWordDetailName[] = response.data.payload
        if (dataList === null) {
          const dataUS: IOptionWordDetailName = {
            id: 0,
            optionWordDetailId: row.id,
            langCultureId: 'en-US',
            name: ''
          }
          vm.detailLangList.push(dataUS)

          const dataTw: IOptionWordDetailName = {
            id: 0,
            optionWordDetailId: row.id,
            langCultureId: 'zh-TW',
            name: ''
          }
          vm.detailLangList.push(dataTw)

          const dataCN: IOptionWordDetailName = {
            id: 0,
            optionWordDetailId: row.id,
            langCultureId: 'zh-CN',
            name: ''
          }
          vm.detailLangList.push(dataCN)
        } else {
          vm.detailLangList = dataList
        }
      })
    },

    /**
     * 更新選項語系
     */
    updateOptionWordDetailLanguage() {
      const vm = this
      updateOptionWordDetailNameList(vm.detailLangList).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.saveSuccess)
          vm.cancelLangForm()
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.saveFail)
        }
      })
    },

    /**
     * 取消語系表單
     */
    cancelLangForm() {
      const vm = this
      vm.showLangFormModal = false
      vm.detailLangList = []
    }
  }
})
</script>
