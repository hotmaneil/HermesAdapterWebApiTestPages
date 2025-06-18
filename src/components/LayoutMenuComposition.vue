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

<!-- Composition 組合式寫法-->

<script lang="ts">
import { defineComponent, ref, computed, h, onMounted, provide } from 'vue'
import QueryBarcodeModal from '@/components/Layout/QueryBarcodeModal.vue'
import WorkOrderCompositionModal from '@/components/Layout/WorkOrderCompositionModal.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { AccessControlList } from '@/stores/accessControlList'
import type { MenuOption, FormRules, FormInst } from 'naive-ui'
import { renderLanguage } from '@/utils/Common'
import { ModalStatusEnum, AskedEnum } from '@/Enum/enums'
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import { RouterLink } from 'vue-router'
import { NIcon } from 'naive-ui'
import type InputIntIdModel from '@/Interface/InputIntIdModel'
import {
  getAccessControlList,
  login,
  getUserProfile,
  restartPC,
  restartWindowsService
} from '@/api/System'
import { useI18n } from 'vue-i18n'
import router from '@/router'
import type { UpdateAlwaysRead } from '@/types/AlwaysRead/UpdateAlwaysRead'
import { updateAlwaysReadValue } from '@/api/AlwaysRead'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type IMvcSetting from '@/Interface/IMvcSetting'
import { getSettingList } from '@/api/Setting'
import { getVaule } from '@/api/InquiryBarcode'
import * as signalR from '@microsoft/signalr'
import moment from 'moment'
import { Theme } from '@/stores/theme'
import type { CSSProperties } from 'vue'

export default defineComponent({
  components: {
    QueryBarcodeModal,
    WorkOrderCompositionModal,
    SvgIcon
  },
  setup() {
    /**
     * 全域變數-URL
     */
    const url = window.config.webApi_URL

    const store = AccessControlList()
    const storeAccessControlList = computed(() => store.storeAccessControlList)

    /** 選取的佈景主題 */
    const selectedTheme = ref(true)

    /** 隨著公司名與佈景主題變更logo */
    const logoFileName = computed(() => {
      if (selectedTheme.value) {
        return `${import.meta.env.VITE_LOGOFILE_NAME}`
      } else {
        return `${import.meta.env.VITE_LOGOFILE_NAME}-Dark`
      }
    })

    /** 隨著公司名調整logo高度 */
    const logoHeight = computed(() => {
      switch (import.meta.env.VITE_LOGOFILE_NAME) {
        case 'Logo_SunJsong':
          return 50

        case 'Logo-Sunsda':
          return 40

        default:
          return 30
      }
    })

    /** switch Light/Dark style */
    const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
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
    }

    /**
     *  變更白天夜晚佈景主題
     * @param selectedValue
     */
    function changeToStoreTheme(selectedValue: boolean) {
      console.log('changeToStoreTheme', selectedValue)
      const store = Theme()
      store.setStoreTheme(selectedValue)
    }

    /**
     * 繫結svg icon
     * @param icon
     */
    function renderSvgIcon(icon: string) {
      return () => h(NIcon, null, { default: () => h(SvgIcon, { icon }) })
    }

    /** 語系選項 */
    const localeOptions = [
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
    ]

    /** 是否登入 */
    const isLogin = ref(false)

    /** 是否顯示登入對話框 */
    const showLoginModal = ref(false)

    /** 目前語系 */
    const currentLanguage = ref('en-US')

    /** 取得目前語系 */
    function getCurrentLanguage() {
      const language = getCookie('Language')
      if (language === null || language === undefined) {
        currentLanguage.value = 'en-US'
        setCookie('Language', currentLanguage.value)
      } else {
        if (language !== undefined) {
          currentLanguage.value = language
          locale.value = language
        }
      }
    }

    /** 選單項目列表 */
    const menuOptions = ref([] as MenuOption[])

    /** com測試設備是否啟用 */
    const isComTestMachineEnable = ref(false)

    /** com測試Reader1是否啟用 */
    const isComTestReader1Enable = ref(false)

    /** com測試Reader2是否啟用 */
    const isComTestReader2Enable = ref(false)

    /** 加入新項目進選單 */
    function addMenuOptions() {
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

      menuOptions.value = []

      menuOptions.value.push(menuOptionsDashboard)
      menuOptions.value.push(menuOptionHistory)

      //呼叫權限控制api
      const payload: InputIntIdModel = {
        Id: userData.value.roleId
      }
      getAccessControlList(payload)
        .then((response) => {
          const dataList: IRoleFunction[] = response.data.payload
          const store = AccessControlList()
          store.setGlobalAccessControlList(dataList)

          accessControlList.value = dataList
          console.log('getAccessControlList dataList', dataList)

          if (dataList === null) {
            return
          }

          dataList.forEach((element) => {
            if (element.functionCode === 'Setting') {
              menuOptions.value.push(menuOptionsSetting)
            }

            if (element.functionCode === 'AccountAuthorityManage') {
              menuOptions.value.push(menuOptionsAccountAuthorityManage)
            }

            if (element.functionCode === 'ComPortTest') {
              if (
                isComTestMachineEnable.value ||
                isComTestReader1Enable.value ||
                isComTestReader2Enable.value
              ) {
                menuOptions.value.push(menuOptionComPortTest)
              }
            }

            if (element.functionCode === 'OptionWordManagement') {
              menuOptions.value.push(menuOptionOptionWord)
            }
          })
        })
        .finally(() => {
          if (accessControlList.value === null) {
            return
          }

          accessControlList.value.forEach((element) => {
            menuOptions.value.forEach((subItem) => {
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
    }

    /** 依照Cookie判斷 */
    function judgeByCookie() {
      var account = getCookie('Account')
      console.log('getCookie account', account)
      if (account === undefined) {
        userData.value.code = ''
        userData.value.name = 'Guest'
        isLogin.value = false

        addMenuOptions()
      } else {
        userData.value.code = account
        const input: IAccountInput = {
          Account: userData.value.code
        }
        getUserProfile(input)
          .then((response) => {
            userData.value = response.data.payload
            setCookie('RoleName', userData.value.roleName)
          })
          .then(() => {
            addMenuOptions()
          })
        isLogin.value = true
      }
    }

    /** 取得部份設定 */
    function getPartSetting() {
      const payload: SettingSearch = {
        Group: 'OutPort',
        Type: '',
        Name: 'Enable'
      }

      getSettingList(payload).then((response) => {
        const dataList: IMvcSetting[] = response.data.payload

        const findMachine = dataList.find((x) => x.type === 'Machine')
        if (findMachine !== undefined) {
          let boolValue = findMachine.value.toLowerCase() === 'true'
          isComTestMachineEnable.value = boolValue
        }

        const findReader1 = dataList.find((x) => x.type === 'Reader1')
        if (findReader1 !== undefined) {
          let boolValue = findReader1.value.toLowerCase() === 'true'
          isComTestReader1Enable.value = boolValue
        }

        const findReader2 = dataList.find((x) => x.type === 'Reader2')
        if (findReader2 !== undefined) {
          let boolValue = findReader2.value.toLowerCase() === 'true'
          isComTestReader2Enable.value = boolValue
        }
      })
    }

    /** 登入表單 */
    const loginForm = ref({} as ILoginInput)

    /** 登入結果 */
    const loginResult = ref({} as IResponseResult)

    /** 使用者資料 */
    const userData = ref({} as IUser)

    /** 使用者角色存取權限表 */
    const accessControlList = ref([] as IRoleFunction[])

    const formUser = ref<FormInst | null>(null)

    const loginSuccess = renderLanguage('LoginSuccess')
    const loginFail = renderLanguage('LoginFail')

    /**
     * 登入
     * @param e
     */
    function Login(e: MouseEvent) {
      e.preventDefault()

      formUser.value?.validate((errors) => {
        if (errors) {
          window.$message.error('Valid')
        } else {
          login(loginForm.value).then((response) => {
            console.log('login result', response.data)
            const result: IResponseResult = response.data
            loginResult.value = result

            switch (result.statusCode) {
              case 200:
                window.$message.success(loginSuccess)
                showLoginModal.value = false
                userData.value = response.data.payload

                setCookie('Account', userData.value.code)
                setCookie('RoleName', userData.value.roleName)

                isLogin.value = true
                addMenuOptions()
                break
              case 404:
                window.$message.error(loginFail)
                break
            }
          })
        }
      })
    }

    const logoutSuccess = renderLanguage('LogoutSuccess')

    /** 登出 */
    function Logout() {
      removeCookie('Account')
      removeCookie('RoleName')
      userData.value = {} as IUser
      userData.value.name = 'Guest'
      loginForm.value = {} as ILoginInput
      isLogin.value = false
      const store = AccessControlList()
      store.removeGlobalAccessControlList()
      window.$message.success(logoutSuccess)
      addMenuOptions()
      router.push({ path: '/' })
    }

    /** 是否顯示載入中 */
    const isShowLoading = ref(false)

    const confirmTitle = renderLanguage('Confirm')

    const restartAlarmContent = renderLanguage('RestartAlarm')
    const sure = renderLanguage('Sure')
    const no = renderLanguage('No')
    const removeErrorSuccess = renderLanguage('RemoveErrorSuccess')
    const removeErrorFail = renderLanguage('RemoveErrorFail')
    const alreadyCancel = renderLanguage('AlreadyCancel')

    /** 異常排除確認 */
    function resetAlarmBtnConfirm() {
      window.$dialog.warning({
        title: confirmTitle,
        content: restartAlarmContent,
        positiveText: sure,
        negativeText: no,
        onPositiveClick: () => {
          isShowLoading.value = true
          const payload: UpdateAlwaysRead = {
            Name: 'ResetAlarm',
            Value: true
          }
          updateAlwaysReadValue(payload).then((response) => {
            if (response.data.statusCode === 200) {
              window.$message.success(removeErrorSuccess)
              finishLoading()
            } else if (response.data.statusCode === 500) {
              window.$message.success(removeErrorFail)
            }
          })
        },
        onNegativeClick: () => {
          window.$message.info(alreadyCancel)
        }
      })
    }

    /** 完成載入 */
    function finishLoading() {
      setTimeout(() => {
        isShowLoading.value = false
      }, 1000)
    }

    /** 是否顯示查詢條碼對話框 */
    const isOpenQueryBarcodeModal = ref(false)

    /**
     * 變更 是否顯示查詢條碼對話框
     * @param source
     */
    function changeIsOpenQueryBarcodeModal(source: boolean) {
      isOpenQueryBarcodeModal.value = source
    }

    /** 透過詢問通知開啟哪一個Modal */
    function openModalFromAskNotify() {
      if (queryBarcodeModalStatus.value === ModalStatusEnum.Asking) {
        isOpenQueryBarcodeModal.value = true
      }

      if (workOrderModalStatus.value === ModalStatusEnum.Asking) {
        isOpenWorkOrderModal.value = true
      }
    }

    /** 提交工單完成 */
    function submitWorkOrderFinished() {
      workOrderModalStatus.value = ModalStatusEnum.NoAsk
      askNotify.value = ''
    }

    /** 是否顯示輸入工單對話框 */
    const isOpenWorkOrderModal = ref(false)

    /**
     * 變更 是否顯示輸入工單對話框
     * @param source
     */
    function changeIsOpenWorkOrderModal(source: boolean) {
      isOpenWorkOrderModal.value = source
    }

    /** 詢問通知 */
    const askNotify = ref('')

    /** 查詢條碼對話框狀態 */
    const queryBarcodeModalStatus = ref(ModalStatusEnum.NoAsk)

    /** 輸入工單對話框狀態 */
    const workOrderModalStatus = ref(ModalStatusEnum.NoAsk)

    /** 是否顯示查詢條碼對話框 設值 */
    function setIsOpenQueryBarcodeModal() {
      const payload: IName = {
        Name: 'QBIisAsked'
      }

      getVaule(payload).then((response) => {
        const data: IInquiryBarcode = response.data.payload
        let boolValue = data.value.toLowerCase() === 'true'
        if (boolValue) {
          queryBarcodeModalStatus.value = ModalStatusEnum.Asking
        } else {
          queryBarcodeModalStatus.value = ModalStatusEnum.NoAsk
        }
        isOpenQueryBarcodeModal.value = boolValue
        judgeForAskNotify()
      })
    }

    /** 判斷詢問再變更通知狀態 */
    function judgeForAskNotify() {
      console.log('queryBarcodeModalStatus', queryBarcodeModalStatus)
      if (
        queryBarcodeModalStatus.value === ModalStatusEnum.Asking ||
        workOrderModalStatus.value === ModalStatusEnum.Asking
      ) {
        askNotify.value = 'new'
      } else {
        askNotify.value = ''
      }
    }

    /** 從SignalR取得服務通知QB或Keyin */
    function getAskNotifyFromSignalR() {
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
                queryBarcodeModalStatus.value = ModalStatusEnum.Asking
              } else {
                queryBarcodeModalStatus.value = ModalStatusEnum.NoAsk
              }
              isOpenQueryBarcodeModal.value = receiveData.value
              break

            case AskedEnum.Keyin:
              if (receiveData.value === true) {
                workOrderModalStatus.value = ModalStatusEnum.Asking
                queryBarcodeModalStatus.value = ModalStatusEnum.NoAsk
              } else {
                workOrderModalStatus.value = ModalStatusEnum.NoAsk
              }
              isOpenWorkOrderModal.value = receiveData.value
              break
          }
          judgeForAskNotify()
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
    }

    /** 驗證登入欄位 */
    const loginFormRules = ref({
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
    } as FormRules)

    /** provide 全域變數 變更語系 */
    const renewLang = ref(getCookie('Language'))

    const { t, locale } = useI18n({ useScope: 'global' })

    /**
     * 變更語系
     * @param param
     */
    function changeToNewLanguege(param: string) {
      console.log('changeToNewLanguege param', param)
      locale.value = param
      renewLang.value = param
      setCookie('Language', param)
    }

    const nowTime = ref('')

    /** 定時更新現在時間 */
    function refreshTime() {
      const interval = setInterval(() => {
        nowTime.value = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      }, 1000)
    }

    const confirmRestartWindowsServiceContext = renderLanguage('ConfirmRestartWindowsService')
    const willRestartWindowsService = renderLanguage('WillRestartWindowsService')
    const RestartWindowsServiceSuccess = renderLanguage('RestartWindowsServiceSuccess')
    const RestartWindowsServiceTimeOut = renderLanguage('RestartWindowsServiceTimeOut')
    const confirmRestartPCContext = renderLanguage('ConfirmRestartPC')
    const willRestartPC = renderLanguage('WillRestartPC')

    /**
     * 重新啟動Windows Service 確認
     */
    function restartWindowsServiceBtnConfirm() {
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
    }

    /**
     * 重新啟動電腦確認
     */
    function restartPCBtnConfirm() {
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

    /**
     * icon 名稱 區域
     */

    const BellOutlinedName = ref('BellOutlined')
    const LogInIconName = ref('LogInIcon')
    const LogOutIconName = ref('LogOutIcon')
    const ReloadSharpName = ref('ReloadSharp')
    const ServiceName = ref('WindowsServicesIcon')
    const PowerName = ref('Power')
    const LightThemeName = ref('SunIcon')
    const DarkThemeName = ref('NightIcon')

    provide(
      'renewLang',
      computed(() => renewLang.value)
    )
    provide(
      'selectedTheme',
      computed(() => selectedTheme.value)
    )

    onMounted(() => {
      getCurrentLanguage()
      judgeByCookie()
      getPartSetting()
      setIsOpenQueryBarcodeModal()
      getAskNotifyFromSignalR()
      refreshTime()
    })

    return {
      storeAccessControlList,

      renderSvgIcon,

      logoFileName,
      logoHeight,
      localeOptions,
      isLogin,
      showLoginModal,
      currentLanguage,
      getCurrentLanguage,

      isComTestMachineEnable,
      isComTestReader1Enable,
      isComTestReader2Enable,
      menuOptions,
      addMenuOptions,
      judgeByCookie,
      getPartSetting,

      loginForm,
      loginResult,
      userData,
      accessControlList,

      formUser,
      loginSuccess,
      loginFail,
      Login,

      logoutSuccess,
      Logout,

      isShowLoading,
      resetAlarmBtnConfirm,

      confirmTitle,
      restartAlarmContent,
      sure,
      no,
      removeErrorSuccess,
      removeErrorFail,
      alreadyCancel,
      finishLoading,

      isOpenQueryBarcodeModal,
      changeIsOpenQueryBarcodeModal,
      openModalFromAskNotify,
      submitWorkOrderFinished,

      isOpenWorkOrderModal,
      changeIsOpenWorkOrderModal,

      askNotify,
      queryBarcodeModalStatus,
      workOrderModalStatus,
      setIsOpenQueryBarcodeModal,
      getAskNotifyFromSignalR,

      loginFormRules,

      renewLang,
      t,
      locale,
      changeToNewLanguege,

      nowTime,
      refreshTime,

      selectedTheme,
      changeToStoreTheme,
      railStyle,

      confirmRestartWindowsServiceContext,
      willRestartWindowsService,
      RestartWindowsServiceSuccess,
      RestartWindowsServiceTimeOut,
      confirmRestartPCContext,
      willRestartPC,
      restartWindowsServiceBtnConfirm,
      restartPCBtnConfirm,

      BellOutlinedName,
      LogInIconName,
      LogOutIconName,
      ReloadSharpName,
      ServiceName,
      PowerName,
      LightThemeName,
      DarkThemeName
    }
  }
})
</script>

<style lang="scss" src="@/assets/scss/layoutMenu.scss" scoped></style>
