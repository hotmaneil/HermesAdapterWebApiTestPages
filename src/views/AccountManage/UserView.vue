<template>
  <n-card :title="$t('User')" style="margin-bottom: 16px">
    <n-button type="success" ghost @click="handleCreateButtonClick" v-if="isEnableAddBtn">
      {{ $t('New') }}
    </n-button>
    <n-data-table size="smail" :columns="columns" :data="userList" />
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
      <n-form ref="formUserRef" :model="userForm" :rules="userFormRules">
        <n-form-item path="code" :label="$t('Account')">
          <n-Input v-model:value="userForm.code" :readonly="formMode === 'New' ? false : true" />
        </n-form-item>

        <n-form-item path="Name" :label="$t('Name')">
          <n-Input v-model:value="userForm.name" />
        </n-form-item>

        <n-form-item path="roleId" :label="$t('Role')">
          <n-select v-model:value="userForm.roleId" :options="roleDropDownList" />
        </n-form-item>

        <n-form-item path="password" :label="$t('Password')">
          <n-Input type="password" show-password-on="mousedown" v-model:value="userForm.password" />
        </n-form-item>

        <n-form-item path="confirmPassword" :label="$t('ConfirmPassword')">
          <n-Input
            type="password"
            show-password-on="mousedown"
            v-model:value="userForm.confirmPassword"
          />
        </n-form-item>

        <n-form-item path="Enable" :label="$t('Settings.Enable')" v-if="formMode === 'Modify'">
          <n-switch v-model:value="userForm.isEnabled" />
        </n-form-item>
      </n-form>
      <template #footer>
        <n-button type="info" ghost @click="createOrUpdateUser()"> {{ $t('Save') }} </n-button>
        <n-button type="error" ghost @click="showModal = false"> {{ $t('Cancel') }} </n-button>
      </template>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { h, defineComponent } from 'vue'
import type IUserRole from '@/Interface/System/IUserRole'
import {
  updateUser,
  getAllUserRoleList,
  getUser,
  getRoleDropDownList,
  deleteUser
} from '@/api/System'
import { FormModeEnum, RoleEnum } from '@/Enum/enums'
import { renderLanguage, renderLanguageReturn } from '@/utils/Common'
import type { DropDownList } from '@/types/DropDownList'
import type InputIntIdModel from '@/Interface/InputIntIdModel'
import { NButton, NPopconfirm } from 'naive-ui'
import type { DataTableColumns, FormRules } from 'naive-ui'
import { getCookie } from 'typescript-cookie'
import { mapState } from 'pinia'
import { AccessControlList } from '@/stores/accessControlList'

export default defineComponent({
  computed: {
    ...mapState(AccessControlList, ['storeAccessControlList'])
  },
  data() {
    return {
      columns: [] as DataTableColumns<IUserRole>,

      userList: [] as IUserRole[],

      /** 使用者表單 */
      userForm: {} as IUserForm,

      roleDropDownList: [] as DropDownList[],

      showModal: false,

      /** 表單模式 */
      formMode: '',

      saveSuccess: renderLanguage('SaveSuccess'),
      saveFail: renderLanguage('SaveFail'),
      confirmPasswordDifferent: renderLanguage('ConfirmPasswordDifferent'),

      deleteSuccess: renderLanguage('DeleteSuccess'),
      deleteFail: renderLanguage('DeleteFail'),
      alreadyCancelDelete: renderLanguage('AlreadyCancelDelete'),

      /** 是否啟用新增按鈕 */
      isEnableAddBtn: false,

      /** 使用者表單驗證規則 */
      userFormRules: {} as FormRules,

      /** 使用者表單新增驗證規則 */
      userFormNewRules: {
        code: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ],

        roleId: [
          {
            required: true,
            type: 'number',
            trigger: ['blur', 'change']
          }
        ],

        password: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ],

        confirmPassword: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ]
      } as FormRules,

      /** 使用者表單編輯驗證規則 */
      userFormEditRules: {
        code: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ],

        roleId: [
          {
            required: true,
            type: 'number',
            trigger: ['blur', 'change']
          }
        ]
      } as FormRules
    }
  },

  created() {
    this.setUserColumns()
    this.getUserRoleList()
    this.setRoleDropDownList()
    this.getAccessControl()
  },

  methods: {
    /** 取得存取權限 */
    getAccessControl() {
      const vm = this
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        vm.storeAccessControlList.forEach((element) => {
          if (element.functionCode === 'User' && element.functionActionName === 'Add') {
            vm.isEnableAddBtn = true
          }
        })
      }
    },

    /**
     * 設定使用者表格欄位
     */
    setUserColumns() {
      var vm = this
      vm.columns = [
        {
          title: renderLanguage('UserCode'),
          key: 'userCode'
        },
        {
          title: renderLanguage('UserName'),
          key: 'userName'
        },

        {
          title: renderLanguage('RoleName'),
          key: 'roleName'
        },
        {
          title: renderLanguage('Modify'),
          key: 'Modify',
          render(row: IUserRole) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'info',
                ghost: true,
                onClick: () => vm.getSingleUser(row)
              },
              { default: () => renderLanguageReturn('Modify') }
            )
          }
        },
        {
          title: renderLanguage('Delete'),
          key: 'Delete',
          render(row: IUserRole) {
            return h(
              NPopconfirm,
              {
                positiveButtonProps: {
                  size: 'small',
                  type: 'success',
                  ghost: true,
                  bordered: true
                },
                positiveText: renderLanguageReturn('Confirm'),

                negativeButtonProps: {
                  size: 'small',
                  type: 'error',
                  ghost: true,
                  bordered: true
                },
                negativeText: renderLanguageReturn('Cancel'),

                onPositiveClick: (e: any) => {
                  const account = getCookie('Account')
                  if (account !== undefined) {
                    const input: IInputAccount = {
                      Id: row.id,
                      Account: row.userCode,
                      Modifier: account
                    }
                    vm.deleteSingleUser(input)
                  }
                },

                onNegativeClick: () => {
                  window.$message.info(vm.alreadyCancelDelete)
                }
              },
              {
                trigger: () => {
                  return h(
                    NButton,
                    {
                      size: 'small',
                      type: 'error',
                      ghost: true,
                      disabled: row.userCode === getCookie('Account') ? true : false
                    },
                    { default: () => renderLanguageReturn('Delete') }
                  )
                },
                default: () => renderLanguageReturn('AreYouSureToDelete')
              }
            )
          }
        }
      ]
    },

    /**
     * 取得使用者對應角色之列表
     */
    getUserRoleList() {
      const vm = this
      getAllUserRoleList().then((response) => {
        const dataList: IUserRole[] = response.data.payload
        var roleName = getCookie('RoleName')

        //若登入者不是超級管理員
        if (roleName === RoleEnum.SuperAdministrator) {
          vm.userList = dataList
        } else {
          //若角色是工程師，只能改自己的帳號名稱與密碼
          if (roleName != undefined && roleName === RoleEnum.Engineer) {
            var account = getCookie('Account')
            if (account !== undefined) {
              const filterDataList = dataList.filter((x) => x.userCode === account)
              vm.userList = filterDataList
            }
          } else {
            const filterDataList = dataList.filter(
              (x) => x.roleName !== RoleEnum.SuperAdministrator
            )
            console.log('filterDataList', filterDataList)
            vm.userList = filterDataList
          }
        }
      })
    },

    /**
     * 按下新增按鈕事件
     */
    handleCreateButtonClick() {
      this.userForm = {} as IUserForm
      this.showModal = true
      this.formMode = FormModeEnum.New

      this.userFormRules = this.userFormNewRules
    },

    /**
     * 建立角色下拉選單
     */
    setRoleDropDownList() {
      const vm = this
      getRoleDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.roleDropDownList = dataList
      })
    },

    /**
     * 新增或更新使用者
     */
    createOrUpdateUser() {
      const vm = this

      this.$refs['formUserRef'].validate((errors: []) => {
        console.log('errors', errors)
        if (errors) {
          console.log(errors)
          window.$message.error('validate invalid!')
        } else {
          if (vm.formMode === FormModeEnum.New) {
            if (vm.userForm.password === vm.userForm.confirmPassword) {
              vm.commonUpdateUser()
            } else {
              window.$message.error(vm.confirmPasswordDifferent)
            }
          } else if (vm.formMode === FormModeEnum.Modify) {
            console.log('Modify')
            if (vm.userForm.password === '' || vm.userForm.password === null) {
              vm.commonUpdateUser()
            } else {
              if (vm.userForm.password === vm.userForm.confirmPassword) {
                vm.commonUpdateUser()
              } else {
                window.$message.error(vm.confirmPasswordDifferent)
              }
            }
          }
        }
      })
    },

    /**
     * 共用更新使用者
     */
    commonUpdateUser() {
      const vm = this
      const account = getCookie('Account')
      if (account !== undefined) {
        vm.userForm.Modifier = account
      }
      updateUser(vm.userForm).then((response) => {
        if (response.data.statusCode === 200) {
          window.$message.success(vm.saveSuccess)
          this.showModal = false
          vm.getUserRoleList()
        } else if (response.data.statusCode === 500) {
          window.$message.error(vm.saveFail)
        }
      })
    },

    /**
     * 取得單一使用者資料
     * @param InputUserId
     */
    getSingleUser(input: IUserRole) {
      // console.log('getSingleUser input', input)
      const vm = this

      const payload: InputIntIdModel = {
        Id: input.userId
      }
      getUser(payload).then((response) => {
        const data: IUserRole = response.data.payload
        vm.userForm = {
          id: data.userId,
          code: data.userCode,
          name: data.userName,
          roleId: data.roleId,
          roleName: data.roleName,
          isEnabled: data.isEnabled,
          password: '',
          confirmPassword: '',
          Modifier: ''
        }
      })

      vm.showModal = true
      vm.formMode = FormModeEnum.Modify

      vm.userFormRules = vm.userFormEditRules
    },

    /**
     * 刪除使用者
     * @param input
     */
    deleteSingleUser(input: IInputAccount) {
      console.log('deleteSingleUser input', input)
      const vm = this

      if (input.Account === input.Modifier) {
        console.log('不可能自己刪自己的帳號吧？')
        window.$message.error('不可能自己刪自己的帳號吧？')
      } else {
        deleteUser(input).then((response) => {
          if (response.data.statusCode === 200) {
            window.$message.success(vm.deleteSuccess)
            vm.getUserRoleList()
          } else if (response.data.statusCode === 500) {
            window.$message.error(vm.deleteFail)
          }
        })
      }
    }
  }
})
</script>
