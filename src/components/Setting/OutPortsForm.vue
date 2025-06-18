<template>
  <n-spin size="large" :show="isShowLoading">
    <n-button type="info" ghost @click="saveButtonClick" v-if="isEnableSaveBtn">
      {{ $t('Save') }}
    </n-button>
    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <n-card title="BarCode Readers">
          <n-form ref="barcodeReaderOneForm" :model="readerOneForm">
            <n-form-item path="readerOneForm" :label="$t('Settings.Writetimeout')">
              <n-input v-model:value="readerOneForm.WriteTimeout" @keydown.enter.prevent />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>

    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-card title="Barcode Reader 1">
          <n-form ref="barcodeReaderOneForm" :model="readerOneForm">
            <n-form-item path="Linkby" :label="$t('Settings.Linkby')">
              <n-select v-model:value="readerOneForm.Name" :options="linkbyDropDownList" disabled />
            </n-form-item>

            <n-form-item path="Enable" :label="$t('Settings.Enable')">
              <n-switch v-model:value="readerOneForm.Enable" />
            </n-form-item>

            <n-form-item path="Port" :label="$t('Settings.Port')">
              <n-select v-model:value="readerOneForm.Port" :options="portDropDownList" />
            </n-form-item>

            <n-form-item path="start_message" :label="$t('Settings.STmessage')">
              <n-input v-model:value="readerOneForm.start_message" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="read_failure_message" :label="$t('Settings.ERRmessage')">
              <n-input v-model:value="readerOneForm.read_failure_message" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item
              path="IP"
              :label="$t('Settings.TCPIP')"
              v-if="readerOneForm.Port === 'RJ45'"
            >
              <n-input v-model:value="readerOneForm.IP" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item
              path="TCP_port"
              :label="$t('Settings.TCPPort')"
              v-if="readerOneForm.Port === 'RJ45'"
            >
              <n-input v-model:value="readerOneForm.TCP_port" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item
              path="Format"
              :label="$t('Settings.Format')"
              v-if="readerOneForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerOneForm.Type" :options="formatTypeDropDownList" />
            </n-form-item>

            <n-form-item
              path="BaudRate"
              :label="$t('Settings.BaudRate')"
              v-if="readerOneForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerOneForm.BaudRate" :options="baudRateDropDownList" />
            </n-form-item>

            <n-form-item
              path="Parity"
              :label="$t('Settings.Parity')"
              v-if="readerOneForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerOneForm.Parity" :options="parityDropDownList" />
            </n-form-item>

            <n-form-item
              path="DataBits"
              :label="$t('Settings.DataBits')"
              v-if="readerOneForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerOneForm.DataBits" :options="dataBitsDropDownList" />
            </n-form-item>

            <n-form-item
              path="StopBit"
              :label="$t('Settings.StopBit')"
              v-if="readerOneForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerOneForm.StopBit" :options="stopBitDropDownList" />
            </n-form-item>

            <n-form-item path="WritePrefix" :label="$t('Settings.WritePrefix')">
              <n-select
                v-model:value="readerOneForm.WritePrefix"
                :options="writefixfForPreSufDropDownList"
              />
            </n-form-item>

            <n-form-item path="WriteSuffix" :label="$t('Settings.WriteSuffix')">
              <n-select
                v-model:value="readerOneForm.WriteSuffix"
                :options="writefixfForPreSufDropDownList"
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card title="Barcode Reader 2">
          <n-form ref="barcodeReaderSecondForm" :model="readerSecondForm">
            <n-form-item path="Linkby" :label="$t('Settings.Linkby')">
              <n-select
                v-model:value="readerSecondForm.Name"
                :options="linkbyDropDownList"
                disabled
              />
            </n-form-item>

            <n-form-item path="Enable" :label="$t('Settings.Enable')">
              <n-switch v-model:value="readerSecondForm.Enable" />
            </n-form-item>

            <n-form-item path="Port" :label="$t('Settings.Port')">
              <n-select v-model:value="readerSecondForm.Port" :options="portDropDownList" />
            </n-form-item>

            <n-form-item path="start_message" :label="$t('Settings.STmessage')">
              <n-input v-model:value="readerSecondForm.start_message" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="read_failure_message" :label="$t('Settings.ERRmessage')">
              <n-input
                v-model:value="readerSecondForm.read_failure_message"
                @keydown.enter.prevent
              />
            </n-form-item>

            <n-form-item
              path="IP"
              :label="$t('Settings.TCPIP')"
              v-if="readerSecondForm.Port === 'RJ45'"
            >
              <n-input v-model:value="readerSecondForm.IP" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item
              path="TCP_port"
              :label="$t('Settings.TCPPort')"
              v-if="readerSecondForm.Port === 'RJ45'"
            >
              <n-input v-model:value="readerSecondForm.TCP_port" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item
              path="Format"
              :label="$t('Settings.Format')"
              v-if="readerSecondForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerSecondForm.Type" :options="formatTypeDropDownList" />
            </n-form-item>

            <n-form-item
              path="BaudRate"
              :label="$t('Settings.BaudRate')"
              v-if="readerSecondForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerSecondForm.BaudRate" :options="baudRateDropDownList" />
            </n-form-item>

            <n-form-item
              path="Parity"
              :label="$t('Settings.Parity')"
              v-if="readerSecondForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerSecondForm.Parity" :options="parityDropDownList" />
            </n-form-item>

            <n-form-item
              path="DataBits"
              :label="$t('Settings.DataBits')"
              v-if="readerSecondForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerSecondForm.DataBits" :options="dataBitsDropDownList" />
            </n-form-item>

            <n-form-item
              path="StopBit"
              :label="$t('Settings.StopBit')"
              v-if="readerSecondForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="readerSecondForm.StopBit" :options="stopBitDropDownList" />
            </n-form-item>

            <n-form-item path="WritePrefix" :label="$t('Settings.WritePrefix')">
              <n-select
                v-model:value="readerSecondForm.WritePrefix"
                :options="writefixfForPreSufDropDownList"
              />
            </n-form-item>

            <n-form-item path="WriteSuffix" :label="$t('Settings.WriteSuffix')">
              <n-select
                v-model:value="readerSecondForm.WriteSuffix"
                :options="writefixfForPreSufDropDownList"
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>

    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <n-card :title="$t('Settings.Machine')">
          <n-form ref="machineForm" :model="machineForm">
            <n-form-item path="Enable" :label="$t('Settings.Enable')">
              <n-switch v-model:value="machineForm.Enable" />
            </n-form-item>

            <n-form-item path="Decimalplaces" :label="$t('Settings.Decimalplaces')">
              <n-input v-model:value="machineForm.DecimalPlaces" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="Datatype" :label="$t('Settings.Datatype')">
              <n-select v-model:value="machineForm.Mode" :options="datatypeDropDownList" />
            </n-form-item>

            <n-form-item path="RecipeNameAddress" :label="$t('Settings.RecipeNameAddress')">
              <n-input v-model:value="machineForm.RecipeName" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="WidthAddress" :label="$t('Settings.WidthAddress')">
              <n-input v-model:value="machineForm.Width" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="RNAddrType" :label="$t('Settings.RNAddrType')">
              <n-select v-model:value="machineForm.RNAddrType" :options="rNAddrTypeDropDownList" />
            </n-form-item>

            <n-form-item path="WidAddrType" :label="$t('Settings.WidAddrType')">
              <n-select
                v-model:value="machineForm.WidAddrType"
                :options="widAddrTypeDropDownList"
              />
            </n-form-item>

            <n-form-item path="Port" :label="$t('Settings.Port')">
              <n-select v-model:value="machineForm.Port" :options="portDropDownList" />
            </n-form-item>

            <n-form-item path="IP" :label="$t('Settings.TCPIP')" v-if="machineForm.Port === 'RJ45'">
              <n-input v-model:value="machineForm.IP" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item
              path="TCP_port"
              :label="$t('Settings.TCPPort')"
              v-if="machineForm.Port === 'RJ45'"
            >
              <n-input v-model:value="machineForm.TCP_port" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item
              path="Format"
              :label="$t('Settings.Format')"
              v-if="machineForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="machineForm.Type" :options="formatTypeDropDownList" />
            </n-form-item>

            <n-form-item
              path="BaudRate"
              :label="$t('Settings.BaudRate')"
              v-if="machineForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="machineForm.BaudRate" :options="baudRateDropDownList" />
            </n-form-item>

            <n-form-item
              path="Parity"
              :label="$t('Settings.Parity')"
              v-if="machineForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="machineForm.Parity" :options="parityDropDownList" />
            </n-form-item>

            <n-form-item
              path="DataBits"
              :label="$t('Settings.DataBits')"
              v-if="machineForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="machineForm.DataBits" :options="dataBitsDropDownList" />
            </n-form-item>

            <n-form-item
              path="StopBit"
              :label="$t('Settings.StopBit')"
              v-if="machineForm.Port !== 'RJ45'"
            >
              <n-select v-model:value="machineForm.StopBit" :options="stopBitDropDownList" />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>
    <n-button type="info" ghost @click="saveButtonClick" v-if="isEnableSaveBtn">
      {{ $t('Save') }}
    </n-button>
  </n-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { IOutPortReader1Column } from '@/Interface/Setting/IOutPortReader1Column'
import type { IOutPortReader2Column } from '@/Interface/Setting/IOutPortReader2Column'
import type { IOutPortMachineColumn } from '@/Interface/Setting/IOutPortMachineColumn'
import type { DropDownList, DropDownStringList } from '@/types/DropDownList'
import type { SettingSearch } from '@/types/Setting/SettingSearch'
import type IMvcSetting from '@/Interface/IMvcSetting'
import {
  returnStringValueFromSource,
  returnIntValueFromSource,
  returnBoolValueFromSource,
  returnFloatValueFromSource
} from '@/utils/Common'

import {
  getLinkbyNameDropDownList,
  getPortDropDownList,
  getWritefixfForPreSufDropDownList,
  getFormatTypeDropDownList,
  getBaudRateDropDownList,
  getParityDropDownList,
  getDataBitsDropDownList,
  getStopBitDropDownList,
  getSettingList,
  getDatatypeDropDownList,
  updateSettingByList
} from '@/api/Setting'
import { getOptionWordDetailList } from '@/api/OptionWord'
import { getCookie } from 'typescript-cookie'
import type { OptionWordSearch } from '@/types/OptionWord/OptionWordSearch'
import type IOptionWordDetail from '@/Interface/IOptionWordDetail'
import type { UpdateParam } from '@/types/Setting/UpdateParam'
import { renderLanguage, updateAlwaysRead } from '@/utils/Common'
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
        this.setRNAddrTypeDropDownList()
        this.setWidAddrTypeDropDownList()
      },
      deep: true
    }
  },
  data() {
    return {
      /** BarCode Reader 1 表單 */
      readerOneForm: {} as IOutPortReader1Column,

      /** BarCode Reader 2 表單 */
      readerSecondForm: {} as IOutPortReader2Column,

      /** 設備 表單 */
      machineForm: {} as IOutPortMachineColumn,

      /** 關聯於下拉選單列表 */
      linkbyDropDownList: [] as DropDownList[],

      /** Port下拉選單列表 */
      portDropDownList: [] as DropDownStringList[],

      /** 寫入前綴與寫入後綴 用的下拉選單列表 */
      writefixfForPreSufDropDownList: [] as DropDownList[],

      /** 格式下拉選單列表 */
      formatTypeDropDownList: [] as DropDownStringList[],

      /** 鮑率下拉選單列表 */
      baudRateDropDownList: [] as DropDownList[],

      /** 奇偶性下拉選單列表 */
      parityDropDownList: [] as DropDownList[],

      /** 資料位元下拉選單列表 */
      dataBitsDropDownList: [] as DropDownList[],

      /** 停止位元下拉選單列表 */
      stopBitDropDownList: [] as DropDownList[],

      /** 資料類型(Mode)下拉選單列表 */
      datatypeDropDownList: [] as DropDownList[],

      /** 配方名稱型態下拉選單列表 */
      rNAddrTypeDropDownList: [] as DropDownList[],

      /** 寬度型態下拉選單列表 */
      widAddrTypeDropDownList: [] as DropDownList[],

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
    this.setLinkbyNameDropDownList()
    this.setPortDropDownList()
    this.setWritefixfForPreSufDropDownList()
    this.setFormatTypeDropDownList()
    this.setBaudRateDropDownList()
    this.setParityDropDownList()
    this.setDataBitsDropDownList()
    this.setStopBitDropDownList()
    this.getOutPortsList()
    this.setDatatypeDropDownList()
    this.setRNAddrTypeDropDownList()
    this.setWidAddrTypeDropDownList()
    this.getAccessControl()
  },

  methods: {
    /** 取得存取權限 */
    getAccessControl() {
      const vm = this
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        vm.storeAccessControlList.forEach((element) => {
          if (element.functionCode === 'OutPorts' && element.functionActionName === 'Modify') {
            vm.isEnableSaveBtn = true
          }
        })
      }
    },

    /**
     * 建立關聯於下拉選單列表
     */
    setLinkbyNameDropDownList() {
      const vm = this
      getLinkbyNameDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.linkbyDropDownList = dataList
      })
    },

    /**
     * 建立Port下拉選單列表
     */
    setPortDropDownList() {
      const vm = this
      getPortDropDownList().then((response) => {
        const dataList: DropDownStringList[] = response.data.payload
        vm.portDropDownList = dataList
      })
    },

    /**
     * 建立前綴與寫入後綴 用的下拉選單列表
     */
    setWritefixfForPreSufDropDownList() {
      const vm = this
      getWritefixfForPreSufDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.writefixfForPreSufDropDownList = dataList
      })
    },

    /**
     * 建立格式下拉選單列表
     */
    setFormatTypeDropDownList() {
      const vm = this
      getFormatTypeDropDownList().then((response) => {
        const dataList: DropDownStringList[] = response.data.payload
        vm.formatTypeDropDownList = dataList
      })
    },

    /**
     * 建立鮑率下拉選單列表
     */
    setBaudRateDropDownList() {
      const vm = this
      getBaudRateDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.baudRateDropDownList = dataList
      })
    },

    /**
     * 建立奇偶性下拉選單列表
     */
    setParityDropDownList() {
      const vm = this
      getParityDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.parityDropDownList = dataList
      })
    },

    /**
     * 建立資料位元下拉選單列表
     */
    setDataBitsDropDownList() {
      const vm = this
      getDataBitsDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.dataBitsDropDownList = dataList
      })
    },

    /**
     * 建立停止位元下拉選單列表
     */
    setStopBitDropDownList() {
      const vm = this
      getStopBitDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.stopBitDropDownList = dataList
      })
    },

    /**
     * 建立資料類型(Mode)下拉選單列表
     */
    setDatatypeDropDownList() {
      const vm = this
      getDatatypeDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.datatypeDropDownList = dataList
      })
    },

    /**
     * 建立配方名稱型態下拉選單列表
     */
    setRNAddrTypeDropDownList() {
      const vm = this
      vm.rNAddrTypeDropDownList = []
      const language = getCookie('Language')

      if (language !== undefined) {
        const payload: OptionWordSearch = {
          OptionWordId: undefined,
          OptionWordName: 'RNAddrType',
          Language: language
        }

        getOptionWordDetailList(payload).then((response) => {
          const dataList: IOptionWordDetail[] = response.data

          dataList.forEach((element) => {
            let option: DropDownList = {
              label: element.languageContext,
              value: parseInt(element.value)
            }
            vm.rNAddrTypeDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 建立寬度型態下拉選單列表
     */
    setWidAddrTypeDropDownList() {
      const vm = this
      vm.widAddrTypeDropDownList = []
      const language = getCookie('Language')

      if (language !== undefined) {
        const payload: OptionWordSearch = {
          OptionWordId: undefined,
          OptionWordName: 'WidAddrType',
          Language: language
        }

        getOptionWordDetailList(payload).then((response) => {
          const dataList: IOptionWordDetail[] = response.data

          dataList.forEach((element) => {
            let option: DropDownList = {
              label: element.languageContext,
              value: parseInt(element.value)
            }
            vm.widAddrTypeDropDownList.push(option)
          })
        })
      }
    },

    /**
     * 取得 OutPorts 設定列表
     */
    getOutPortsList() {
      const payload: SettingSearch = {
        Group: 'OutPort',
        Type: '',
        Name: ''
      }

      getSettingList(payload).then((response) => {
        const vm = this
        const dataList: IMvcSetting[] = response.data.payload

        /**
         * BarCode Readers
         */
        vm.readerOneForm.WriteTimeout = returnIntValueFromSource(
          dataList,
          'Reader1',
          'WriteTimeout'
        )

        /**
         * Barcode Reader 1
         */
        vm.readerOneForm.Name = returnIntValueFromSource(dataList, 'Reader1', 'Name')
        vm.readerOneForm.Enable = returnBoolValueFromSource(dataList, 'Reader1', 'Enable')
        vm.readerOneForm.Port = returnStringValueFromSource(dataList, 'Reader1', 'Port')
        vm.readerOneForm.start_message = returnStringValueFromSource(
          dataList,
          'Reader1',
          'start_message'
        )
        vm.readerOneForm.read_failure_message = returnStringValueFromSource(
          dataList,
          'Reader1',
          'read_failure_message'
        )
        vm.readerOneForm.IP = returnStringValueFromSource(dataList, 'Reader1', 'IP')

        vm.readerOneForm.TCP_port = returnIntValueFromSource(dataList, 'Reader1', 'TCP_port')
        vm.readerOneForm.Type = returnStringValueFromSource(dataList, 'Reader1', 'Type')
        vm.readerOneForm.BaudRate = returnIntValueFromSource(dataList, 'Reader1', 'BaudRate')
        vm.readerOneForm.Parity = returnIntValueFromSource(dataList, 'Reader1', 'Parity')
        vm.readerOneForm.DataBits = returnIntValueFromSource(dataList, 'Reader1', 'DataBits')
        vm.readerOneForm.StopBit = returnFloatValueFromSource(dataList, 'Reader1', 'StopBit')
        vm.readerOneForm.WritePrefix = returnIntValueFromSource(dataList, 'Reader1', 'WritePrefix')
        vm.readerOneForm.WriteSuffix = returnIntValueFromSource(dataList, 'Reader1', 'WriteSuffix')

        /**
         * Barcode Reader 2
         */
        vm.readerSecondForm.Name = returnIntValueFromSource(dataList, 'Reader2', 'Name')
        vm.readerSecondForm.Enable = returnBoolValueFromSource(dataList, 'Reader2', 'Enable')
        vm.readerSecondForm.Port = returnStringValueFromSource(dataList, 'Reader2', 'Port')
        vm.readerSecondForm.start_message = returnStringValueFromSource(
          dataList,
          'Reader2',
          'start_message'
        )
        vm.readerSecondForm.read_failure_message = returnStringValueFromSource(
          dataList,
          'Reader2',
          'read_failure_message'
        )
        vm.readerSecondForm.IP = returnStringValueFromSource(dataList, 'Reader2', 'IP')

        vm.readerSecondForm.TCP_port = returnIntValueFromSource(dataList, 'Reader2', 'TCP_port')
        vm.readerSecondForm.Type = returnStringValueFromSource(dataList, 'Reader2', 'Type')
        vm.readerSecondForm.BaudRate = returnIntValueFromSource(dataList, 'Reader2', 'BaudRate')
        vm.readerSecondForm.Parity = returnIntValueFromSource(dataList, 'Reader2', 'Parity')
        vm.readerSecondForm.DataBits = returnIntValueFromSource(dataList, 'Reader2', 'DataBits')
        vm.readerSecondForm.StopBit = returnFloatValueFromSource(dataList, 'Reader2', 'StopBit')
        vm.readerSecondForm.WritePrefix = returnIntValueFromSource(
          dataList,
          'Reader2',
          'WritePrefix'
        )
        vm.readerSecondForm.WriteSuffix = returnIntValueFromSource(
          dataList,
          'Reader2',
          'WriteSuffix'
        )

        /**
         * Machine
         */
        vm.machineForm.Enable = returnBoolValueFromSource(dataList, 'Machine', 'Enable')
        vm.machineForm.DecimalPlaces = returnFloatValueFromSource(
          dataList,
          'Machine',
          'DecimalPlaces'
        )
        vm.machineForm.Mode = returnIntValueFromSource(dataList, 'Machine', 'Mode')
        vm.machineForm.RecipeName = returnIntValueFromSource(dataList, 'Machine', 'RecipeName')
        vm.machineForm.Width = returnIntValueFromSource(dataList, 'Machine', 'Width')
        vm.machineForm.RNAddrType = returnIntValueFromSource(dataList, 'Machine', 'RNAddrType')
        vm.machineForm.WidAddrType = returnIntValueFromSource(dataList, 'Machine', 'WidAddrType')
        vm.machineForm.Port = returnStringValueFromSource(dataList, 'Machine', 'Port')
        vm.machineForm.Type = returnStringValueFromSource(dataList, 'Machine', 'Type')
        vm.machineForm.BaudRate = returnIntValueFromSource(dataList, 'Machine', 'BaudRate')
        vm.machineForm.Parity = returnIntValueFromSource(dataList, 'Machine', 'Parity')
        vm.machineForm.DataBits = returnIntValueFromSource(dataList, 'Machine', 'DataBits')
        vm.machineForm.StopBit = returnFloatValueFromSource(dataList, 'Machine', 'StopBit')
        vm.machineForm.IP = returnStringValueFromSource(dataList, 'Machine', 'IP')
        vm.machineForm.TCP_port = returnIntValueFromSource(dataList, 'Machine', 'TCP_port')
      })
    },

    /**
     * 儲存按鈕事件
     * @param e
     */
    saveButtonClick(e: MouseEvent) {
      e.preventDefault()
      const vm = this
      vm.isShowLoading = true

      let updateList: UpdateParam[] = []

      /**
       * Reader1
       */

      let writeTimeout: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'WriteTimeout',
        Value: vm.readerOneForm.WriteTimeout.toString()
      }
      updateList.push(writeTimeout)

      let reader1Name: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'Name',
        Value: vm.readerOneForm.Name.toString()
      }
      updateList.push(reader1Name)

      let reader1Enable: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'Enable',
        Value: vm.readerOneForm.Enable ? 'true' : 'false'
      }
      updateList.push(reader1Enable)

      let reader1Port: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'Port',
        Value: vm.readerOneForm.Port
      }
      updateList.push(reader1Port)

      let reader1Start_message: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'start_message',
        Value: vm.readerOneForm.start_message
      }
      updateList.push(reader1Start_message)

      let reader1Read_failure_message: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'read_failure_message',
        Value: vm.readerOneForm.read_failure_message
      }
      updateList.push(reader1Read_failure_message)

      let reader1Type: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'Type',
        Value: vm.readerOneForm.Type
      }
      updateList.push(reader1Type)

      let reader1BaudRate: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'BaudRate',
        Value: vm.readerOneForm.BaudRate.toString()
      }
      updateList.push(reader1BaudRate)

      let reader1Parity: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'Parity',
        Value: vm.readerOneForm.Parity.toString()
      }
      updateList.push(reader1Parity)

      let reader1DataBits: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'DataBits',
        Value: vm.readerOneForm.DataBits.toString()
      }
      updateList.push(reader1DataBits)

      let reader1StopBit: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'StopBit',
        Value: vm.readerOneForm.StopBit.toString()
      }
      updateList.push(reader1StopBit)

      let reader1IP: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'IP',
        Value: vm.readerOneForm.IP.toString()
      }
      updateList.push(reader1IP)

      let reader1TCP_port: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'TCP_port',
        Value: vm.readerOneForm.TCP_port.toString()
      }
      updateList.push(reader1TCP_port)

      let reader1WritePrefix: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'WritePrefix',
        Value: vm.readerOneForm.WritePrefix.toString()
      }
      updateList.push(reader1WritePrefix)

      let reader1WriteSuffix: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader1',
        Name: 'WriteSuffix',
        Value: vm.readerOneForm.WriteSuffix.toString()
      }
      updateList.push(reader1WriteSuffix)

      /**
       * Reader2
       */

      let reader2Name: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'Name',
        Value: vm.readerSecondForm.Name.toString()
      }
      updateList.push(reader2Name)

      let reader2Enable: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'Enable',
        Value: vm.readerSecondForm.Enable ? 'true' : 'false'
      }
      updateList.push(reader2Enable)

      let reader2Port: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'Port',
        Value: vm.readerSecondForm.Port
      }
      updateList.push(reader2Port)

      let reader2Start_message: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'start_message',
        Value: vm.readerSecondForm.start_message
      }
      updateList.push(reader2Start_message)

      let reader2Read_failure_message: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'read_failure_message',
        Value: vm.readerSecondForm.read_failure_message
      }
      updateList.push(reader2Read_failure_message)

      let reader2Type: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'Type',
        Value: vm.readerSecondForm.Type
      }
      updateList.push(reader2Type)

      let reader2BaudRate: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'BaudRate',
        Value: vm.readerSecondForm.BaudRate.toString()
      }
      updateList.push(reader2BaudRate)

      let reader2Parity: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'Parity',
        Value: vm.readerSecondForm.Parity.toString()
      }
      updateList.push(reader2Parity)

      let reader2DataBits: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'DataBits',
        Value: vm.readerSecondForm.DataBits.toString()
      }
      updateList.push(reader2DataBits)

      let reader2StopBit: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'StopBit',
        Value: vm.readerSecondForm.StopBit.toString()
      }
      updateList.push(reader2StopBit)

      let reader2IP: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'IP',
        Value: vm.readerSecondForm.IP.toString()
      }
      updateList.push(reader2IP)

      let reader2TCP_port: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'TCP_port',
        Value: vm.readerSecondForm.TCP_port.toString()
      }
      updateList.push(reader2TCP_port)

      let reader2WritePrefix: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'WritePrefix',
        Value: vm.readerSecondForm.WritePrefix.toString()
      }
      updateList.push(reader2WritePrefix)

      let reader2WriteSuffix: UpdateParam = {
        Group: 'OutPort',
        Type: 'Reader2',
        Name: 'WriteSuffix',
        Value: vm.readerSecondForm.WriteSuffix.toString()
      }
      updateList.push(reader2WriteSuffix)

      /**
       * Machine
       */
      let machineEnable: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'Enable',
        Value: vm.machineForm.Enable ? 'true' : 'false'
      }
      updateList.push(machineEnable)

      let machineDecimalPlaces: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'DecimalPlaces',
        Value: vm.machineForm.DecimalPlaces.toString()
      }
      updateList.push(machineDecimalPlaces)

      let machineMode: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'Mode',
        Value: vm.machineForm.Mode.toString()
      }
      updateList.push(machineMode)

      let machineRecipeName: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'RecipeName',
        Value: vm.machineForm.RecipeName.toString()
      }
      updateList.push(machineRecipeName)

      let machineWidth: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'Width',
        Value: vm.machineForm.Width.toString()
      }
      updateList.push(machineWidth)

      let machineRNAddrType: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'RNAddrType',
        Value: vm.machineForm.RNAddrType.toString()
      }
      updateList.push(machineRNAddrType)

      let machineWidAddrType: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'WidAddrType',
        Value: vm.machineForm.WidAddrType.toString()
      }
      updateList.push(machineWidAddrType)

      let machinePort: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'Port',
        Value: vm.machineForm.Port.toString()
      }
      updateList.push(machinePort)

      let machineType: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'Type',
        Value: vm.machineForm.Type.toString()
      }
      updateList.push(machineType)

      let machineBaudRate: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'BaudRate',
        Value: vm.machineForm.BaudRate.toString()
      }
      updateList.push(machineBaudRate)

      let machineParity: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'Parity',
        Value: vm.machineForm.Parity.toString()
      }
      updateList.push(machineParity)

      let machineDataBits: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'DataBits',
        Value: vm.machineForm.DataBits.toString()
      }
      updateList.push(machineDataBits)

      let machineStopBit: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'StopBit',
        Value: vm.machineForm.StopBit.toString()
      }
      updateList.push(machineStopBit)

      let machineIP: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'IP',
        Value: vm.machineForm.IP.toString()
      }
      updateList.push(machineIP)

      let machineTCP_port: UpdateParam = {
        Group: 'OutPort',
        Type: 'Machine',
        Name: 'TCP_port',
        Value: vm.machineForm.TCP_port.toString()
      }
      updateList.push(machineTCP_port)

      var account = getCookie('Account')
      const payload: UpdateParamUser = {
        InputList: updateList,
        Operator: account
      }

      updateSettingByList(payload).then((response) => {
        if (response.data.statusCode === 200) {
          const msg = 'update updateWorkInfo success'
          window.$message.success(vm.saveSuccess)
          updateAlwaysRead(AlwaysReadParamEnum.OutportsChange)
          vm.finishLoadingByAlwaysRead()
        } else if (response.data.statusCode === 500) {
          const msg = 'update updateWorkInfo fail'
          window.$message.error(vm.saveFail)
        }
      })
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
          Name: AlwaysReadParamEnum.OutportsChange
        }
        readAlwaysReadValue(payload).then((response) => {
          if (response.data.statusCode == 200) {
            const data: IAlwaysRead = response.data.payload
            if (data.value === false) {
              vm.isShowLoading = false
              clearInterval(interval)
            }
          } else if (response.data.statusCode == 500) {
            console.log('readAlwaysReadValue OutportsChange fail!')
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
    }
  }
})
</script>
