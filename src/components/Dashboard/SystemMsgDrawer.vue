<template>
  <n-drawer v-model:show="activeValue" :width="502" :placement="placement">
    <n-drawer-content :title="$t('SystemMessage')">
      <n-infinite-scroll :distance="10" @load="handleLoad">
        <div v-for="item in state.messageLogDataList" :key="item.loG_TIME" class="item">
          {{ item.loG_TIME }} <span>&nbsp;</span> {{ item.messagE_CONTENT }}
        </div>
        <div v-if="noMore" style="color: #ea0000">{{ $t('noMore') }}</div>
      </n-infinite-scroll>
    </n-drawer-content>
  </n-drawer>
</template>

<!-- 組合式寫法 -->
<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect, reactive } from 'vue'
import type { DrawerPlacement, DataTableColumns } from 'naive-ui'
import type IMessageLog from '@/Interface/IMessageLog'
import { getMessageLogList, getMessageLogScrollData } from '@/api/MessageLog'
import moment from 'moment'
import type { PageParam } from '@/types/PageParam'
import type { ScrollParam } from '@/types/ScrollParam'

/**
 * 定義欄位
 */
const columns: DataTableColumns<IMessageLog> = [
  {
    title: 'LogTime',
    key: 'loG_TIME',
    width: 160
  },
  {
    title: 'MessageContent',
    key: 'messagE_CONTENT'
  }
]

export default defineComponent({
  emits: ['update:active'],
  props: {
    active: {
      type: Boolean
    }
  },

  setup(props, { emit }) {
    /** 系統訊息列表 */
    const state = reactive({
      messageLogDataList: [] as IMessageLog[]
    })

    const placement = ref<DrawerPlacement>('right')
    const activeValue = computed({
      get() {
        return props.active
      },
      set(newValue: boolean) {
        console.log('newValue', newValue)
        emit('update:active', newValue)
      }
    })

    //第1種
    watch(
      activeValue,
      (newValue, oldValue) => {
        console.log('watch newValue', newValue)
        console.log('watch oldValue', oldValue)

        if (newValue === true) {
          console.log('watch...')
          getDataList()
        }
      },
      {
        immediate: true
      }
    )

    //第2種:捲軸每捲到最下面會重複呼叫getDataList
    // watchEffect(async () => {
    //   if (activeValue.value === true) {
    //     console.log('watchEffect...')
    //     getDataList()
    //   }
    // })

    /**
     * 取得資料列表
     */
    function getDataList() {
      const payload: PageParam = {
        PageSize: count.value,
        CurrentPage: 1
      }
      getMessageLogList(payload).then((response) => {
        const dataList: IMessageLog[] = response.data.payload
        dataList.forEach((element) => {
          element.loG_TIME = moment(element.loG_TIME).format('YYYY-MM-DD HH:mm:ss')
        })
        state.messageLogDataList = dataList
      })
    }

    /** scroll筆數，15.6吋螢幕 27 筆，24吋螢幕37筆 */

    /** 瀏覽器高度 */
    const height = window.innerHeight
    const count = ref(27)
    if (height <= 695) {
      count.value = 27
    } else if (height >= 911 && height <= 1024) {
      count.value = 37
    }

    /** 是否沒有更多資料 */
    const noMore = ref(false)

    function handleLoad() {
      count.value += 1

      const payload: ScrollParam = {
        SkipRow: count.value,
        RetriveRow: 1
      }
      getMessageLogScrollData(payload).then((response) => {
        const dataList: IMessageLog[] = response.data.payload
        if (dataList === null) {
          noMore.value = true
        } else {
          noMore.value = false
          dataList.forEach((element) => {
            element.loG_TIME = moment(element.loG_TIME).format('YYYY-MM-DD HH:mm:ss')
            state.messageLogDataList.push(element)
          })
        }
      })
    }

    return {
      props,
      activeValue,
      placement,
      columns,
      state,
      getDataList,
      count,
      handleLoad,
      height,
      noMore
    }
  }
})
</script>
