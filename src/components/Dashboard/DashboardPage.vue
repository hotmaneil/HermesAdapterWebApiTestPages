<template>
  <n-grid x-gap="12" :cols="5" responsive="screen">
    <n-gi span="3">
      <n-divider>HERMES</n-divider>
      <ColumnRunningStatus :runStatus="RunningStatus"></ColumnRunningStatus>
    </n-gi>
    <n-gi span="2">
      <n-divider>Outport</n-divider>
      <ReaderEQ :readerEQStatus="ReaderEQStatus"></ReaderEQ>
    </n-gi>
  </n-grid>

  <n-divider>DIO</n-divider>
  <BR_MR_Status :BrMrStatus="BrMrStatus"></BR_MR_Status>

  <n-divider />
  <ReceiveSendMsg :message-info="MessageInfo" />
  <n-divider />
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <SystemMsgList />
    </n-gi>
    <n-gi>
      <TemporarilyDataList />
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as signalR from '@microsoft/signalr'
import axios from 'axios'
import ColumnRunningStatus from '@/components/Dashboard/ColumnRunningStatus.vue'
import ReaderEQ from '@/components/Dashboard/ReaderEQ.vue'
import BR_MR_Status from '@/components/Dashboard/BR_MR_Status.vue'
import ReceiveSendMsg from '@/components/Dashboard/ReceiveSendMsg.vue'
import SystemMsgList from '@/components/Dashboard/SystemMsgList.vue'
import TemporarilyDataList from '@/components/Dashboard/TemporarilyDataList.vue'
import type IMvcColumnRunnung from '@/Interface/IMvcColumnRunnung'
import IMvcMessageSend from '@/Interface/IMvcMessageSend'
import type IMvcMessageReceive from '@/Interface/IMvcMessageReceive'
import type IHubMessage from '@/Interface/IHubMessage'
import { LockinputStatusEnum } from '@/Enum/enums'
import { judgeStatusForClass, renderLanguage } from '@/utils/Common'
import { Theme } from '@/stores/theme'
import { ThemeModeEnum } from '@/Enum/enums'

/**
 * 全域變數-URL
 */
const url = window.config.webApi_URL

export default defineComponent({
  components: {
    ColumnRunningStatus,
    BR_MR_Status,
    ReceiveSendMsg,
    SystemMsgList,
    TemporarilyDataList,
    ReaderEQ
  },
  inject: ['selectedTheme'],
  watch: {
    selectedTheme: {
      handler(newVal, oldVal) {
        console.log(`selectedTheme handler val: ${newVal},oldVal:${oldVal}`)
        this.initLoadData()
      },
      deep: true
    }
  },
  data() {
    return {
      /**
       * 顯示上下游及上位狀態
       */
      RunningStatus: {
        Lockinput: 2,
        LockinputClass: '',
        Lockinput_Status: '',

        Supervisory: 'S',
        Supervisory_Status: 'NotConnected',
        SupervisoryClass: '',

        Upstream: 'S',
        Upstream_Status: 'NotConnected',
        UpstreamClass: '',

        Downstream: 'S',
        Downstream_Status: 'NotConnected',
        DownstreamClass: ''
      },

      /**
       * 顯示上下游之BR與MR狀態
       */
      BrMrStatus: {
        Upstream_BoardAvailable: 'N',
        UpstreamBoardAvailableClass: '',

        Upstream_MachineReady: 'N',
        UpstreamMachineReadyClass: '',

        Upstream_FailedBoardAvailable: 'N',
        UpstreamFailedBoardAvailableClass: '',

        Downstream_BoardAvailable: 'N',
        DownstreamBoardAvailableClass: '',

        Downstream_MachineReady: 'N',
        DownstreamMachineReadyClass: '',

        Downstream_FailedBoardAvailable: '',
        DownstreamFailedBoardAvailableClass: ''
      },

      /**
       * 條碼機、設備之連線狀態
       */
      ReaderEQStatus: {
        Reader1: 'S',
        Reader1Class: '',

        Reader2: 'S',
        Reader2Class: '',

        EQ: 'S',
        EQClass: ''
      },

      /**
       * 接收與已發送的訊息
       */
      MessageInfo: {
        ReceivedMessage: '',
        ReceivedMessageResource: '',
        HasBeenSentMessage: '',
        HasBeenSentMessageResource: ''
      },

      /**
       * 語系
       */
      webSocketClosedTitle: renderLanguage('WebSocketClosedTitle'),
      webSocketClosedcontent: renderLanguage('WebSocketClosedcontent')
    }
  },
  created() {
    this.initLoadData()
    this.GetColumnStatusChangeFromSignalR()
    this.GetReceiveMessageFromSignalR()
    this.GetSendMessageFromSignalR()
  },
  methods: {
    /**
     * 初始載入資料
     */
    initLoadData() {
      const vm = this
      axios.get(`${url}/api/ColumnRunning/GetAllColumnRunningStatus`).then(function (response) {
        const dataList: IMvcColumnRunnung[] = response.data.payload

        //
        //RunningStatus
        //

        //Lockinput
        const findLockinput = dataList.find((x) => x.columN_NAME === 'Lockinput')
        if (findLockinput !== undefined) {
          vm.RunningStatus.Lockinput = parseInt(findLockinput.iF_RUNNING)
          vm.setClassAndStatusByLockinput(vm.RunningStatus.Lockinput)
        }

        //Supervisory
        const findSupervisory = dataList.find((x) => x.columN_NAME === 'Supervisory')
        if (findSupervisory !== undefined) vm.RunningStatus.Supervisory = findSupervisory.iF_RUNNING

        const findSupervisoryStatus = dataList.find((x) => x.columN_NAME === 'Supervisory_Status')
        if (findSupervisoryStatus !== undefined)
          vm.RunningStatus.Supervisory_Status = findSupervisoryStatus.iF_RUNNING

        vm.RunningStatus.SupervisoryClass = judgeStatusForClass(vm.RunningStatus.Supervisory)

        //Upstream
        const findUpstream = dataList.find((x) => x.columN_NAME === 'Upstream')
        if (findUpstream != undefined) vm.RunningStatus.Upstream = findUpstream?.iF_RUNNING

        const findUpstreamStatus = dataList.find((x) => x.columN_NAME === 'Upstream_Status')
        if (findUpstreamStatus !== undefined)
          vm.RunningStatus.Upstream_Status = findUpstreamStatus?.iF_RUNNING

        vm.RunningStatus.UpstreamClass = judgeStatusForClass(vm.RunningStatus.Upstream)

        //Downstream
        const findDownstream = dataList.find((x) => x.columN_NAME === 'Downstream')
        if (findDownstream !== undefined) vm.RunningStatus.Downstream = findDownstream?.iF_RUNNING

        const findDownstreamStatus = dataList.find((x) => x.columN_NAME === 'Downstream_Status')
        if (findDownstreamStatus !== undefined)
          vm.RunningStatus.Downstream_Status = findDownstreamStatus?.iF_RUNNING

        vm.RunningStatus.DownstreamClass = judgeStatusForClass(vm.RunningStatus.Downstream)

        //
        //BrMrStatus
        //

        //Upstream_BoardAvailable
        const findUpstreamBoardAvailable = dataList.find(
          (x) => x.columN_NAME === 'Upstream_BoardAvailable'
        )
        if (findUpstreamBoardAvailable !== undefined)
          vm.BrMrStatus.Upstream_BoardAvailable = findUpstreamBoardAvailable?.iF_RUNNING

        vm.BrMrStatus.UpstreamBoardAvailableClass = judgeStatusForClass(
          vm.BrMrStatus.Upstream_BoardAvailable
        )

        //Upstream_MachineReady
        const findUpstreamMachineReady = dataList.find(
          (x) => x.columN_NAME === 'Upstream_MachineReady'
        )
        if (findUpstreamMachineReady !== undefined)
          vm.BrMrStatus.Upstream_MachineReady = findUpstreamMachineReady?.iF_RUNNING

        vm.BrMrStatus.UpstreamMachineReadyClass = judgeStatusForClass(
          vm.BrMrStatus.Upstream_MachineReady
        )

        //Upstream_FailedBoardAvailable
        const findUpstreamFailedBoardAvailable = dataList.find(
          (x) => x.columN_NAME === 'Upstream_FailedBoardAvailable'
        )
        if (findUpstreamFailedBoardAvailable !== undefined)
          vm.BrMrStatus.Upstream_FailedBoardAvailable = findUpstreamFailedBoardAvailable?.iF_RUNNING

        vm.BrMrStatus.UpstreamFailedBoardAvailableClass = judgeStatusForClass(
          vm.BrMrStatus.Upstream_FailedBoardAvailable
        )

        //Downstream_BoardAvailable
        const findDownstreamBoardAvailable = dataList.find(
          (x) => x.columN_NAME === 'Downstream_BoardAvailable'
        )
        if (findDownstreamBoardAvailable !== undefined)
          vm.BrMrStatus.Downstream_BoardAvailable = findDownstreamBoardAvailable?.iF_RUNNING

        vm.BrMrStatus.DownstreamBoardAvailableClass = judgeStatusForClass(
          vm.BrMrStatus.Downstream_BoardAvailable
        )

        //Downstream_MachineReady
        const findDownstreamMachineReady = dataList.find(
          (x) => x.columN_NAME === 'Downstream_MachineReady'
        )
        if (findDownstreamMachineReady !== undefined)
          vm.BrMrStatus.Downstream_MachineReady = findDownstreamMachineReady?.iF_RUNNING

        vm.BrMrStatus.DownstreamMachineReadyClass = judgeStatusForClass(
          vm.BrMrStatus.Downstream_MachineReady
        )

        //Downstream_FailedBoardAvailable
        const findDownstreamFailedBoardAvailable = dataList.find(
          (x) => x.columN_NAME === 'Downstream_FailedBoardAvailable'
        )
        if (findDownstreamFailedBoardAvailable !== undefined)
          vm.BrMrStatus.Downstream_FailedBoardAvailable =
            findDownstreamFailedBoardAvailable?.iF_RUNNING

        vm.BrMrStatus.DownstreamFailedBoardAvailableClass = judgeStatusForClass(
          vm.BrMrStatus.Downstream_FailedBoardAvailable
        )

        //
        //ReaderEQStatus
        //

        //Reader1
        const findReader1 = dataList.find((x) => x.columN_NAME === 'Reader1')
        if (findReader1 !== undefined) {
          vm.ReaderEQStatus.Reader1 = findReader1.iF_RUNNING
          vm.ReaderEQStatus.Reader1Class = judgeStatusForClass(vm.ReaderEQStatus.Reader1)
        }

        //Reader2
        const findReader2 = dataList.find((x) => x.columN_NAME === 'Reader2')
        if (findReader2 !== undefined) {
          vm.ReaderEQStatus.Reader2 = findReader2.iF_RUNNING
          vm.ReaderEQStatus.Reader2Class = judgeStatusForClass(vm.ReaderEQStatus.Reader2)
        }

        //EQ
        const findEQ = dataList.find((x) => x.columN_NAME === 'EQ')
        if (findEQ !== undefined) {
          vm.ReaderEQStatus.EQ = findEQ.iF_RUNNING
          vm.ReaderEQStatus.EQClass = judgeStatusForClass(vm.ReaderEQStatus.EQ)
        }
      })
    },

    /**
     * 透過Lockinput設值Class和Lockinput_Status設值
     */
    setClassAndStatusByLockinput(Lockinput: number) {
      const vm = this
      if (Lockinput === 0) {
        vm.RunningStatus.LockinputClass =
          Theme().storeTheme === ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.CommandUndefined
      } else if (Lockinput === 1) {
        vm.RunningStatus.LockinputClass =
          Theme().storeTheme === ThemeModeEnum.Dark ? 'disconnectedDark' : 'disconnected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.LockInputConveyor
      } else if (Lockinput === 2) {
        vm.RunningStatus.LockinputClass = ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.UnlockInputConveyor
      } else if (Lockinput === 3) {
        vm.RunningStatus.LockinputClass = ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.RequestPause
      } else if (Lockinput === 4) {
        vm.RunningStatus.LockinputClass = ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.ConfirmPause
      } else if (Lockinput === 5) {
        vm.RunningStatus.LockinputClass = ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.ResumeOperation
      } else if (Lockinput >= 6 && Lockinput <= 999) {
        vm.RunningStatus.LockinputClass = ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.ReservedForFutureUse
      } else if (Lockinput >= 1000) {
        vm.RunningStatus.LockinputClass = ThemeModeEnum.Dark ? 'connectedDark' : 'connected'
        vm.RunningStatus.Lockinput_Status = LockinputStatusEnum.CustomerDefinedCommands
      }
    },

    /**
     * 從SignalR取得通訊欄位狀態變更
     */
    GetColumnStatusChangeFromSignalR() {
      const vm = this
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(`${url}/columnRunningHub`)
        .withAutomaticReconnect()
        .build()

      try {
        connection.start()
        console.log('GetColumnStatusChangeFromSignalR connected')

        connection.on('ColumnStatusChange', (message) => {
          console.log('ColumnStatusChange', message)
          const data: IMvcColumnRunnung = message.payload

          //
          //RunningStatus
          //

          if (data.columN_NAME === 'Lockinput') {
            vm.RunningStatus.Lockinput = parseInt(data.iF_RUNNING)
            vm.setClassAndStatusByLockinput(vm.RunningStatus.Lockinput)
          }

          if (data.columN_NAME === 'Supervisory') {
            vm.RunningStatus.Supervisory = data.iF_RUNNING
            vm.RunningStatus.SupervisoryClass = judgeStatusForClass(vm.RunningStatus.Supervisory)
          }

          if (data.columN_NAME === 'Supervisory_Status') {
            vm.RunningStatus.Supervisory_Status = data.iF_RUNNING
          }

          if (data.columN_NAME === 'Upstream') {
            vm.RunningStatus.Upstream = data.iF_RUNNING
            vm.RunningStatus.UpstreamClass = judgeStatusForClass(vm.RunningStatus.Upstream)
          }

          if (data.columN_NAME === 'Upstream_Status') {
            vm.RunningStatus.Upstream_Status = data.iF_RUNNING
          }

          if (data.columN_NAME === 'Downstream') {
            vm.RunningStatus.Downstream = data.iF_RUNNING
            vm.RunningStatus.DownstreamClass = judgeStatusForClass(vm.RunningStatus.Downstream)
          }

          if (data.columN_NAME === 'Downstream_Status') {
            vm.RunningStatus.Downstream_Status = data.iF_RUNNING
          }

          //
          //BrMrStatus
          //

          if (data.columN_NAME === 'Upstream_BoardAvailable') {
            vm.BrMrStatus.Upstream_BoardAvailable = data.iF_RUNNING
            vm.BrMrStatus.UpstreamBoardAvailableClass = judgeStatusForClass(
              vm.BrMrStatus.Upstream_BoardAvailable
            )
          }

          if (data.columN_NAME === 'Upstream_MachineReady') {
            vm.BrMrStatus.Upstream_MachineReady = data.iF_RUNNING
            vm.BrMrStatus.UpstreamMachineReadyClass = judgeStatusForClass(
              vm.BrMrStatus.Upstream_MachineReady
            )
          }

          if (data.columN_NAME === 'Upstream_FailedBoardAvailable') {
            vm.BrMrStatus.Upstream_FailedBoardAvailable = data.iF_RUNNING
            vm.BrMrStatus.UpstreamFailedBoardAvailableClass = judgeStatusForClass(
              vm.BrMrStatus.Upstream_FailedBoardAvailable
            )
          }

          if (data.columN_NAME === 'Downstream_BoardAvailable') {
            vm.BrMrStatus.Downstream_BoardAvailable = data.iF_RUNNING
            vm.BrMrStatus.DownstreamBoardAvailableClass = judgeStatusForClass(
              vm.BrMrStatus.Downstream_BoardAvailable
            )
          }

          if (data.columN_NAME === 'Downstream_MachineReady') {
            vm.BrMrStatus.Downstream_MachineReady = data.iF_RUNNING
            vm.BrMrStatus.DownstreamMachineReadyClass = judgeStatusForClass(
              vm.BrMrStatus.Downstream_MachineReady
            )
          }

          if (data.columN_NAME === 'Downstream_FailedBoardAvailable') {
            vm.BrMrStatus.Downstream_FailedBoardAvailable = data.iF_RUNNING
            vm.BrMrStatus.DownstreamFailedBoardAvailableClass = judgeStatusForClass(
              vm.BrMrStatus.Downstream_FailedBoardAvailable
            )
          }

          //
          //ReaderEQStatus
          //

          if (data.columN_NAME === 'Reader1') {
            vm.ReaderEQStatus.Reader1 = data.iF_RUNNING
            vm.ReaderEQStatus.Reader1Class = judgeStatusForClass(vm.ReaderEQStatus.Reader1)
          }

          if (data.columN_NAME === 'Reader2') {
            vm.ReaderEQStatus.Reader2 = data.iF_RUNNING
            vm.ReaderEQStatus.Reader2Class = judgeStatusForClass(vm.ReaderEQStatus.Reader2)
          }

          if (data.columN_NAME === 'EQ') {
            vm.ReaderEQStatus.EQ = data.iF_RUNNING
            vm.ReaderEQStatus.EQClass = judgeStatusForClass(vm.ReaderEQStatus.EQ)
          }
        })

        connection.onreconnecting((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Reconnecting)
          const errorMsg = `ColumnStatusChange Connection lost due to error "${error}". Reconnecting.`
          window.$message.error(errorMsg)
          console.log('On reconnecting error', errorMsg)
        })

        connection.onreconnected((connectionId) => {
          console.assert(connection.state === signalR.HubConnectionState.Connected)
          const reconnectedMsg = `ColumnStatusChange Connection reestablished. Connected with connectionId "${connectionId}".`
          window.$message.success(reconnectedMsg)
          console.log('On reconnected message', reconnectedMsg)
        })

        connection.onclose((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Disconnected)
          const oncloseMsg = `ColumnStatusChange Connection closed due to error "${error}". 
          Try refreshing this page to restart the connection.`
          window.$message.warning(oncloseMsg)

          window.$notification['warning']({
            title: vm.webSocketClosedTitle,
            content: vm.webSocketClosedcontent,
            keepAliveOnHover: true
          })
          console.log('onclose message', oncloseMsg)
        })
      } catch (error) {
        console.log('GetColumnStatusChangeFromSignalR error', error)
      }
    },

    /**
     * 取得訊息資訊
     * (保留不用)
     */
    GetMessageInfo() {
      const vm = this
      axios.get(`${url}/api/Message/GetLastReceiveMsg`).then(function (response) {
        const data: IMvcMessageReceive = response.data.payload
        vm.MessageInfo.ReceivedMessage = data.messagE_TYPE
        vm.MessageInfo.ReceivedMessageResource = data.face
      })

      axios.get(`${url}/api/Message/GetLastSendMsg`).then(function (response) {
        const data: IMvcMessageSend = response.data.payload
        vm.MessageInfo.HasBeenSentMessage = data.messagE_TYPE
        vm.MessageInfo.HasBeenSentMessageResource = data.face
      })
    },

    /**
     * 從SignalR取得接收到的訊息
     */
    GetReceiveMessageFromSignalR() {
      const vm = this
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(`${url}/messageHub`)
        .withAutomaticReconnect()
        .build()

      try {
        connection.start()
        console.log('GetReceiveMessageFromSignalR connected')

        connection.on('ReceiveMessage', (message) => {
          console.log('ReceiveMessage', message)
          const data: IHubMessage = message
          vm.MessageInfo.ReceivedMessage = data.messageType
          vm.MessageInfo.ReceivedMessageResource = data.face
        })

        connection.onreconnecting((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Reconnecting)
          const errorMsg = `ReceiveMessage Connection lost due to error "${error}". Reconnecting.`
          window.$message.error(errorMsg)
          console.log('On reconnecting error', errorMsg)
        })

        connection.onreconnected((connectionId) => {
          console.assert(connection.state === signalR.HubConnectionState.Connected)
          const reconnectedMsg = `ReceiveMessage Connection reestablished. Connected with connectionId "${connectionId}".`
          window.$message.success(reconnectedMsg)
          console.log('On reconnected message', reconnectedMsg)
        })

        connection.onclose((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Disconnected)
          const oncloseMsg = `ReceiveMessage Connection closed due to error "${error}". 
          Try refreshing this page to restart the connection.`
          window.$message.success(oncloseMsg)
          console.log('onclose message', oncloseMsg)
        })
      } catch (error) {
        console.log('GetReceiveMessageFromSignalR error', error)
      }
    },

    /**
     * 從SignalR取得傳送的訊息
     */
    GetSendMessageFromSignalR() {
      const vm = this
      let connection = new signalR.HubConnectionBuilder().withUrl(`${url}/messageHub`).build()

      try {
        connection.start()
        console.log('GetSendMessageFromSignalR connected')

        connection.on('SendMessage', (message) => {
          console.log('SendMessage', message)
          const data: IHubMessage = message
          vm.MessageInfo.HasBeenSentMessage = data.messageType
          vm.MessageInfo.HasBeenSentMessageResource = data.face
        })

        connection.onreconnecting((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Reconnecting)
          const errorMsg = `SendMessage Connection lost due to error "${error}". Reconnecting.`
          window.$message.error(errorMsg)
          console.log('On reconnecting error', errorMsg)
        })

        connection.onreconnected((connectionId) => {
          console.assert(connection.state === signalR.HubConnectionState.Connected)
          const reconnectedMsg = `SendMessage Connection reestablished. Connected with connectionId "${connectionId}".`
          window.$message.success(reconnectedMsg)
          console.log('On reconnected message', reconnectedMsg)
        })

        connection.onclose((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Disconnected)
          const oncloseMsg = `SendMessage Connection closed due to error "${error}". 
          Try refreshing this page to restart the connection.`
          window.$message.success(oncloseMsg)
          console.log('onclose message', oncloseMsg)
        })
      } catch (error) {
        console.log('GetSendMessageFromSignalR error', error)
      }
    }
  }
})
</script>

<style scoped></style>
