<template>
  <n-drawer v-model:show="activeValue" :width="500" :placement="placement">
    <n-drawer-content :title="$t('SystemMessage')">
      <n-data-table
        size="smail"
        :columns="columns"
        :data="messageLogAllList"
        :max-height="780"
        :scroll-x="400"
        virtual-scroll
      />
    </n-drawer-content>
  </n-drawer>
</template>

<!-- 選項式寫法 -->
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type IMessageLog from '@/Interface/IMessageLog'
import { getAllMessageLogList } from '@/api/MessageLog'
import type { DrawerPlacement } from 'naive-ui'
import moment from 'moment'

export default defineComponent({
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    activeValue: {
      get() {
        return this.active
      },
      set(newValue: boolean) {
        this.$emit('update:active', newValue)
      }
    }
  },

  watch: {
    activeValue: {
      handler(newVal, oldVal) {
        console.log(`activeValue handler val: ${newVal},oldVal:${oldVal}`)
        if (newVal) {
          this.getMessageLogDataList()
        }
      }
    }
  },

  data() {
    return {
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

      messageLogAllList: [] as IMessageLog[],

      placement: ref<DrawerPlacement>('right')
    }
  },

  methods: {
    getMessageLogDataList() {
      const vm = this
      getAllMessageLogList().then((response) => {
        console.log('getAllMessageLogList response', response)
        const dataList: IMessageLog[] = response.data.payload
        dataList.forEach((element) => {
          element.loG_TIME = moment(element.loG_TIME).format('YYYY-MM-DD HH:mm:ss')
        })
        vm.messageLogAllList = dataList
      })
    }
  }
})
</script>
