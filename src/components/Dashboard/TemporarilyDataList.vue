<template>
  <n-card :title="title">
    <n-data-table
      v-model:checked-row-keys="checkedRowKeys"
      :columns="columnList"
      :data="boardIdRecordList"
      :pagination="pagination"
      :max-height="250"
    />
  </n-card>

  <n-modal
    v-model:show="showModal"
    style="width: 1024px"
    class="custom-card"
    preset="card"
    title="Board"
    :bordered="true"
    size="huge"
  >
    <template #header-extra></template>
    <n-form ref="formRef" size="medium" label-placement="left">
      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="12" label="Board ID">
          <n-input v-model:value="formData.boarD_ID" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Created By">
          <n-input v-model:value="formData.boarD_ID_CREATOR" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Product Type ID">
          <n-input v-model:value="formData.producT_TYPE_ID" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Top Barcode">
          <n-input v-model:value="formData.toP_BARCODE" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Work Order ID">
          <n-input v-model:value="formData.worK_ORDER_ID" readonly placeholder="" />
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <n-form ref="formRef" size="medium" label-placement="left">
      <n-grid :span="24" :x-gap="24">
        <n-form-item-gi :span="12" label="Length">
          <n-input v-model:value="formData.length" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Width">
          <n-input v-model:value="formData.width" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Top Clearance Height">
          <n-input v-model:value="formData.toP_CLEARANCE_HEIGHT" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Bottom Clearance Height">
          <n-input v-model:value="formData.bottoM_CLEARANCE_HEIGHT" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Batch ID">
          <n-input v-model:value="formData.batcH_ID" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Flipped">
          <n-select
            v-model:value="formData.flippeD_BOARD"
            placeholder="Select"
            :options="flippedBoardDropDownList"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Failed">
          <n-select
            v-model:value="formData.faileD_BOARD"
            placeholder="Select"
            :options="failedDropDownList"
            disabled
          />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Thickness">
          <n-input v-model:value="formData.thickness" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Conveyor Speed">
          <n-input v-model:value="formData.conveyoR_SPEED" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Weight">
          <n-input v-model:value="formData.weight" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Route">
          <n-input v-model:value="formData.route" readonly placeholder="" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="Action">
          <n-input v-model:value="formData.action" readonly placeholder="" />
        </n-form-item-gi>
      </n-grid>
    </n-form>

    <template #footer> </template>
  </n-modal>
</template>

<script lang="ts">
import { h, defineComponent, ref } from 'vue'
import * as signalR from '@microsoft/signalr'
import { NButton } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { renderLanguage, renderLanguageReturn } from '@/utils/Common'
import type IRecordBoard from '@/Interface/IRecordBoard'
import axios from 'axios'
import type { DropDownList } from '@/types/DropDownList'
import type { BoardRowData } from '@/types/BoardRowData'
import { BoardRowRecord } from '@/stores/boardRowRecord'
import { mapState } from 'pinia'
import {
  getBoardFlippedTypeDropDownList,
  getBoardFailedTypeDropDownList,
  getRecordBoardList
} from '@/api/Record'

/**
 * 全域變數-URL
 */
const url = window.config.webApi_URL

export default defineComponent({
  computed: {
    ...mapState(BoardRowRecord, ['storeBoardIdRecordList'])
  },
  data() {
    return {
      title: renderLanguage('BoardData'),
      checkedRowKeys: ref([3, 1]),

      columnList: [] as DataTableColumns<BoardRowData>,

      pagination: {
        pageSize: 10
      },

      showModal: false,

      formData: {} as IRecordBoard,

      boardIdRecordList: [] as BoardRowData[],

      /** 板子翻轉狀況 下拉選單項目清單 */
      flippedBoardDropDownList: [] as DropDownList[],

      /** 板子品質狀況 下拉選單項目清單 */
      failedDropDownList: [] as DropDownList[],

      /** 語系轉換區 */
      confirmDelete: renderLanguage('ConfirmDelete'),
      areYouSureToDelete: renderLanguage('AreYouSureToDelete'),
      sure: renderLanguage('Sure'),
      no: renderLanguage('No'),
      alreadyCancelDelete: renderLanguage('AlreadyCancelDelete'),
      deleteSuccess: renderLanguage('DeleteSuccess'),
      deleteFail: renderLanguage('DeleteFail'),
      noData: renderLanguage('NoData')
    }
  },

  created() {
    this.SetColumns()
    this.SetFlippedBoardDropDownList()
    this.SetBoardFailedDropDownList()
    this.GetBoardIdFromSignalR()
    this.getNewRecordBoardList()
  },

  methods: {
    /** 建立板子翻轉狀況 下拉選單項目清單 */
    SetFlippedBoardDropDownList() {
      var vm = this
      getBoardFlippedTypeDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.flippedBoardDropDownList = dataList
      })
    },

    /**
     * 建立板子品質狀況 下拉選單項目清單
     */
    SetBoardFailedDropDownList() {
      var vm = this
      getBoardFailedTypeDropDownList().then((response) => {
        const dataList: DropDownList[] = response.data.payload
        vm.failedDropDownList = dataList
      })
    },

    /**
     * 設定欄位
     */
    SetColumns() {
      var vm = this
      vm.columnList = [
        {
          title: 'Board ID',
          key: 'boarD_ID',
          width: 300
        },
        {
          title: 'Detail',
          key: 'Detail',
          render(row: BoardRowData) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'info',
                ghost: true,
                onClick: () => vm.ShowDetail(row)
              },
              { default: () => renderLanguageReturn('Detail') }
            )
          }
        },
        {
          title: 'Delete',
          key: 'Delete',
          render(row: BoardRowData) {
            return h(
              NButton,
              {
                size: 'small',
                type: 'error',
                ghost: true,
                onClick: () => vm.DeleteRecord(row)
              },
              { default: () => renderLanguageReturn('Delete') }
            )
          }
        }
      ]
    },

    /**
     * 顯示細節
     * @param rowData
     */
    ShowDetail(rowData: BoardRowData) {
      console.log('ShowDetail rowData.boardId:', rowData.boarD_ID)
      var vm = this

      const url = url
      axios
        .post(`${url}/api/Record/GetRecordBoard`, {
          BoardId: rowData.boarD_ID
        })
        .then(function (response) {
          if (response.data.statusCode == 200) {
            const data: IRecordBoard = response.data.payload
            vm.formData = data
            vm.showModal = true
          } else if (response.data.statusCode == 500) {
            vm.showModal = false
            window.$message.error(vm.noData)
          }
        })
    },

    /**
     * 刪除紀錄
     * @param rowData
     */
    DeleteRecord(rowData: BoardRowData) {
      const vm = this
      console.log('DeleteRecord rowData.boardId:', rowData.boarD_ID)
      window.$dialog.warning({
        title: vm.confirmDelete,
        content: vm.areYouSureToDelete,
        positiveText: vm.sure,
        negativeText: vm.no,
        onPositiveClick: () => {
          const url = url
          axios
            .post(`${url}/api/Record/DeleteRecordBoard`, {
              BoardId: rowData.boarD_ID
            })
            .then(function (response) {
              console.log('response.data.statusCode', response.data.statusCode)
              if (response.data.statusCode == 200) {
                vm.getNewRecordBoardList()
                // const store = BoardRowRecord()
                // store.removeFromBoardIdRecordList(rowData)
                window.$message.success(vm.deleteSuccess)
              } else if (response.data.statusCode == 500) {
                window.$message.error(vm.deleteFail)
              }
            })
        },
        onNegativeClick: () => {
          window.$message.info(vm.alreadyCancelDelete)
        }
      })
    },

    /** 取得新的板紀錄資料 */
    getNewRecordBoardList() {
      const vm = this
      getRecordBoardList().then((response) => {
        console.log('getRecordBoardList', response.data.payload)
        if (response.data.payload === null) {
          vm.boardIdRecordList = []
        } else {
          vm.boardIdRecordList = response.data.payload
        }
      })
    },

    /**
     * 從SignalR取得板Id
     */
    GetBoardIdFromSignalR() {
      const vm = this
      let connection = new signalR.HubConnectionBuilder().withUrl(`${url}/recordHub`).build()

      try {
        connection.start()
        console.log('GetBoardIdFromSignalR connected')

        connection.on('UpdateTemporarilyBoardIdList', (message) => {
          console.log('UpdateTemporarilyBoardIdList', message)
          vm.getNewRecordBoardList()
        })

        connection.onreconnecting((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Reconnecting)
          const errorMsg = `BoardId Connection lost due to error "${error}". Reconnecting.`
          window.$message.error(errorMsg)
          console.log('On reconnecting error', errorMsg)
        })

        connection.onreconnected((connectionId) => {
          console.assert(connection.state === signalR.HubConnectionState.Connected)
          const reconnectedMsg = `BoardId Connection reestablished. Connected with connectionId "${connectionId}".`
          window.$message.success(reconnectedMsg)
          console.log('On reconnected message', reconnectedMsg)
        })

        connection.onclose((error) => {
          console.assert(connection.state === signalR.HubConnectionState.Disconnected)
          const oncloseMsg = `BoardId Connection closed due to error "${error}". 
          Try refreshing this page to restart the connection.`
          window.$message.success(oncloseMsg)
          console.log('onclose message', oncloseMsg)
        })
      } catch (error) {
        console.log('GetBoardIdFromSignalR error', error)
      }
    }
  }
})
</script>
