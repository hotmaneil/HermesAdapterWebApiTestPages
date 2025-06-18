<template>
  <n-card :title="title">
    <template #header-extra>
      <n-button ghost type="success" @click="isActive = true" size="tiny">
        {{ $t('more') }}
      </n-button>
    </template>

    <n-data-table size="smail" :columns="columns" :data="MessageLogList" :max-height="250" />
    <n-pagination
      v-model:page="pagination.page"
      :page-count="pagination.pageCount"
      :on-update:page="UpdatePagination"
    />
  </n-card>
  <SystemMsgDrawer :active="isActive" @update:active="updateDrawer" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { renderLanguage } from '@/utils/Common'
import type IMessageLog from '@/Interface/IMessageLog'
import { Pagination } from '@/types/Pagination'
import moment from 'moment'
import * as signalR from '@microsoft/signalr'
import { getMessageLogList } from '@/api/MessageLog'
import type { PageParam } from '@/types/PageParam'
import SystemMsgDrawer from '@/components/Dashboard/SystemMsgDrawer.vue'

/**
 * 全域變數-URL
 */
const url = window.config.webApi_URL

export default defineComponent({
  components: {
    SystemMsgDrawer
  },
  data() {
    return {
      title: renderLanguage('SystemMessage'),
      columns: [
        {
          title: 'LogTime',
          key: 'loG_TIME',
          width: 150
        },
        {
          title: 'MessageContent',
          key: 'messagE_CONTENT'
        }
      ],
      MessageLogList: [] as IMessageLog[],
      pagination: {
        page: 1,
        pageSize: 10
      } as Pagination,

      /** 開啟more Drawer */
      isActive: false
    }
  },

  created() {
    this.SearchSystemMsgLogList(this.pagination.pageSize, this.pagination.page)
    this.GetSystemMsgUpdateNotifyFromSignalR()
  },

  methods: {
    /**
     * 更新頁面參數
     * @param pageNumber
     */
    UpdatePagination(pageNumber: number) {
      const vm = this
      vm.pagination.page = pageNumber
      this.SearchSystemMsgLogList(vm.pagination.pageSize, vm.pagination.page)
    },

    /**
     * 搜尋系統訊息日誌列表
     * @param pageSize
     * @param currentPage
     */
    SearchSystemMsgLogList(pageSize: number, currentPage: number) {
      const vm = this
      const payload: PageParam = {
        PageSize: pageSize,
        CurrentPage: currentPage
      }

      getMessageLogList(payload).then((response) => {
        const dataList: IMessageLog[] = response.data.payload
        dataList.forEach((element) => {
          element.loG_TIME = moment(element.loG_TIME).format('YYYY-MM-DD HH:mm:ss')
        })
        vm.MessageLogList = dataList
        vm.pagination.total = response.data.pagination.total
        vm.pagination.pageCount = response.data.pagination.pageCount
      })
    },

    /**
     * 從SignalR獲得通知系統訊息更新
     */
    GetSystemMsgUpdateNotifyFromSignalR() {
      const vm = this
      let connection = new signalR.HubConnectionBuilder()
        .withUrl(`${url}/messageHub`)
        .withAutomaticReconnect()
        .build()

      try {
        connection.start()
        console.log('GetSystemMsgUpdateNotifyFromSignalR connected')

        connection.on('NotifySystemMessage', (message) => {
          console.log('NotifySystemMessage', message)
          if (message.messageContent !== undefined) {
            this.SearchSystemMsgLogList(vm.pagination.pageSize, vm.pagination.page)
          }
        })

        connection.onreconnecting((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Reconnecting)
          const errorMsg = `SystemMsgUpdateNotify Connection lost due to error "${error}". Reconnecting.`
          window.$message.error(errorMsg)
          console.log('On reconnecting error', errorMsg)
        })

        connection.onreconnected((connectionId) => {
          console.assert(connection.state === signalR.HubConnectionState.Connected)
          const reconnectedMsg = `SystemMsgUpdateNotify Connection reestablished. Connected with connectionId "${connectionId}".`
          window.$message.success(reconnectedMsg)
          console.log('On reconnected message', reconnectedMsg)
        })

        connection.onclose((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Disconnected)
          const oncloseMsg = ` SystemMsgUpdateNotify Connection closed due to error "${error}". 
          Try refreshing this page to restart the connection.`
          window.$message.success(oncloseMsg)
          console.log('onclose message', oncloseMsg)
        })
      } catch (error) {
        console.log('GetSystemMsgUpdateNotifyFromSignalR error', error)
      }
    },

    /** 更新Drawer開啟狀態 */
    updateDrawer(source: boolean) {
      const vm = this
      vm.isActive = source
    }
  }
})
</script>
