<template>
  <n-modal v-model:show="showModalValue">
    <n-spin size="large" :show="isShowLoading">
      <n-card
        style="width: 500px"
        :title="$t('PleaseEnterBarcode')"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra> </template>
        <n-form ref="formQueryBarcode" :model="queryBarcodeForm">
          <n-form-item path="TopBarCode" label="TopBarCode">
            <n-Input v-model:value="queryBarcodeForm.TopBarCode" />
          </n-form-item>

          <n-form-item path="BottomBarCode" label="BottomBarCode">
            <n-Input v-model:value="queryBarcodeForm.BottomBarCode" />
          </n-form-item>
          <n-form-item>
            <n-button type="info" ghost @click="submit()" size="large">
              {{ $t('Submit') }}
            </n-button>
          </n-form-item>
        </n-form>
      </n-card>
    </n-spin>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import * as signalR from '@microsoft/signalr'
import { updateList, userInputUpdateList } from '@/api/InquiryBarcode'
import { getCookie } from 'typescript-cookie'
import { ModalStatusEnum, AskedEnum } from '@/Enum/enums'

/**
 * 全域變數-URL
 */
const url = window.config.webApi_URL

export default defineComponent({
  props: {
    showModal: {
      type: Boolean as PropType<Boolean>,
      required: true
    }
  },

  computed: {
    showModalValue: {
      get() {
        return this.showModal
      },
      set(newValue: boolean) {
        this.$emit('update:showModal', newValue)
      }
    }
  },

  data() {
    return {
      queryBarcodeForm: {} as IQuery,

      /** 是否顯示載入中 */
      isShowLoading: false
    }
  },

  methods: {
    /**
     * 提交
     */
    submit() {
      const vm = this
      const payload: IInputModel[] = [
        {
          Name: 'QBIisAsked',
          Value: 'false'
        },
        {
          Name: 'QBIisSend',
          Value: 'true'
        },
        {
          Name: 'Topbarcode',
          Value: vm.queryBarcodeForm.TopBarCode
        },
        {
          Name: 'Bottombarcode',
          Value:
            vm.queryBarcodeForm.BottomBarCode === undefined
              ? null
              : vm.queryBarcodeForm.BottomBarCode
        }
      ]

      var account = getCookie('Account')
      const userInput: IUserInputInquiryBarcode = {
        InputList: payload,
        Operator: account,
        InputSubList: null
      }

      userInputUpdateList(userInput).then(() => {
        console.log('user input top/bottom barcode add log', userInput)
      })

      updateList(payload).then((response) => {
        vm.isShowLoading = true
        if (response.data.statusCode === 200) {
          vm.finishedByAskNextNotifyFromSignalR()
        }
      })
    },

    /**
     * 等待通知再完成載入
     */
    finishedByAskNextNotifyFromSignalR() {
      var vm = this

      let connection = new signalR.HubConnectionBuilder()
        .withUrl(`${url}/inquiryHub`)
        .withAutomaticReconnect()
        .build()

      try {
        connection.start()
        console.log('finishedByAskNextNotifyFromSignalR connected')
        connection.on('ServiceNotifyAsk', (message) => {
          console.log('ServiceNotifyAsk', message)
          const receiveData = message as IAskedInputModel

          switch (receiveData.name) {
            case AskedEnum.Keyin:
              vm.isShowLoading = false
              vm.showModalValue = false
              break
          }
        })

        connection.onreconnecting((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Reconnecting)
          const errorMsg = `finishedByAskNextNotifyFromSignalR Connection lost due to error "${error}". Reconnecting.`
          window.$message.error(errorMsg)
          console.log('On reconnecting error', errorMsg)
        })

        connection.onreconnected((connectionId) => {
          console.assert(connection.state === signalR.HubConnectionState.Connected)
          const reconnectedMsg = `finishedByAskNextNotifyFromSignalR Connection reestablished. Connected with connectionId "${connectionId}".`
          window.$message.success(reconnectedMsg)
          console.log('On reconnected message', reconnectedMsg)
        })

        connection.onclose((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Disconnected)
          const oncloseMsg = `finishedByAskNextNotifyFromSignalR Connection closed due to error "${error}". 
          Try refreshing this page to restart the connection.`
          window.$message.success(oncloseMsg)
          console.log('onclose message', oncloseMsg)
        })
      } catch (error) {
        console.log('finishedByAskNextNotifyFromSignalR error', error)
      }
    }
  }
})
</script>
