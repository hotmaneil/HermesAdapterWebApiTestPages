<template>
  <n-grid x-gap="10" :cols="4">
    <n-gi>
      <div>
        <n-card title="Lockinput" :class="runStatus.LockinputClass" size="small">
          <template #header-extra>
            <div
              v-if="
                runStatus.Lockinput === 0 ||
                runStatus.Lockinput === 2 ||
                runStatus.Lockinput === 3 ||
                runStatus.Lockinput === 4 ||
                runStatus.Lockinput === 5 ||
                (runStatus.Lockinput >= 6 && runStatus.Lockinput <= 999) ||
                runStatus.Lockinput >= 1000
              "
            >
              <img src="@/assets/Unlock.png" width="21" />
            </div>
            <div v-else-if="runStatus.Lockinput === 1">
              <img src="@/assets/Lock.png" width="21" />
            </div>
          </template>

          <div style="font-size: 1em">
            {{ runStatus.Lockinput_Status }}
          </div>
        </n-card>
      </div>
    </n-gi>
    <n-gi>
      <div>
        <n-card :title="labelSupervisory" :class="runStatus.SupervisoryClass" size="small">
          <template #header-extra>
            <div v-if="runStatus.Supervisory === 'S'">
              <img src="@/assets/NoUse.png" width="21" />
            </div>
            <div v-else-if="runStatus.Supervisory === 'Y'">
              <img src="@/assets/connect.png" width="21" />
            </div>
            <div v-else-if="runStatus.Supervisory === 'N'">
              <img src="@/assets/disconnect.png" width="21" />
            </div>
          </template>
          {{ runStatus.Supervisory_Status }}
        </n-card>
      </div>
    </n-gi>
    <n-gi>
      <div>
        <n-card :title="labelUpstream" :class="runStatus.UpstreamClass" size="small">
          <template #header-extra>
            <div v-if="runStatus.Upstream === 'S'">
              <img src="@/assets/NoUse.png" width="21" />
            </div>
            <div v-else-if="runStatus.Upstream === 'Y'">
              <img src="@/assets/connect.png" width="21" />
            </div>
            <div v-else-if="runStatus.Upstream === 'N'">
              <img src="@/assets/disconnect.png" width="21" />
            </div>
          </template>
          {{ runStatus.Upstream_Status }}
        </n-card>
      </div>
    </n-gi>
    <n-gi>
      <div>
        <n-card :title="labelDownstream" :class="runStatus.DownstreamClass" size="small">
          <template #header-extra>
            <div v-if="runStatus.Downstream === 'S'">
              <img src="@/assets/NoUse.png" width="21" />
            </div>
            <div v-else-if="runStatus.Downstream === 'Y'">
              <img src="@/assets/connect.png" width="21" />
            </div>
            <div v-else-if="runStatus.Downstream === 'N'">
              <img src="@/assets/disconnect.png" width="21" />
            </div>
          </template>
          {{ runStatus.Downstream_Status }}
        </n-card>
      </div>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import type { ColumnRunning } from '@/types/ColumnRunning'
import { renderLanguage } from '@/utils/Common'

export default defineComponent({
  props: {
    runStatus: {
      type: Object as PropType<ColumnRunning>,
      required: true
    }
  },

  data() {
    return {
      labelSupervisory: renderLanguage('Supervisory'),
      labelUpstream: renderLanguage('Upstream'),
      labelDownstream: renderLanguage('Downstream')
    }
  },

  methods: {}
})
</script>
<style lang="scss" scoped src="@/assets/scss/connectStatus.scss"></style>
