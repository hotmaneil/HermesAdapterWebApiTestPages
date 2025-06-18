<template>
  <n-card :title="$t('Role')" style="margin-bottom: 16px">
    <n-data-table size="smail" :columns="columns" :data="roleList" />
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
      <n-form ref="authorityForm">
        <n-form-item path="FunctionAuthority" :label="$t('FunctionAuthority')">
          <n-tree-select
            multiple
            :options="functionOptionList"
            :default-value="authorityList"
            @update:value="handleUpdateValue"
          />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button type="info" ghost @click="createOrUpdateAuthority()"> {{ $t('Save') }} </n-button>
        <n-button type="error" ghost @click="showModal = false"> {{ $t('Cancel') }} </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type { DataTableColumns } from 'naive-ui'
import { renderLanguage, renderLanguageReturn } from '@/utils/Common'
import { NButton } from 'naive-ui'
import {
  getAllRoleList,
  getFunctionMultiDropDownList,
  updateAccessControl,
  getAccessControlList
} from '@/api/System'
import { FormModeEnum } from '@/Enum/enums'
import type { TreeSelectOption } from 'naive-ui'
import type InputIntIdModel from '@/Interface/InputIntIdModel'

export default defineComponent({
  data() {
    return {
      columns: [] as DataTableColumns<IRole>,

      /** 角色列表 */
      roleList: [] as IRole[],
      showModal: false,

      /** 功能下拉選單列表 */
      functionOptionList: [] as IMultiSelect[],

      /** 表單模式 */
      formMode: '',

      /** 功能權限列表 */
      authorityList: [] as Array<number>,

      /** 目前角色Id */
      currentRoleId: 0,

      /**
       * 角色權限列表
       */
      roleAuthorityList: [] as IAccessControl[],

      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail')
    }
  },

  created() {
    this.setRoleColumns()
    this.getRoleList()
    this.getFunctionOptionList()
  },

  methods: {
    /**
     * 設定角色表格欄位
     */
    setRoleColumns() {
      var vm = this
      vm.columns = [
        {
          title: renderLanguage('Name'),
          key: 'name'
        },
        {
          title: renderLanguage('Authority.Description'),
          key: 'description'
        },

        // {
        //   title: renderLanguage('isEnabled'),
        //   key: 'isEnabled'
        // },
        {
          title: renderLanguage('Authority.ModifyAuthority'),
          key: 'id',
          render(row: IRole) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'info',
                ghost: true,
                onClick: () => vm.getAuthorityData(row)
              },
              { default: () => renderLanguageReturn('Authority.ModifyAuthority') }
            )
          }
        }
      ]
    },

    /**
     * 取得角色列表
     */
    getRoleList() {
      const vm = this
      getAllRoleList().then((response) => {
        const dataList: IRole[] = response.data.payload
        vm.roleList = dataList
      })
    },

    /** 取得權限資料 */
    getAuthorityData(RoleData: IRole) {
      const vm = this
      vm.currentRoleId = RoleData.id

      vm.authorityList = [] as Array<number>
      vm.roleAuthorityList = [] as IAccessControl[]

      const payload: InputIntIdModel = {
        Id: RoleData.id
      }
      getAccessControlList(payload).then((response) => {
        const dataList = response.data.payload
        dataList.forEach((element) => {
          const addItem: IAccessControl = {
            roleId: element.roleId,
            functionId: element.functionId
          }
          vm.roleAuthorityList.push(addItem)
          vm.authorityList.push(element.functionId)
        })
      })

      this.showModal = true
      this.formMode = FormModeEnum.Modify
    },

    /**
     * 取得功能下拉選單列表
     */
    getFunctionOptionList() {
      const vm = this
      getFunctionMultiDropDownList().then((response) => {
        const dataList: IMultiSelect[] = response.data.payload
        vm.functionOptionList = dataList
      })
    },

    /**
     * 獲得選取值
     * @param value
     * @param option
     */
    handleUpdateValue(
      value: Array<number>,
      option: TreeSelectOption | null | Array<TreeSelectOption | null>
    ) {
      const vm = this
      console.log('value', value)
      console.log('option', option)
      vm.authorityList = value
    },

    /**
     * 新增或更新權限
     */
    createOrUpdateAuthority() {
      const vm = this
      vm.roleAuthorityList = [] as IAccessControl[]
      vm.authorityList?.forEach((elelment: number) => {
        const addItem: IAccessControl = {
          roleId: vm.currentRoleId,
          functionId: elelment
        }
        vm.roleAuthorityList.push(addItem)
      })
      updateAccessControl(vm.roleAuthorityList).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.saveSuccess)
          this.showModal = false
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.saveFail)
        }
      })
    }
  }
})
</script>
