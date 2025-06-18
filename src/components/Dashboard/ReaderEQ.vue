<template>
  <n-grid x-gap="10" :cols="3">
    <n-gi>
      <n-card title="Reader1" :class="readerEQStatus.Reader1Class" size="small">
        <template #header-extra>
          <div v-if="readerEQStatus.Reader1 === 'S'">
            <img src="@/assets/NoUse.png" width="21" />
          </div>
          <div v-else-if="readerEQStatus.Reader1 === 'Y'">
            <img src="@/assets/connect.png" width="21" />
          </div>
          <div v-else-if="readerEQStatus.Reader1 === 'N'">
            <img src="@/assets/disconnect.png" width="21" />
          </div>
        </template>
        {{ connectStatus(readerEQStatus.Reader1) }}
      </n-card>
    </n-gi>

    <n-gi>
      <n-card title="Reader2" :class="readerEQStatus.Reader2Class" size="small">
        <template #header-extra>
          <div v-if="readerEQStatus.Reader2 === 'S'">
            <img src="@/assets/NoUse.png" width="21" />
          </div>
          <div v-else-if="readerEQStatus.Reader2 === 'Y'">
            <img src="@/assets/connect.png" width="21" />
          </div>
          <div v-else-if="readerEQStatus.Reader2 === 'N'">
            <img src="@/assets/disconnect.png" width="21" />
          </div>
        </template>
        {{ connectStatus(readerEQStatus.Reader2) }}
      </n-card>
    </n-gi>

    <n-gi>
      <n-card title="EQ" :class="readerEQStatus.EQClass" size="small">
        <template #header-extra>
          <div v-if="readerEQStatus.EQ === 'S'">
            <img src="@/assets/NoUse.png" width="21" />
          </div>
          <div v-else-if="readerEQStatus.EQ === 'Y'">
            <img src="@/assets/connect.png" width="21" />
          </div>
          <div v-else-if="readerEQStatus.EQ === 'N'">
            <img src="@/assets/disconnect.png" width="21" />
          </div>
        </template>
        {{ connectStatus(readerEQStatus.EQ) }}
      </n-card>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { ReaderEQStatus } from '@/types/ReaderEQStatus'
import { renderLanguageReturn } from '@/utils/Common'

export default defineComponent({
  props: {
    readerEQStatus: {
      type: Object as PropType<ReaderEQStatus>,
      required: true
    }
  },

  computed: {},

  methods: {
    /**
     * 連線狀態
     * @param source
     */
    connectStatus(source: string) {
      let returnValue = ''
      switch (source) {
        case 'S':
          returnValue = renderLanguageReturn('ConnectStatus.Disabled')
          break
        case 'Y':
          returnValue = renderLanguageReturn('ConnectStatus.Connected')
          break
        case 'N':
          returnValue = renderLanguageReturn('ConnectStatus.NotConnected')
          break
        default:
          break
      }
      return returnValue
    }
  }
})
</script>
<style lang="scss" scoped src="@/assets/scss/connectStatus.scss"></style>
