<template>
  <n-spin size="large" :show="isShowLoading">
    <n-button type="info" ghost @click="handleSaveButtonClick" v-if="isEnableSaveBtn">
      {{ $t('Save') }}
    </n-button>
    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-card title="Hermes">
          <n-form ref="formHermes" :model="hermesFormData" :rules="hermesFormRules">
            <n-form-item path="Enable" :label="$t('Settings.Enable')">
              <n-switch v-model:value="hermesFormData.Enable" disabled />
            </n-form-item>

            <n-form-item path="Version" :label="$t('Settings.Version')">
              <n-select v-model:value="hermesFormData.Version" :options="versionDropDownList" />
            </n-form-item>

            <n-form-item path="CheckAliveInterval" :label="$t('Settings.CheckAliveInterval')">
              <n-input-number
                :min="0"
                v-model:value="hermesFormData.CheckAliveInterval"
                @keydown.enter.prevent
              />
            </n-form-item>

            <n-form-item path="QueryResponseTimeout" :label="$t('Settings.QueryResponseTimeout')">
              <n-input-number
                :min="0.01"
                :step="0.01"
                v-model:value="hermesFormData.QueryResponseTimeout"
                @keydown.enter.prevent
              />
            </n-form-item>

            <n-form-item
              path="StratTransportDelayTime"
              :label="$t('Settings.StratTransportDelayTime')"
            >
              <n-input-number v-model:value="hermesFormData.StratTransportDelayTime" />
            </n-form-item>

            <n-form-item
              path="Reserved_quantity"
              :label="$t('Settings.Reserved_quantity')"
              v-if="hermesFormData.Version > 130"
            >
              <n-input-number
                :min="0"
                v-model:value="hermesFormData.Reserved_quantity"
                @keydown.enter.prevent
              />
            </n-form-item>

            <n-form-item
              path="Command_effect"
              :label="$t('Settings.Command_effect')"
              v-if="hermesFormData.Version > 130"
            >
              <n-switch v-model:value="hermesFormData.Command_effect" />
            </n-form-item>

            <n-form-item
              path="Command_Path"
              :label="$t('Settings.Command_Path')"
              v-if="hermesFormData.Version > 130"
            >
              <n-select
                v-model:value="hermesFormData.Command_Path"
                :options="commandPathDropDownList"
              />
            </n-form-item>

            <n-form-item
              path="Give_Command_Order"
              :label="$t('Settings.Give_Command_Order')"
              v-if="hermesFormData.Version > 130"
            >
              <n-switch v-model:value="hermesFormData.Give_Command_Order" />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :title="$t('Settings.Supervisory')">
          <n-form ref="formSupervisory" :model="supervisoryFormData" :rules="supervisoryFormRules">
            <n-form-item path="Enable" :label="$t('Settings.Enable')">
              <n-switch v-model:value="supervisoryFormData.Enable" />
            </n-form-item>

            <n-form-item path="Port" :label="$t('Settings.Port')">
              <n-input-number
                v-model:value="supervisoryFormData.Port"
                @keydown.enter.prevent
                :min="0"
              />
            </n-form-item>

            <n-form-item path="CheckAliveResponse" :label="$t('Settings.CheckAliveResponse')">
              <n-switch v-model:value="supervisoryFormData.CheckAliveResponse" />
            </n-form-item>

            <n-form-item path="QueryWorkOrderInfo" :label="$t('Settings.QueryWorkOrderInfo')">
              <n-switch v-model:value="supervisoryFormData.QueryWorkOrderInfo" />
            </n-form-item>

            <n-form-item path="SendWorkOrderInfo" :label="$t('Settings.SendWorkOrderInfo')">
              <n-switch v-model:value="supervisoryFormData.SendWorkOrderInfo" />
            </n-form-item>

            <n-form-item path="Configuration" :label="$t('Settings.Configuration')">
              <n-switch v-model:value="supervisoryFormData.Configuration" />
            </n-form-item>

            <n-form-item path="BoardTracking" :label="$t('Settings.BoardTracking')">
              <n-switch v-model:value="supervisoryFormData.BoardTracking" />
            </n-form-item>

            <n-form-item
              path="ReplyWorkOrderInfo"
              :label="$t('Settings.ReplyWorkOrderInfo')"
              v-if="hermesFormData.Version > 130"
            >
              <n-switch v-model:value="supervisoryFormData.ReplyWorkOrderInfo" />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :title="$t('Settings.Upstream')">
          <n-form ref="formUpstream" :model="upstreamFormData" :rules="upstreamFormRules">
            <n-form-item path="Enable" :label="$t('Settings.Enable')">
              <n-switch v-model:value="upstreamFormData.Enable" />
            </n-form-item>

            <n-form-item path="IP" :label="$t('Settings.TCPIP')">
              <n-input v-model:value="upstreamFormData.IP" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="Port" :label="$t('Settings.TCPPort')">
              <n-input-number v-model:value="upstreamFormData.Port" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="CheckAliveResponse" :label="$t('Settings.CheckAliveResponse')">
              <n-switch v-model:value="upstreamFormData.CheckAliveResponse" />
            </n-form-item>

            <n-form-item path="QueryBoardInfo" :label="$t('Settings.QueryBoardInfo')">
              <n-switch v-model:value="upstreamFormData.QueryBoardInfo" />
            </n-form-item>

            <n-form-item path="BoardForecast" :label="$t('Settings.BoardForecast')">
              <n-switch v-model:value="upstreamFormData.BoardForecast" />
            </n-form-item>

            <n-form-item
              path="Command"
              :label="$t('Settings.Command')"
              v-if="hermesFormData.Version > 130"
            >
              <n-switch v-model:value="upstreamFormData.Command" />
            </n-form-item>

            <n-form-item path="Order" :label="$t('Settings.Order')">
              <n-select v-model:value="upstreamFormData.Order" :options="orderDropDownList" />
            </n-form-item>

            <n-form-item path="BreakStatusTime" :label="$t('Settings.BreakStatusTime')">
              <n-input-number
                v-model:value="upstreamFormData.BreakStatusTime"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
      <n-gi>
        <n-card :title="$t('Settings.Downstream')">
          <n-form ref="formDownstream" :model="downstreamFormData" :rules="downstreamFormRules">
            <n-form-item path="Enable" :label="$t('Settings.Enable')">
              <n-switch v-model:value="downstreamFormData.Enable" />
            </n-form-item>

            <n-form-item path="IP" :label="$t('Settings.TCPIP')">
              <n-input v-model:value="downstreamFormData.IP" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="Port" :label="$t('Settings.TCPPort')">
              <n-input-number v-model:value="downstreamFormData.Port" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="CheckAliveResponse" :label="$t('Settings.CheckAliveResponse')">
              <n-switch v-model:value="downstreamFormData.CheckAliveResponse" />
            </n-form-item>

            <n-form-item path="SendBoardInfo" :label="$t('Settings.SendBoardInfo')">
              <n-switch v-model:value="downstreamFormData.SendBoardInfo" />
            </n-form-item>

            <n-form-item path="BoardForecast" :label="$t('Settings.BoardForecast')">
              <n-switch v-model:value="downstreamFormData.BoardForecast" />
            </n-form-item>

            <n-form-item
              path="Command"
              :label="$t('Settings.Command')"
              v-if="hermesFormData.Version > 130"
            >
              <n-switch v-model:value="downstreamFormData.Command" />
            </n-form-item>

            <n-form-item path="Order" :label="$t('Settings.Order')">
              <n-select v-model:value="downstreamFormData.Order" :options="orderDropDownList" />
            </n-form-item>

            <n-form-item path="BreakStatusTime" :label="$t('Settings.BreakStatusTime')">
              <n-input-number
                v-model:value="downstreamFormData.BreakStatusTime"
                @keydown.enter.prevent
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
    <n-button type="info" ghost @click="handleSaveButtonClick" v-if="isEnableSaveBtn">
      {{ $t('Save') }}
    </n-button>
  </n-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FormRules } from 'naive-ui'
import type { IHermesFormColumn } from '@/Interface/Setting/IHermesFormColumn'
import type { ISupervisoryFormColumn } from '@/Interface/Setting/ISupervisoryFormColumn'
import type { IUpstreamFormColumn } from '@/Interface/Setting/IUpstreamFormColumn'
import type { IDownstreamFormColumn } from '@/Interface/Setting/IDownstreamFormColumn'
import { getSettingList, getVersionDropDownList, updateSettingByList } from '@/api/Setting'
import type { DropDownList } from '@/types/DropDownList'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'
import { getCookie } from 'typescript-cookie'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import { getOptionWordDetailList } from '@/api/OptionWord'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type IMvcSetting from '@/Interface/IMvcSetting'
import type { UpdateParam } from '@/types/Setting/UpdateParam'
import {
  renderLanguage,
  updateAlwaysRead,
  returnIntValueFromSource,
  returnBoolValueFromSource,
  returnStringValueFromSource
} from '@/utils/Common'
import { setCookie } from 'typescript-cookie'
import { mapState } from 'pinia'
import { AccessControlList } from '@/stores/accessControlList'
import { readAlwaysReadValue } from '@/api/AlwaysRead'
import type { UpdateParamUser } from '@/types/Setting/UpdateParamUser'
import { AlwaysReadParamEnum } from '@/Enum/enums'

export default defineComponent({
  inject: ['renewLang'],
  computed: {
    ...mapState(AccessControlList, ['storeAccessControlList'])
  },
  watch: {
    renewLang: {
      handler(val, oldVal) {
        console.log(`renewLang handler val: ${val},oldVal:${oldVal}`)
        this.SetCommandPathDropDownList()
        this.SetOrderDropDownList()
      },
      deep: true
    }
  },
  data() {
    return {
      hermesFormData: {} as IHermesFormColumn,
      supervisoryFormData: {} as ISupervisoryFormColumn,
      upstreamFormData: {} as IUpstreamFormColumn,
      downstreamFormData: {} as IDownstreamFormColumn,

      versionDropDownList: [] as DropDownList[],
      commandPathDropDownList: [] as DropDownList[],
      orderDropDownList: [] as DropDownList[],

      hermesFormRules: {
        CheckAliveInterval: [
          {
            required: true,
            type: 'number',
            trigger: ['input', 'blur', 'change']
          }
        ],
        QueryResponseTimeout: [
          {
            required: true,
            type: 'number',
            trigger: ['input', 'blur', 'change']
          }
        ]
      } as FormRules,

      supervisoryFormRules: {
        Port: [
          {
            required: true,
            type: 'number',
            trigger: ['input', 'blur', 'change']
          }
        ]
      } as FormRules,

      upstreamFormRules: {
        IP: [
          {
            required: true,
            trigger: ['input', 'blur']
          }
        ],
        Port: [
          {
            required: true,
            type: 'number',
            trigger: ['input', 'blur', 'change']
          }
        ]
      } as FormRules,

      downstreamFormRules: {} as FormRules,

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
    this.SetVersionDropDownList()
    this.SetCommandPathDropDownList()
    this.SetOrderDropDownList()
    this.GetHermesSettingList()
    this.GetSupervisorySettingList()
    this.GetUpstreamSettingList()
    this.GetDownstreamSettingList()
    this.getAccessControl()
  },

  methods: {
    /** 取得存取權限 */
    getAccessControl() {
      const vm = this
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        vm.storeAccessControlList.forEach((element) => {
          if (element.functionCode === 'Hermes' && element.functionActionName === 'Modify') {
            vm.isEnableSaveBtn = true
          }
        })
      }
    },

    /**
     * 建立版本下拉選單
     */
    SetVersionDropDownList() {
      const vm = this

      getVersionDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.versionDropDownList = dataList
      })
    },

    /**
     * 建立命令作用方向下拉選單
     */
    SetCommandPathDropDownList() {
      const vm = this
      vm.commandPathDropDownList = []
      const language = getCookie('Language')
      if (language !== undefined) {
        const payload: OptionWordSearch = {
          OptionWordId: undefined,
          OptionWordName: 'CommandPath',
          Language: language
        }

        getOptionWordDetailList(payload).then((response) => {
          const dataList: IOptionWordDetail[] = response.data

          dataList.forEach((element) => {
            let option: DropDownList = {
              label: element.languageContext,
              value: parseInt(element.value)
            }
            vm.commandPathDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 建立發送BA及MR先後順序之下拉選單
     */
    SetOrderDropDownList() {
      const vm = this
      vm.orderDropDownList = []
      const language = getCookie('Language')
      if (language !== undefined) {
        const payload: OptionWordSearch = {
          OptionWordId: undefined,
          OptionWordName: 'HermesOrder',
          Language: language
        }

        getOptionWordDetailList(payload).then((response) => {
          const dataList: IOptionWordDetail[] = response.data

          dataList.forEach((element) => {
            let option: DropDownList = {
              label: element.languageContext,
              value: parseInt(element.value)
            }
            vm.orderDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 取得Hermes設定列表
     */
    GetHermesSettingList() {
      const payload: SettingSearch = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload

        vm.hermesFormData.Enable = returnBoolValueFromSource(dataList, 'Hermes', 'Enable')
        vm.hermesFormData.Version = returnIntValueFromSource(dataList, 'Hermes', 'Version')

        vm.hermesFormData.CheckAliveInterval = returnIntValueFromSource(
          dataList,
          'Hermes',
          'CheckAliveInterval'
        )

        vm.hermesFormData.QueryResponseTimeout = returnIntValueFromSource(
          dataList,
          'Hermes',
          'QueryResponseTimeout'
        )

        vm.hermesFormData.StratTransportDelayTime = returnIntValueFromSource(
          dataList,
          'Hermes',
          'StratTransportDelayTime'
        )

        vm.hermesFormData.Reserved_quantity = returnIntValueFromSource(
          dataList,
          'Hermes',
          'Reserved_quantity'
        )

        const findCommand_effect = dataList.find((x) => x.name === 'Command_effect')
        if (findCommand_effect !== undefined) {
          let boolValue = findCommand_effect.value.toLowerCase() === 'true'
          vm.hermesFormData.Command_effect = boolValue
        }

        vm.hermesFormData.Command_Path = returnIntValueFromSource(
          dataList,
          'Hermes',
          'Command_Path'
        )

        vm.hermesFormData.Give_Command_Order = returnBoolValueFromSource(
          dataList,
          'Hermes',
          'Give_Command_Order'
        )
      })
    },

    /**
     * 取得 Supervisory(Hermes 上位)設定列表
     */
    GetSupervisorySettingList() {
      const payload: SettingSearch = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload

        vm.supervisoryFormData.Enable = returnBoolValueFromSource(dataList, 'Supervisory', 'Enable')
        vm.supervisoryFormData.Port = returnIntValueFromSource(dataList, 'Supervisory', 'Port')

        vm.supervisoryFormData.CheckAliveResponse = returnBoolValueFromSource(
          dataList,
          'Supervisory',
          'CheckAliveResponse'
        )

        vm.supervisoryFormData.QueryWorkOrderInfo = returnBoolValueFromSource(
          dataList,
          'Supervisory',
          'QueryWorkOrderInfo'
        )

        vm.supervisoryFormData.SendWorkOrderInfo = returnBoolValueFromSource(
          dataList,
          'Supervisory',
          'SendWorkOrderInfo'
        )

        vm.supervisoryFormData.Configuration = returnBoolValueFromSource(
          dataList,
          'Supervisory',
          'Configuration'
        )

        vm.supervisoryFormData.BoardTracking = returnBoolValueFromSource(
          dataList,
          'Supervisory',
          'BoardTracking'
        )

        vm.supervisoryFormData.ReplyWorkOrderInfo = returnBoolValueFromSource(
          dataList,
          'Supervisory',
          'ReplyWorkOrderInfo'
        )
      })
    },

    /**
     * 取得 Upstream(Hermes 上游)設定列表
     */
    GetUpstreamSettingList() {
      const payload: SettingSearch = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload

        vm.upstreamFormData.Enable = returnBoolValueFromSource(dataList, 'Upstream', 'Enable')
        vm.upstreamFormData.IP = returnStringValueFromSource(dataList, 'Upstream', 'IP')
        vm.upstreamFormData.Port = returnIntValueFromSource(dataList, 'Upstream', 'Port')
        vm.upstreamFormData.CheckAliveResponse = returnBoolValueFromSource(
          dataList,
          'Upstream',
          'CheckAliveResponse'
        )

        vm.upstreamFormData.BoardForecast = returnBoolValueFromSource(
          dataList,
          'Upstream',
          'BoardForecast'
        )

        vm.upstreamFormData.QueryBoardInfo = returnBoolValueFromSource(
          dataList,
          'Upstream',
          'QueryBoardInfo'
        )

        vm.upstreamFormData.Command = returnBoolValueFromSource(dataList, 'Upstream', 'Command')
        vm.upstreamFormData.Order = returnIntValueFromSource(dataList, 'Upstream', 'Order')
        vm.upstreamFormData.BreakStatusTime = returnIntValueFromSource(
          dataList,
          'Upstream',
          'BreakStatusTime'
        )
      })
    },

    /**
     * 取得 Downstream(Hermes 下游)設定列表
     */
    GetDownstreamSettingList() {
      const payload: SettingSearch = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload

        vm.downstreamFormData.Enable = returnBoolValueFromSource(dataList, 'Downstream', 'Enable')
        vm.downstreamFormData.IP = returnStringValueFromSource(dataList, 'Downstream', 'IP')
        vm.downstreamFormData.Port = returnIntValueFromSource(dataList, 'Downstream', 'Port')

        vm.downstreamFormData.CheckAliveResponse = returnBoolValueFromSource(
          dataList,
          'Downstream',
          'CheckAliveResponse'
        )

        vm.downstreamFormData.BoardForecast = returnBoolValueFromSource(
          dataList,
          'Downstream',
          'BoardForecast'
        )

        vm.downstreamFormData.SendBoardInfo = returnBoolValueFromSource(
          dataList,
          'Downstream',
          'SendBoardInfo'
        )

        vm.downstreamFormData.Command = returnBoolValueFromSource(dataList, 'Downstream', 'Command')
        vm.downstreamFormData.Order = returnIntValueFromSource(dataList, 'Downstream', 'Order')
        vm.downstreamFormData.BreakStatusTime = returnIntValueFromSource(
          dataList,
          'Downstream',
          'BreakStatusTime'
        )
      })
    },

    /**
     * 儲存按鈕事件
     * @param e
     */
    handleSaveButtonClick(e: MouseEvent) {
      e.preventDefault()

      const vm = this
      vm.isShowLoading = true

      let updateList: UpdateParam[] = []

      /**
       * Hermes
       */

      let hermesCheckAliveInterval: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'CheckAliveInterval',
        Value: vm.hermesFormData.CheckAliveInterval.toString()
      }
      updateList.push(hermesCheckAliveInterval)

      let hermesQueryResponseTimeout: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'QueryResponseTimeout',
        Value: vm.hermesFormData.QueryResponseTimeout.toString()
      }
      updateList.push(hermesQueryResponseTimeout)

      let hermesVersion: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'Version',
        Value: vm.hermesFormData.Version.toString()
      }
      updateList.push(hermesVersion)

      let hermesStratTransportDelayTime: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'StratTransportDelayTime',
        Value: vm.hermesFormData.StratTransportDelayTime.toString()
      }
      updateList.push(hermesStratTransportDelayTime)

      let hermesReserved_quantity: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'Reserved_quantity',
        Value: vm.hermesFormData.Reserved_quantity.toString()
      }
      updateList.push(hermesReserved_quantity)

      let hermesCommand_effect: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'Command_effect',
        Value: vm.hermesFormData.Command_effect ? 'true' : 'false'
      }
      updateList.push(hermesCommand_effect)

      let hermesCommand_Path: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'Command_Path',
        Value: vm.hermesFormData.Command_Path.toString()
      }
      updateList.push(hermesCommand_Path)

      let hermesGive_Command_Order: UpdateParam = {
        Group: 'Hermes',
        Type: 'Hermes',
        Name: 'Give_Command_Order',
        Value: vm.hermesFormData.Give_Command_Order ? 'true' : 'false'
      }
      updateList.push(hermesGive_Command_Order)

      /**
       * Supervisory
       */
      let supervisoryEnable: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'Enable',
        Value: vm.supervisoryFormData.Enable ? 'true' : 'false'
      }
      updateList.push(supervisoryEnable)

      let supervisoryPort: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'Port',
        Value: vm.supervisoryFormData.Port.toString()
      }
      updateList.push(supervisoryPort)

      let supervisoryCheckAliveResponse: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'CheckAliveResponse',
        Value: vm.supervisoryFormData.CheckAliveResponse ? 'true' : 'false'
      }
      updateList.push(supervisoryCheckAliveResponse)

      let supervisoryConfiguration: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'Configuration',
        Value: vm.supervisoryFormData.Configuration ? 'true' : 'false'
      }
      updateList.push(supervisoryConfiguration)

      let supervisoryBoardTracking: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'BoardTracking',
        Value: vm.supervisoryFormData.BoardTracking ? 'true' : 'false'
      }
      updateList.push(supervisoryBoardTracking)

      let supervisoryQueryWorkOrderInfo: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'QueryWorkOrderInfo',
        Value: vm.supervisoryFormData.QueryWorkOrderInfo ? 'true' : 'false'
      }
      updateList.push(supervisoryQueryWorkOrderInfo)

      let supervisorySendWorkOrderInfo: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'SendWorkOrderInfo',
        Value: vm.supervisoryFormData.SendWorkOrderInfo ? 'true' : 'false'
      }
      updateList.push(supervisorySendWorkOrderInfo)

      let supervisoryReplyWorkOrderInfo: UpdateParam = {
        Group: 'Hermes',
        Type: 'Supervisory',
        Name: 'ReplyWorkOrderInfo',
        Value: vm.supervisoryFormData.ReplyWorkOrderInfo ? 'true' : 'false'
      }
      updateList.push(supervisoryReplyWorkOrderInfo)

      /**
       * Upstream
       */
      let upstreamEnable: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'Enable',
        Value: vm.upstreamFormData.Enable ? 'true' : 'false'
      }
      updateList.push(upstreamEnable)

      let upstreamIP: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'IP',
        Value: vm.upstreamFormData.IP
      }
      updateList.push(upstreamIP)

      let upstreamPort: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'Port',
        Value: vm.upstreamFormData.Port.toString()
      }
      updateList.push(upstreamPort)

      let upstreamCheckAliveResponse: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'CheckAliveResponse',
        Value: vm.upstreamFormData.CheckAliveResponse ? 'true' : 'false'
      }
      updateList.push(upstreamCheckAliveResponse)

      let upstreamBoardForecast: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'BoardForecast',
        Value: vm.upstreamFormData.BoardForecast ? 'true' : 'false'
      }
      updateList.push(upstreamBoardForecast)

      let upstreamQueryBoardInfo: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'QueryBoardInfo',
        Value: vm.upstreamFormData.QueryBoardInfo ? 'true' : 'false'
      }
      updateList.push(upstreamQueryBoardInfo)

      let upstreamCommand: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'Command',
        Value: vm.upstreamFormData.Command ? 'true' : 'false'
      }
      updateList.push(upstreamCommand)

      let upstreamOrder: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'Order',
        Value: vm.upstreamFormData.Order.toString()
      }
      updateList.push(upstreamOrder)

      let upstreamBreakStatusTime: UpdateParam = {
        Group: 'Hermes',
        Type: 'Upstream',
        Name: 'BreakStatusTime',
        Value: vm.upstreamFormData.BreakStatusTime.toString()
      }
      updateList.push(upstreamBreakStatusTime)

      /**
       * Downstream
       */

      let downstreamEnable: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'Enable',
        Value: vm.downstreamFormData.Enable ? 'true' : 'false'
      }
      updateList.push(downstreamEnable)

      let downstreamIP: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'IP',
        Value: vm.downstreamFormData.IP
      }
      updateList.push(downstreamIP)

      let downstreamPort: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'Port',
        Value: vm.downstreamFormData.Port.toString()
      }
      updateList.push(downstreamPort)

      let downstreamCheckAliveResponse: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'CheckAliveResponse',
        Value: vm.downstreamFormData.CheckAliveResponse ? 'true' : 'false'
      }
      updateList.push(downstreamCheckAliveResponse)

      let downstreamBoardForecast: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'BoardForecast',
        Value: vm.downstreamFormData.BoardForecast ? 'true' : 'false'
      }
      updateList.push(downstreamBoardForecast)

      let downstreamQueryBoardInfo: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'SendBoardInfo',
        Value: vm.downstreamFormData.SendBoardInfo ? 'true' : 'false'
      }
      updateList.push(downstreamQueryBoardInfo)

      let downstreamCommand: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'Command',
        Value: vm.downstreamFormData.Command ? 'true' : 'false'
      }
      updateList.push(downstreamCommand)

      let downstreamOrder: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'Order',
        Value: vm.downstreamFormData.Order.toString()
      }
      updateList.push(downstreamOrder)

      let downstreamBreakStatusTime: UpdateParam = {
        Group: 'Hermes',
        Type: 'Downstream',
        Name: 'BreakStatusTime',
        Value: vm.downstreamFormData.BreakStatusTime.toString()
      }
      updateList.push(downstreamBreakStatusTime)

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
            updateAlwaysRead(AlwaysReadParamEnum.HermesChange)
            vm.rememberVersionNumber()
            vm.finishLoadingByAlwaysRead()
          } else if (response.data.statusCode == 500) {
            window.$message.error(vm.saveFail)
          }
        })
        .catch((error) => {
          console.log('updateSettingByList error', error)
          window.$message.error(error.code)
          vm.finishLoading()
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
     * 先讀取經常讀取值做判斷並完成載入
     */
    finishLoadingByAlwaysRead() {
      var vm = this

      //定時詢問DB確認是否回寫完成
      let count = 0
      const interval = setInterval(function () {
        count++
        const payload: IAlwaysReadSearch = {
          Name: AlwaysReadParamEnum.HermesChange
        }
        readAlwaysReadValue(payload).then((response) => {
          if (response.data.statusCode == 200) {
            const data: IAlwaysRead = response.data.payload
            if (data.value === false) {
              vm.isShowLoading = false
              clearInterval(interval)
            }
          } else if (response.data.statusCode == 500) {
            console.log('readAlwaysReadValue HermesChange fail!')
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
    },

    /** 記憶版本號碼 */
    rememberVersionNumber() {
      const vm = this
      setCookie('VersionNumber', vm.hermesFormData.Version)
    }
  }
})
</script>
