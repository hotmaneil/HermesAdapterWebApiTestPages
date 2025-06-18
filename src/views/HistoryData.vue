<template>
  <n-card :title="$t('History')">
    <n-form ref="formRef" inline :label-width="80" :model="searchForm">
      <n-form-item :label="$t('Date')">
        <n-date-picker v-model:value="searchForm.SelectedDate" type="date" />
      </n-form-item>

      <n-form-item>
        <n-button @Click="searchDataList()"> {{ $t('Search') }} </n-button>
      </n-form-item>
    </n-form>

    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <SummaryTable
          :title="arrivedTitle"
          :history-list="arrivedHistoryList"
          :pagination="arrivedPagination"
          @update:pagination="changeArrivedPagination"
        />
      </n-gi>

      <n-gi>
        <SummaryTable
          :title="departedTitle"
          :history-list="departedHistoryList"
          :pagination="departedPagination"
          @update:pagination="changeDepartedPagination"
        />
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SummaryTable from '@/components/History/SummaryTable.vue'
import { getHistoryList, deleteTodayTempFile } from '@/api/History'
import moment from 'moment'
import { ArrivedOrDepartedEnum } from '@/Enum/enums'
import type { Pagination } from '@/types/Pagination'

export default defineComponent({
  components: {
    SummaryTable
  },

  data() {
    return {
      searchForm: {} as ISearchForm,

      arrivedTitle: 'Entrance',

      /** BoardArrived用的歷史資料 */
      arrivedHistoryList: [] as IHistory[],

      /** BoardArrived用的分頁 */
      arrivedPagination: {
        page: 1,
        pageSize: 50
      } as Pagination,

      departedTitle: 'Exit',

      /** BoardDeparted用的歷史資料 */
      departedHistoryList: [] as IHistory[],

      /** BoardDeparted用的分頁 */
      departedPagination: {
        page: 1,
        pageSize: 50
      } as Pagination
    }
  },

  created() {
    this.searchForm.SelectedDate = new Date()
  },

  methods: {
    /**
     * 搜尋出歷史資料列表
     */
    async searchDataList() {
      var vm = this
      vm.arrivedPagination.page = 1
      const arrived = await vm.searchBoardArrivedHistoryList(
        vm.arrivedPagination.pageSize,
        vm.arrivedPagination.page
      )
      console.log(arrived)

      vm.departedPagination.page = 1
      const departed = await vm.searchBoardDepartedHistoryList(
        vm.departedPagination.pageSize,
        vm.departedPagination.page
      )
      console.log(departed)

      const deleteTemp = await vm.deleteTempFile()
      console.log(deleteTemp)
    },

    /**
     * 搜尋BoardArrived用的歷史資料
     * @param pageSize
     * @param currentPage
     */
    searchBoardArrivedHistoryList(pageSize: number, currentPage: number) {
      return new Promise((resolve, reject) => {
        const vm = this
        vm.arrivedHistoryList = []

        const payload: IHistorySearch = {
          Type: ArrivedOrDepartedEnum.Arrived,
          Date: moment(vm.searchForm.SelectedDate).format('yyyy-MM-DD'),
          PageSize: pageSize,
          CurrentPage: currentPage
        }
        console.log('getBoardArrivedHistoryList payload', payload)

        getHistoryList(payload).then((response) => {
          var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.sss')
          if (response.data.statusCode === 200) {
            const vm = this
            const dataList: IHistory[] = response.data.payload

            const msg = `get BoardArrivedHistoryList success,time:${returnTime}`
            resolve(msg)

            if (dataList === null) {
              vm.arrivedHistoryList = []
              vm.arrivedPagination.total = 0
              vm.arrivedPagination.pageCount = 0
            } else {
              vm.arrivedHistoryList = dataList
              vm.arrivedPagination.total = response.data.pagination.total
              vm.arrivedPagination.pageCount = response.data.pagination.pageCount
            }
          } else if (response.data.statusCode === 500) {
            const msg = 'get BoardArrivedHistoryList fail'
            reject(msg)
          } else if (response.data.statusCode === 404) {
            const msg = `${response.data.message},time:${returnTime}`
            resolve(msg)
          }
        })
      })
    },

    /**
     * 搜尋BoardDeparted用的歷史資料
     * @param pageSize
     * @param currentPage
     */
    searchBoardDepartedHistoryList(pageSize: number, currentPage: number) {
      return new Promise((resolve, reject) => {
        const vm = this
        vm.departedHistoryList = []

        const payload: IHistorySearch = {
          Type: ArrivedOrDepartedEnum.Departed,
          Date: moment(vm.searchForm.SelectedDate).format('yyyy-MM-DD'),
          PageSize: pageSize,
          CurrentPage: currentPage
        }
        console.log('getBoardDepartedHistoryList payload', payload)

        getHistoryList(payload).then((response) => {
          const vm = this

          var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.sss')

          if (response.data.statusCode === 200) {
            const dataList: IHistory[] = response.data.payload

            const msg = `get BoardDepartedHistoryList success,time:${returnTime}`
            resolve(msg)

            if (dataList === null) {
              vm.departedHistoryList = []
              vm.departedPagination.total = 0
              vm.departedPagination.pageCount = 0
            } else {
              vm.departedHistoryList = dataList
              vm.departedPagination.total = response.data.pagination.total
              vm.departedPagination.pageCount = response.data.pagination.pageCount
            }
          } else if (response.data.statusCode === 500) {
            const msg = 'get BoardDepartedHistoryList fail'
            reject(msg)
          } else if (response.data.statusCode === 404) {
            const msg = `${response.data.message},time:${returnTime}`
            resolve(msg)
          }
        })
      })
    },

    /**
     * 刪除暫存檔案
     */
    deleteTempFile() {
      return new Promise((resolve, reject) => {
        const vm = this
        const payload: IHistorySearch = {
          Type: 99,
          Date: moment(vm.searchForm.SelectedDate).format('yyyy-MM-DD'),
          PageSize: 0,
          CurrentPage: 0
        }
        deleteTodayTempFile(payload).then((response) => {
          if (response.data.statusCode === 200) {
            var returnTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss.sss')
            const msg = `${response.data.message},time:${returnTime}`
            resolve(msg)
          } else if (response.data.statusCode === 500) {
            const msg = 'deleteTodayTempFile fail'
            reject(msg)
          }
        })
        console.log('deleteTodayTempFile payload', payload)
      })
    },

    /**
     * 變更 BoardArrived用的分頁
     * @param source
     */
    changeArrivedPagination(source: Pagination) {
      const vm = this
      vm.arrivedPagination = source
      console.log('changeArrivedPagination source', source)
      vm.searchBoardArrivedHistoryList(source.pageSize, source.page)
    },

    /**
     * 變更 BoardDeparted用的分頁
     */
    changeDepartedPagination(source: Pagination) {
      const vm = this
      vm.departedPagination = source
      vm.searchBoardDepartedHistoryList(source.pageSize, source.page)
    }
  }
})
</script>

<style></style>
