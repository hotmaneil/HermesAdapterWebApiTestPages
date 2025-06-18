<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <n-input-group>
        <n-input-group-label>{{ $t('ReceivedMessage') }}</n-input-group-label>
        <n-input readonly placeholder="" v-model:value="messageInfo.ReceivedMessage" />
        <n-input-group-label>{{ $t('MessageResource') }}</n-input-group-label>
        <n-input readonly placeholder="" v-model:value="messageInfo.ReceivedMessageResource" />
      </n-input-group>
    </n-gi>

    <n-gi>
      <n-input-group>
        <n-input-group-label>{{ $t('HasBeenSentMessage') }}</n-input-group-label>
        <n-input readonly placeholder="" v-model:value="messageInfo.HasBeenSentMessage" />
        <n-input-group-label>{{ $t('MessageResource') }}</n-input-group-label>
        <n-input readonly placeholder="" v-model:value="messageInfo.HasBeenSentMessageResource" />
      </n-input-group>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import type { ReceiveSendMsg } from '@/types/ReceiveSendMsg'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    messageInfo: {
      type: Object as PropType<ReceiveSendMsg>,
      required: true
    }
  }
})
</script>

<style scoped>
.msgLabel {
  border-color: black;
  width: '50%';
  background-color: #fcfcfc;
}
</style>
