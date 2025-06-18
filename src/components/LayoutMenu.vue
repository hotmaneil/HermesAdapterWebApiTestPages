<template>
  <div class="vaw-layout-container">
    <n-layout style="height: 100%">
      <n-spin size="large" :show="isShowLoading">
        <n-layout-header>
          <n-row :gutter="12">
            <n-col :span="4">
              <img
                src="@/assets/Logo_SunJsong.png"
                :height="logoHeight"
                v-if="logoFileName === 'Logo_SunJsong' && selectedTheme === true"
              />
              <img
                src="@/assets/Logo_SunJsong-Dark.png"
                :height="logoHeight"
                v-if="logoFileName === 'Logo_SunJsong-Dark' && selectedTheme === false"
              />
              <img
                src="@/assets/Logo-Sunsda.png"
                :height="logoHeight"
                v-if="logoFileName === 'Logo-Sunsda' && selectedTheme === true"
              />
              <img
                src="@/assets/Logo-Sunsda-Dark.png"
                :height="logoHeight"
                v-if="logoFileName === 'Logo-Sunsda-Dark' && selectedTheme === false"
              />
            </n-col>
            <n-col :span="3" :offset="1">
              <div class="labelTime">
                <n-gradient-text
                  :gradient="{
                    from: 'rgb(85, 85, 85)',
                    to: 'rgb(170, 170, 170)'
                  }"
                >
                  {{ nowTime }}
                </n-gradient-text>
              </div>
            </n-col>
            <n-col :span="1.1">
              <div class="labelLanguage">{{ $t('Language') }}:</div>
            </n-col>
            <n-col :span="3">
              <div class="selectLanguage">
                <n-select
                  v-model:value="$i18n.locale"
                  :options="localeOptions"
                  @change="changeToNewLanguege($event)"
                />
              </div>
            </n-col>
            <n-col :span="2">
              <div class="labelLoginName">{{ $t('Login_Name') }}：</div>
            </n-col>
            <n-col :span="2">
              <div class="labelLoginName">{{ userData.name }}</div>
            </n-col>
            <n-col :span="2">
              <div class="btnLogin" v-if="isLogin === false">
                <n-button type="info" @click="showLoginModal = true" ghost>
                  <template #icon>
                    <n-icon>
                      <SvgIcon :icon="LogInIconName" />
                    </n-icon>
                  </template>
                  {{ $t('Login') }}
                </n-button>
              </div>

              <div class="btnLogin" v-if="isLogin === true">
                <n-button type="info" @click="Logout()" ghost>
                  <template #icon>
                    <n-icon>
                      <SvgIcon :icon="LogOutIconName" />
                    </n-icon>
                  </template>
                  {{ $t('Logout') }}
                </n-button>
              </div>
            </n-col>

            <n-col :span="1">
              <div class="askNotify">
                <n-badge :value="askNotify" :max="5" @click="openModalFromAskNotify()">
                  <n-icon size="25">
                    <SvgIcon :icon="BellOutlinedName" />
                  </n-icon>
                </n-badge>
              </div>
            </n-col>

            <n-col :span="1">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button
                    quaternary
                    type="primary"
                    class="reLoad"
                    @Click="resetAlarmBtnConfirm()"
                  >
                    <template #icon>
                      <n-icon>
                        <SvgIcon :icon="ReloadSharpName" />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                {{ $t('ResetAlarm') }}
              </n-tooltip>
            </n-col>

            <n-col :span="1">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button
                    quaternary
                    type="primary"
                    class="reStartBtn"
                    @click="restartWindowsServiceBtnConfirm()"
                  >
                    <template #icon>
                      <n-icon size="25" color="#C4E1FF">
                        <SvgIcon :icon="ServiceName" />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                {{ $t('RestartWindowsService') }}
              </n-tooltip>
            </n-col>

            <n-col :span="1">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-button
                    quaternary
                    type="primary"
                    class="reStartBtn"
                    @Click="restartPCBtnConfirm()"
                  >
                    <template #icon>
                      <n-icon size="25" color="#EA0000">
                        <SvgIcon :icon="PowerName" />
                      </n-icon>
                    </template>
                  </n-button>
                </template>
                {{ $t('RestartPC') }}
              </n-tooltip>
            </n-col>

            <n-col :span="1">
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-switch
                    class="themeMode"
                    v-model:value="selectedTheme"
                    :rail-style="railStyle"
                    @change="changeToStoreTheme($event)"
                  >
                    <template #checked-icon>
                      <SvgIcon :icon="LightThemeName" />
                    </template>
                    <template #unchecked-icon>
                      <SvgIcon :icon="DarkThemeName" />
                    </template>
                  </n-switch>
                </template>
                {{ $t('ThemeSwitch') }}
              </n-tooltip>
            </n-col>
          </n-row>
        </n-layout-header>
        <n-layout has-sider>
          <n-layout-sider
            bordered
            show-trigger
            collapse-mode="width"
            :collapsed-width="64"
            :width="240"
            :native-scrollbar="false"
          >
            <n-menu :collapsed-width="64" :collapsed-icon-size="22" :options="menuOptions" />
          </n-layout-sider>
          <n-layout-content>
            <RouterView />
            <n-float-button :right="0" :bottom="0" shape="square" :width="60" :height="5">
              <template #description> v.24.1106</template>
            </n-float-button>
          </n-layout-content>
        </n-layout>
      </n-spin>
    </n-layout>
  </div>

  <n-modal v-model:show="showLoginModal">
    <n-card
      style="width: 390px"
      :title="$t('Login')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra> </template>
      <n-form ref="formUser" :model="loginForm" :rules="loginFormRules">
        <n-form-item path="Account" :label="$t('Account')">
          <n-Input v-model:value="loginForm.Account" />
        </n-form-item>

        <n-form-item path="Password" :label="$t('Password')">
          <n-Input
            type="password"
            v-model:value="loginForm.Password"
            show-password-on="mousedown"
            @keyup.enter="Login"
          />
        </n-form-item>
        <n-form-item>
          <n-button type="info" ghost @click="Login" size="large" block>
            {{ $t('Login') }}
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-modal>

  <QueryBarcodeModal
    :show-modal="isOpenQueryBarcodeModal"
    @update:showModal="changeIsOpenQueryBarcodeModal"
  />

  <WorkOrderCompositionModal
    :show-modal="isOpenWorkOrderModal"
    @update:showWorkOrderModal="changeIsOpenWorkOrderModal"
    @finishSubmitWorkOrder="submitWorkOrderFinished"
  />
</template>

<script lang="ts">
import { h, defineComponent, Component, computed } from 'vue'
import * as signalR from '@microsoft/signalr'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import { renderLanguage } from '@/utils/Common'
import type { CSSProperties } from 'vue'
import type { MenuOption, FormRules } from 'naive-ui'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import {
  getAccessControlList,
  login,
  getUserProfile,
  restartPC,
  restartWindowsService
} from '@/api/System'
import type InputIntIdModel from '@/Interface/InputIntIdModel'
import router from '@/router'
import { mapState } from 'pinia'
import { AccessControlList } from '@/stores/accessControlList'
import { updateAlwaysReadValue } from '@/api/AlwaysRead'
import type { UpdateAlwaysRead } from '@/types/AlwaysRead/UpdateAlwaysRead'
import { getSettingList } from '@/api/Setting'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type IMvcSetting from '@/Interface/IMvcSetting'
import QueryBarcodeModal from '@/components/Layout/QueryBarcodeModal.vue'
import WorkOrderCompositionModal from '@/components/Layout/WorkOrderCompositionModal.vue'
import { getVaule } from '@/api/InquiryBarcode'
import { ModalStatusEnum, AskedEnum } from '@/Enum/enums'

import moment from 'moment'
import { Theme } from '@/stores/theme'
import SvgIcon from '@/components/SvgIcon.vue'

/**
 * 全域變數-URL
 */
const url = window.config.webApi_URL

/**
 * 繫結 icon Component(由renderSvgIcon取代)
 */
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

/**
 * 繫結svg icon
 * @param icon
 */
function renderSvgIcon(icon: string) {
  return () => h(NIcon, null, { default: () => h(SvgIcon, { icon }) })
}

export default defineComponent({
  components: {
    QueryBarcodeModal,
    WorkOrderCompositionModal,
    SvgIcon
  },

  computed: {
    ...mapState(AccessControlList, ['storeAccessControlList']),

    /** 隨著公司名與佈景主題變更logo */
    logoFileName() {
      if (this.selectedTheme) {
        return `${import.meta.env.VITE_LOGOFILE_NAME}`
      } else {
        return `${import.meta.env.VITE_LOGOFILE_NAME}-Dark`
      }
    },

    /** 隨著公司名調整logo高度 */
    logoHeight() {
      switch (import.meta.env.VITE_LOGOFILE_NAME) {
        case 'Logo_SunJsong':
          return 50

        case 'Logo-Sunsda':
          return 40

        default:
          return 30
      }
    }
  },

  mounted() {},

  created() {
    const language = getCookie('Language')
    if (language === null || language === undefined) {
      this.currentLanguage = 'en-US'
      setCookie('Language', this.currentLanguage)
    } else {
      if (language !== undefined) {
        this.currentLanguage = language
        this.$i18n.locale = language
      }
    }

    this.judgeByCookie()
    this.getPartSetting()
    this.setIsOpenQueryBarcodeModal()
    this.getAskNotifyFromSignalR()
    this.refreshTime()
  },

  data() {
    return {
      /**
       * 語系選項
       */
      localeOptions: [
        {
          label: 'English',
          value: 'en-US'
        },
        {
          label: '繁體中文',
          value: 'zh-TW'
        },
        {
          label: '简体中文',
          value: 'zh-CN'
        }
      ],

      /**
       * 是否登入
       */
      isLogin: false,

      /**
       * 是否顯示登入對話框
       */
      showLoginModal: false,

      /**
       * 目前語系
       */
      currentLanguage: 'en-US',

      menuOptions: [] as MenuOption[],

      /**
       * 登入表單
       */
      loginForm: {} as ILoginInput,

      /**
       * 登入結果
       */
      loginResult: {} as IResponseResult,

      /**
       * 使用者資料
       */
      userData: {} as IUser,

      /** 使用者角色存取權限表 */
      accessControlList: [] as IRoleFunction[],

      /** 是否顯示載入中 */
      isShowLoading: false,

      loginSuccess: renderLanguage('LoginSuccess'),
      loginFail: renderLanguage('LoginFail'),
      logoutSuccess: renderLanguage('LogoutSuccess'),

      confirmTitle: renderLanguage('Confirm'),
      restartAlarmContent: renderLanguage('RestartAlarm'),
      sure: renderLanguage('Sure'),
      no: renderLanguage('No'),
      removeErrorSuccess: renderLanguage('RemoveErrorSuccess'),
      removeErrorFail: renderLanguage('RemoveErrorFail'),
      alreadyCancel: renderLanguage('AlreadyCancel'),

      confirmRestartWindowsServiceContext: renderLanguage('ConfirmRestartWindowsService'),
      willRestartWindowsService: renderLanguage('WillRestartWindowsService'),
      RestartWindowsServiceSuccess: renderLanguage('RestartWindowsServiceSuccess'),
      RestartWindowsServiceTimeOut: renderLanguage('RestartWindowsServiceTimeOut'),
      confirmRestartPCContext: renderLanguage('ConfirmRestartPC'),
      willRestartPC: renderLanguage('WillRestartPC'),

      /** com測試設備是否啟用 */
      isComTestMachineEnable: false,

      /** com測試Reader1是否啟用 */
      isComTestReader1Enable: false,

      /** com測試Reader2是否啟用 */
      isComTestReader2Enable: false,

      /** 是否顯示查詢條碼對話框 */
      isOpenQueryBarcodeModal: false,

      /** 是否顯示輸入工單對話框 */
      isOpenWorkOrderModal: false,

      /** 詢問通知 */
      askNotify: '',

      /** 查詢條碼對話框狀態 */
      queryBarcodeModalStatus: ModalStatusEnum.NoAsk,

      /** 輸入工單對話框狀態 */
      workOrderModalStatus: ModalStatusEnum.NoAsk,

      /**
       * 驗證登入欄位
       */
      loginFormRules: {
        Account: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ],
        Password: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ]
      } as FormRules,

      /**
       * provide 全域變數 變更語系
       */
      renewLang: getCookie('Language'),

      nowTime: '',

      /** 選取的佈景主題 */
      selectedTheme: true,

      /** switch Light/Dark style */
      railStyle: ({ focused, checked }: { focused: boolean; checked: boolean }) => {
        const style: CSSProperties = {}
        if (checked) {
          style.background = '#D0D0D0'
          if (focused) {
            style.boxShadow = '0 0 0 2px #d0305040'
          }
        } else {
          style.background = '#272727'
          if (focused) {
            style.boxShadow = '0 0 0 2px #2080f040'
          }
        }
        return style
      },

      /**
       * icon 名稱
       */

      BellOutlinedName: 'BellOutlined',

      LogInIconName: 'LogInIcon',

      LogOutIconName: 'LogOutIcon',

      ReloadSharpName: 'ReloadSharp',

      ServiceName: 'WindowsServicesIcon',

      PowerName: 'Power',

      LightThemeName: 'SunIcon',

      DarkThemeName: 'NightIcon'
    }
  },

  provide() {
    return {
      renewLang: computed(() => this.renewLang),
      selectedTheme: computed(() => this.selectedTheme)
    }
  },

  methods: {
    /**
     * 變更 是否顯示查詢條碼對話框
     * @param source
     */
    changeIsOpenQueryBarcodeModal(source: boolean) {
      this.isOpenQueryBarcodeModal = source
    },

    /**
     * 變更 是否顯示輸入工單對話框
     * @param source
     */
    changeIsOpenWorkOrderModal(source: boolean) {
      this.isOpenWorkOrderModal = source
    },

    /**
     * 加入新項目進選單
     */
    addMenuOptions() {
      const vm = this

      const menuOptionsDashboard = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/'
              }
            },
            renderLanguage('Home')
          ),
        key: 'Dashboard',
        icon: renderSvgIcon('HomeIcon')
      }

      const menuOptionsSetting = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/settings'
              }
            },
            renderLanguage('Setting')
          ),
        key: 'Setting',
        icon: renderSvgIcon('SettingsOutline')
      }

      const menuOptionsAccountAuthorityManage = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: ''
              }
            },
            renderLanguage('Authority.AccountAuthorityManage')
          ),
        key: 'AccountManage',
        icon: renderSvgIcon('PersonIcon'),
        children: []
      }

      const menuOptionUser = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/accountManage/user'
              }
            },
            renderLanguage('User')
          ),
        key: 'User'
      }

      const menuOptionRole = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/accountManage/role'
              }
            },
            renderLanguage('Role')
          ),
        key: 'Role'
      }

      const menuOptionModuleFunctionManage = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/accountManage/functionManage'
              }
            },
            renderLanguage('ModuleFunctionManage')
          ),
        key: 'ModuleFunctionManage'
      }

      const menuOptionComPortTest = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/comPortTest'
              }
            },
            renderLanguage('OutportTest')
          ),
        key: 'ComPortTest',
        icon: renderSvgIcon('NotesTwotone')
      }

      const menuOptionHistory = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/history'
              }
            },
            renderLanguage('History')
          ),
        key: 'History',
        icon: renderSvgIcon('HistoryEduOutlined')
      }

      const menuOptionOptionWord = {
        label: () =>
          h(
            RouterLink,
            {
              to: {
                path: '/optionWord'
              }
            },
            renderLanguage('OptionSetting')
          ),
        key: 'optionWord',
        icon: renderSvgIcon('TextBoxSettings24Regular')
      }

      vm.menuOptions = []

      vm.menuOptions.push(menuOptionsDashboard)
      vm.menuOptions.push(menuOptionHistory)

      //呼叫權限控制api
      const payload: InputIntIdModel = {
        Id: vm.userData.roleId
      }
      getAccessControlList(payload)
        .then((response) => {
          const dataList: IRoleFunction[] = response.data.payload
          const store = AccessControlList()
          store.setGlobalAccessControlList(dataList)

          vm.accessControlList = dataList
          console.log('getAccessControlList dataList', dataList)

          if (dataList === null) {
            return
          }

          dataList.forEach((element) => {
            // if (element.functionCode === 'Dashboard') {
            //   vm.menuOptions.push(menuOptionsDashboard)
            // }

            if (element.functionCode === 'Setting') {
              vm.menuOptions.push(menuOptionsSetting)
            }

            if (element.functionCode === 'AccountAuthorityManage') {
              vm.menuOptions.push(menuOptionsAccountAuthorityManage)
            }

            if (element.functionCode === 'ComPortTest') {
              if (
                vm.isComTestMachineEnable ||
                vm.isComTestReader1Enable ||
                vm.isComTestReader2Enable
              ) {
                vm.menuOptions.push(menuOptionComPortTest)
              }
            }

            if (element.functionCode === 'OptionWordManagement') {
              vm.menuOptions.push(menuOptionOptionWord)
            }
          })
        })
        .finally(() => {
          if (vm.accessControlList === null) {
            return
          }

          vm.accessControlList.forEach((element) => {
            vm.menuOptions.forEach((subItem) => {
              if (subItem.key === 'AccountManage') {
                console.log('AccountManage')
                if (element.functionCode === 'User' && element.isMainFunction) {
                  console.log('subItem User')
                  subItem.children?.push(menuOptionUser)
                }

                if (element.functionCode === 'Role' && element.isMainFunction) {
                  subItem.children?.push(menuOptionRole)
                }

                if (element.functionCode === 'ModuleFunctionManage' && element.isMainFunction) {
                  subItem.children?.push(menuOptionModuleFunctionManage)
                }
              }
            })
          })
        })
    },

    /**
     * 變更語系
     * @param param
     */
    changeToNewLanguege(param: string) {
      const vm = this
      console.log('changeToNewLanguege param', param)
      this.$i18n.locale = param
      vm.renewLang = param
      setCookie('Language', param)
    },

    /**
     * 依照Cookie判斷
     */
    judgeByCookie() {
      const vm = this
      var account = getCookie('Account')
      console.log('getCookie account', account)
      if (account === undefined) {
        vm.userData.code = ''
        vm.userData.name = 'Guest'
        vm.isLogin = false

        vm.addMenuOptions()
      } else {
        vm.userData.code = account
        const input: IAccountInput = {
          Account: vm.userData.code
        }
        getUserProfile(input)
          .then((response) => {
            vm.userData = response.data.payload
            setCookie('RoleName', vm.userData.roleName)
          })
          .then(() => {
            vm.addMenuOptions()
          })
        vm.isLogin = true
      }
    },

    /**
     * 登入
     */
    Login(e: MouseEvent) {
      e.preventDefault()

      const vm = this

      this.$refs['formUser'].validate((errors) => {
        if (errors) {
          console.log(errors)
          window.$message.error('validate invalid!')
        } else {
          login(vm.loginForm).then((response) => {
            console.log('login result', response.data)
            const result: IResponseResult = response.data
            vm.loginResult = result

            switch (result.statusCode) {
              case 200:
                window.$message.success(vm.loginSuccess)
                this.showLoginModal = false
                vm.userData = response.data.payload

                setCookie('Account', vm.userData.code)
                setCookie('RoleName', vm.userData.roleName)

                vm.isLogin = true
                vm.addMenuOptions()
                break
              case 404:
                window.$message.error(vm.loginFail)
                break
            }
          })
        }
      })
    },

    /**
     * 登出
     */
    Logout() {
      const vm = this
      removeCookie('Account')
      removeCookie('RoleName')
      vm.userData = {} as IUser
      vm.userData.name = 'Guest'
      vm.loginForm = {} as ILoginInput
      vm.isLogin = false
      const store = AccessControlList()
      store.removeGlobalAccessControlList()
      window.$message.success(vm.logoutSuccess)
      vm.addMenuOptions()
      router.push({ path: '/' })
    },

    /**
     * 異常排除確認
     */
    resetAlarmBtnConfirm() {
      const vm = this
      window.$dialog.warning({
        title: vm.confirmTitle,
        content: vm.restartAlarmContent,
        positiveText: vm.sure,
        negativeText: vm.no,
        onPositiveClick: () => {
          vm.isShowLoading = true
          const payload: UpdateAlwaysRead = {
            Name: 'ResetAlarm',
            Value: true
          }
          updateAlwaysReadValue(payload).then((response) => {
            if (response.data.statusCode === 200) {
              window.$message.success(vm.removeErrorSuccess)
              vm.finishLoading()
            } else if (response.data.statusCode === 500) {
              window.$message.success(vm.removeErrorFail)
            }
          })
        },
        onNegativeClick: () => {
          window.$message.info(vm.alreadyCancel)
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
    },

    /**
     * 取得部份設定
     */
    getPartSetting() {
      const payload: SettingSearch = {
        Group: 'OutPort',
        Type: '',
        Name: 'Enable'
      }

      getSettingList(payload).then((response) => {
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
      })
    },

    /**
     * 是否顯示查詢條碼對話框 設值
     */
    setIsOpenQueryBarcodeModal() {
      const vm = this
      const payload: IName = {
        Name: 'QBIisAsked'
      }

      getVaule(payload).then((response) => {
        const data: IInquiryBarcode = response.data.payload
        let boolValue = data.value.toLowerCase() === 'true'
        if (boolValue) {
          vm.queryBarcodeModalStatus = ModalStatusEnum.Asking
        } else {
          vm.queryBarcodeModalStatus = ModalStatusEnum.NoAsk
        }
        vm.isOpenQueryBarcodeModal = boolValue
        vm.judgeForAskNotify()
      })
    },

    /**
     * 判斷詢問再變更通知狀態
     */
    judgeForAskNotify() {
      const vm = this
      console.log('this.queryBarcodeModalStatus', vm.queryBarcodeModalStatus)
      if (
        vm.queryBarcodeModalStatus === ModalStatusEnum.Asking ||
        vm.workOrderModalStatus === ModalStatusEnum.Asking
      ) {
        vm.askNotify = 'new'
      } else {
        vm.askNotify = ''
      }
    },

    /**
     * 透過詢問通知開啟哪一個Modal
     */
    openModalFromAskNotify() {
      const vm = this

      if (vm.queryBarcodeModalStatus === ModalStatusEnum.Asking) {
        vm.isOpenQueryBarcodeModal = true
      }

      if (vm.workOrderModalStatus === ModalStatusEnum.Asking) {
        vm.isOpenWorkOrderModal = true
      }
    },

    /**
     * 提交工單完成
     */
    submitWorkOrderFinished() {
      const vm = this
      vm.workOrderModalStatus = ModalStatusEnum.NoAsk
      vm.askNotify = ''
    },

    /**
     * 從SignalR取得服務通知QB或Keyin
     */
    getAskNotifyFromSignalR() {
      const vm = this
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(`${url}/inquiryHub`)
        .withAutomaticReconnect()
        .build()

      try {
        connection.start()
        console.log('getAskNotifyFromSignalR connected')
        connection.on('ServiceNotifyAsk', (message) => {
          console.log('ServiceNotifyAsk', message)
          const receiveData = message as IAskedInputModel

          switch (receiveData.name) {
            case AskedEnum.QB:
              if (receiveData.value === true) {
                vm.queryBarcodeModalStatus = ModalStatusEnum.Asking
              } else {
                vm.queryBarcodeModalStatus = ModalStatusEnum.NoAsk
              }
              vm.isOpenQueryBarcodeModal = receiveData.value
              break

            case AskedEnum.Keyin:
              if (receiveData.value === true) {
                vm.workOrderModalStatus = ModalStatusEnum.Asking
                vm.queryBarcodeModalStatus = ModalStatusEnum.NoAsk
              } else {
                vm.workOrderModalStatus = ModalStatusEnum.NoAsk
              }
              vm.isOpenWorkOrderModal = receiveData.value
              break
          }
          vm.judgeForAskNotify()
        })

        connection.onreconnecting((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Reconnecting)
          const errorMsg = `AskNotify Connection lost due to error "${error}". Reconnecting.`
          window.$message.error(errorMsg)
          console.log('On reconnecting error', errorMsg)
        })

        connection.onreconnected((connectionId) => {
          console.assert(connection.state === signalR.HubConnectionState.Connected)
          const reconnectedMsg = `AskNotify Connection reestablished. Connected with connectionId "${connectionId}".`
          window.$message.success(reconnectedMsg)
          console.log('On reconnected message', reconnectedMsg)
        })

        connection.onclose((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Disconnected)
          const oncloseMsg = `AskNotify Connection closed due to error "${error}". 
          Try refreshing this page to restart the connection.`
          window.$message.success(oncloseMsg)
          console.log('onclose message', oncloseMsg)
        })
      } catch (error) {
        console.log('getAskNotifyFromSignalR error', error)
      }
    },

    /**
     * 定時更新現在時間
     */
    refreshTime() {
      const vm = this
      const interval = setInterval(() => {
        vm.nowTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    },

    /**
     * 變更白天夜晚佈景主題
     * @param selectedValue
     */
    changeToStoreTheme(selectedValue: boolean) {
      console.log('changeToStoreTheme', selectedValue)
      const store = Theme()
      store.setStoreTheme(selectedValue)
    },

    /**
     * 重新啟動Windows Service 確認
     */
    restartWindowsServiceBtnConfirm() {
      const vm = this
      window.$dialog.warning({
        title: vm.confirmTitle,
        content: vm.confirmRestartWindowsServiceContext,
        positiveText: vm.sure,
        negativeText: vm.no,
        onPositiveClick: () => {
          window.$message.info(vm.willRestartWindowsService)
          vm.isShowLoading = true

          restartWindowsService().then((response) => {
            console.log('restartWindowsServiceBtnConfirm response', response)
            if (response.data.statusCode === 200) {
              vm.finishLoading()
              window.$message.success(vm.RestartWindowsServiceSuccess)
            } else if (response.data.statusCode === 500) {
              vm.finishLoading()
              window.$message.error(vm.RestartWindowsServiceTimeOut)
            }
          })
        },
        onNegativeClick: () => {
          window.$message.info(vm.alreadyCancel)
        }
      })
    },

    /**
     * 重新啟動電腦確認
     */
    restartPCBtnConfirm() {
      const vm = this
      window.$dialog.warning({
        title: vm.confirmTitle,
        content: vm.confirmRestartPCContext,
        positiveText: vm.sure,
        negativeText: vm.no,
        onPositiveClick: () => {
          vm.isShowLoading = true

          restartPC().then(() => {
            window.$message.success(vm.willRestartPC)
            vm.finishLoading()
          })
        },
        onNegativeClick: () => {
          window.$message.info(vm.alreadyCancel)
        }
      })
    }
  }
})
</script>

<style lang="scss" src="@/assets/scss/layoutMenu.scss" scoped></style>
