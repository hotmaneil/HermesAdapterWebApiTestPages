<template>
  <n-grid x-gap="12" :cols="2">
    <n-gi>
      <n-grid cols="1">
        <n-grid-item>
          <div :class="inOutPutClass">Input</div>
        </n-grid-item>
      </n-grid>
    </n-gi>

    <n-gi>
      <n-grid cols="1">
        <n-grid-item>
          <div :class="inOutPutClass">Output</div>
        </n-grid-item>
      </n-grid>
    </n-gi>
  </n-grid>

  <n-grid x-gap="12" :cols="6">
    <n-gi>
      <div>
        <n-card :class="BrMrStatus.UpstreamMachineReadyClass" size="small">
          <n-grid cols="6" item-responsive responsive="screen">
            <n-grid-item>
              <div v-if="BrMrStatus.Upstream_MachineReady === 'Y'">
                <n-icon size="25" color="#0e7a0d">
                  <SvgIcon :icon="PowerFilledName" />
                </n-icon>
              </div>
              <div v-else-if="BrMrStatus.Upstream_MachineReady === 'N'">
                <n-icon size="25">
                  <SvgIcon :icon="PowerOffFilledName" />
                </n-icon>
              </div>
            </n-grid-item>
            <n-grid-item span="0 m:1 l:5" style="height: 3.3em">
              {{ $t('UpstreamMachineReady') }}
            </n-grid-item>
          </n-grid>
        </n-card>
      </div>
    </n-gi>

    <n-gi>
      <div>
        <n-card :class="BrMrStatus.DownstreamBoardAvailableClass" size="small">
          <n-grid cols="6" item-responsive responsive="screen">
            <n-grid-item>
              <div v-if="BrMrStatus.Downstream_BoardAvailable === 'Y'">
                <n-icon size="25" color="#0e7a0d">
                  <SvgIcon :icon="PowerFilledName" />
                </n-icon>
              </div>
              <div v-else-if="BrMrStatus.Downstream_BoardAvailable === 'N'">
                <n-icon size="25">
                  <SvgIcon :icon="PowerOffFilledName" />
                </n-icon>
              </div>
            </n-grid-item>
            <n-grid-item span="0 m:1 l:5" style="height: 3.3em">
              {{ $t('DownstreamBoardAvailable') }}
            </n-grid-item>
          </n-grid>
        </n-card>
      </div>
    </n-gi>

    <n-gi>
      <div>
        <n-card :class="BrMrStatus.DownstreamFailedBoardAvailableClass" size="small">
          <n-grid cols="6" item-responsive responsive="screen">
            <n-grid-item>
              <div v-if="BrMrStatus.Downstream_FailedBoardAvailable === 'Y'">
                <n-icon size="25" color="#0e7a0d">
                  <SvgIcon :icon="PowerFilledName" />
                </n-icon>
              </div>
              <div v-else-if="BrMrStatus.Downstream_FailedBoardAvailable === 'N'">
                <n-icon size="25">
                  <SvgIcon :icon="PowerOffFilledName" />
                </n-icon>
              </div>
            </n-grid-item>
            <n-grid-item span="0 m:1 l:5" style="height: 3.3em">
              {{ $t('DownstreamFailedBoardAvailable') }}
            </n-grid-item>
          </n-grid>
        </n-card>
      </div>
    </n-gi>

    <n-gi>
      <div>
        <n-card :class="BrMrStatus.UpstreamBoardAvailableClass" size="small">
          <n-grid cols="6" item-responsive responsive="screen">
            <n-grid-item>
              <div v-if="BrMrStatus.Upstream_BoardAvailable === 'Y'">
                <n-icon size="25" color="#0e7a0d">
                  <SvgIcon :icon="PowerFilledName" />
                </n-icon>
              </div>
              <div v-else-if="BrMrStatus.Upstream_BoardAvailable === 'N'">
                <n-icon size="25">
                  <SvgIcon :icon="PowerOffFilledName" />
                </n-icon>
              </div>
            </n-grid-item>
            <n-grid-item span="0 m:1 l:5" style="height: 3.3em">
              {{ $t('UpstreamBoardAvailable') }}
            </n-grid-item>
          </n-grid>
        </n-card>
      </div>
    </n-gi>

    <n-gi>
      <div>
        <n-card :class="BrMrStatus.UpstreamFailedBoardAvailableClass" size="small">
          <n-grid cols="6" item-responsive responsive="screen">
            <n-grid-item>
              <div v-if="BrMrStatus.Upstream_FailedBoardAvailable === 'Y'">
                <n-icon size="25" color="#0e7a0d">
                  <SvgIcon :icon="PowerFilledName" />
                </n-icon>
              </div>
              <div v-else-if="BrMrStatus.Upstream_FailedBoardAvailable === 'N'">
                <n-icon size="25">
                  <SvgIcon :icon="PowerOffFilledName" />
                </n-icon>
              </div>
            </n-grid-item>
            <n-grid-item span="0 m:1 l:5" style="height: 3.3em">
              {{ $t('UpstreamFailedBoardAvailable') }}
            </n-grid-item>
          </n-grid>
        </n-card>
      </div>
    </n-gi>

    <n-gi>
      <div>
        <n-card :class="BrMrStatus.DownstreamMachineReadyClass" size="small">
          <n-grid cols="6" item-responsive responsive="screen">
            <n-grid-item>
              <div v-if="BrMrStatus.Downstream_MachineReady === 'Y'">
                <n-icon size="25" color="#0e7a0d">
                  <SvgIcon :icon="PowerFilledName" />
                </n-icon>
              </div>
              <div v-else-if="BrMrStatus.Downstream_MachineReady === 'N'">
                <n-icon size="25">
                  <SvgIcon :icon="PowerOffFilledName" />
                </n-icon>
              </div>
            </n-grid-item>
            <n-grid-item span="0 m:1 l:5" style="height: 3.3em">
              {{ $t('DownstreamMachineReady') }}
            </n-grid-item>
          </n-grid>
        </n-card>
      </div>
    </n-gi>
  </n-grid>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ColumnRunningBRMR } from '@/types/ColumnRunningBRMR'
import { Theme } from '@/stores/theme'
import { ThemeModeEnum } from '@/Enum/enums'
import SvgIcon from '@/components/SvgIcon.vue'

export default defineComponent({
  props: {
    BrMrStatus: {
      type: Object as PropType<ColumnRunningBRMR>,
      required: true
    }
  },
  components: {
    SvgIcon
  },

  computed: {
    inOutPutClass() {
      return Theme().storeTheme === ThemeModeEnum.Dark ? 'DIO_InOutPutDark' : 'DIO_InOutPut'
    }
  },

  data() {
    return {
      PowerFilledName: 'PowerFilled',
      PowerOffFilledName: 'PowerOffFilled'
    }
  },

  methods: {}
})
</script>

<style lang="scss" scoped src="@/assets/scss/connectStatus.scss"></style>
