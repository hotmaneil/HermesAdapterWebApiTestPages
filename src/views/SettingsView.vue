<template>
  <n-card :title="$t('Setting')" style="margin-bottom: 16px">
    <n-tabs type="line" animated>
      <n-tab-pane name="Common" tab="Common" v-if="isExistCommon">
        <CommonForm />
      </n-tab-pane>
      <n-tab-pane name="Hermes" tab="Hermes" v-if="isExistHermes">
        <HermesForm />
      </n-tab-pane>
      <n-tab-pane name="WorkOrder" tab="Work Order" v-if="isExistWorkOrder">
        <WorkOrderCompositionForm />
      </n-tab-pane>
      <n-tab-pane name="DigitalIO" tab="Digital IO" v-if="isExistDigitalIO">
        <DigitalForm />
      </n-tab-pane>
      <n-tab-pane name="OutPorts" tab="OutPorts" v-if="isExistOutPorts">
        <OutPortsForm />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommonForm from '@/components/Setting/CommonForm.vue'
import HermesForm from '@/components/Setting/HermesForm.vue'
import WorkOrderCompositionForm from '@/components/Setting/WorkOrderCompositionForm.vue'
import DigitalForm from '@/components/Setting/DigitalForm.vue'
import OutPortsForm from '@/components/Setting/OutPortsForm.vue'
import { getCookie } from 'typescript-cookie'
import { mapState } from 'pinia'
import { AccessControlList } from '@/stores/accessControlList'

export default defineComponent({
  components: {
    CommonForm,
    HermesForm,
    WorkOrderCompositionForm,
    DigitalForm,
    OutPortsForm
  },

  computed: {
    ...mapState(AccessControlList, ['storeAccessControlList'])
  },

  data() {
    return {
      isExistCommon: false,
      isExistHermes: false,
      isExistWorkOrder: false,
      isExistDigitalIO: false,
      isExistOutPorts: false
    }
  },

  created() {
    this.judgeLoad()
  },

  methods: {
    /**
     * 判斷載入完成，主要是避免重新整理而造成權限表來不及載入
     */
    judgeLoad() {
      const vm = this
      window.$loadingBar.start()
      const interval = setInterval(function () {
        if (vm.storeAccessControlList.length === 0) {
          console.log('wait storeAccessControlList')
        } else {
          vm.tabAccessControl()
          clearInterval(interval)
          window.$loadingBar.finish()
        }
      }, 100)
    },

    tabAccessControl() {
      const vm = this
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        console.log('vm.storeAccessControlList', vm.storeAccessControlList)

        const findCommon = vm.storeAccessControlList.find(
          (element) => element.functionCode === 'Common' && element.isMainFunction === true
        )
        if (findCommon) {
          vm.isExistCommon = true
        } else {
          vm.isExistCommon = false
        }

        const findHermes = vm.storeAccessControlList.find(
          (element) => element.functionCode === 'Hermes' && element.isMainFunction === true
        )
        if (findHermes) {
          vm.isExistHermes = true
        } else {
          vm.isExistHermes = false
        }

        const findWorkOrder = vm.storeAccessControlList.find(
          (element) => element.functionCode === 'WorkOrder' && element.isMainFunction === true
        )
        if (findWorkOrder) {
          vm.isExistWorkOrder = true
        } else {
          vm.isExistWorkOrder = false
        }

        const findDigitalIO = vm.storeAccessControlList.find(
          (element) => element.functionCode === 'DigitalIO' && element.isMainFunction === true
        )
        if (findDigitalIO) {
          vm.isExistDigitalIO = true
        } else {
          vm.isExistDigitalIO = false
        }

        const findOutPorts = vm.storeAccessControlList.find(
          (element) => element.functionCode === 'OutPorts' && element.isMainFunction === true
        )
        if (findOutPorts) {
          vm.isExistOutPorts = true
        } else {
          vm.isExistOutPorts = false
        }
      }
    }
  }
})
</script>
