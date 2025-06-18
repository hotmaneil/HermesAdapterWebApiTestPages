<template>
  <n-button type="info" ghost @click="SaveButtonClickByAsync" v-if="isEnableSaveBtn">
    {{ $t('Save') }}
  </n-button>

  <n-spin size="large" :show="isShowLoading">
    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <n-card title="">
          <n-form ref="formMain">
            <n-form-item path="WorkOrderData" :label="$t('Settings.WorkOrderData')">
              <n-radio-group
                name="radiogroupWorkOrderData"
                v-model:value="workOrderFormData.WorkOrderData"
              >
                <n-radio-button value="0"> {{ $t('Settings.Inquire') }} </n-radio-button>
                <n-radio-button value="1"> {{ $t('Settings.ManualKeyin') }} </n-radio-button>
              </n-radio-group>

              <n-tag type="warning">{{ $t('Settings.WorkOrderDataWarnMsg') }}</n-tag>
            </n-form-item>

            <n-form-item path="QWINoData" :label="$t('Settings.NoDataAction')">
              <n-radio-group name="radiogroupQWINoData" v-model:value="workOrderFormData.QWINoData">
                <n-radio-button value="0"> {{ $t('Settings.StopAndWait') }} </n-radio-button>
                <n-radio-button value="1"> {{ $t('Settings.CreateNewProfile') }} </n-radio-button>
              </n-radio-group>

              <n-tag type="warning">{{ $t('Settings.QWINoDataWarnMsg') }}</n-tag>
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>
    </n-grid>

    <n-grid x-gap="12" :cols="2">
      <n-gi>
        <n-card :title="$t('Settings.WorkOrderInfo')">
          <n-form ref="formWorkOrder" :model="workOrderFormData">
            <n-form-item path="WorkOrderID" :label="$t('Settings.WorkOrderID')">
              <n-input v-model:value="workOrderFormData.WorkOrderID" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="BatchID" :label="$t('Settings.BatchID')">
              <n-input v-model:value="workOrderFormData.BatchID" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="FailedBoard" :label="$t('Settings.FailedBoard')">
              <n-select
                v-model:value="workOrderFormData.FailedBoard"
                :options="failedBoardDropDownList"
              />
            </n-form-item>

            <n-form-item path="ProductTypeID" :label="$t('Settings.ProductTypeID')">
              <n-input v-model:value="workOrderFormData.ProductTypeID" @keydown.enter.prevent />
            </n-form-item>

            <n-form-item path="FlippedBoard" :label="$t('Settings.FlippedBoard')">
              <n-select
                v-model:value="workOrderFormData.FlippedBoard"
                :options="flippedBoardDropDownList"
              />
            </n-form-item>

            <n-form-item path="Topbarcodetitle" label="TopBarCode">
              <n-input v-model:value="workOrderFormData.Topbarcodetitle" @keydown.enter.prevent />
              <n-select
                v-model:value="workOrderFormData.Topbarcodetype"
                :options="barcodeTypeDropDownList"
              />
            </n-form-item>

            <n-form-item path="Bottombarcodetitle" label="BottomBarCode">
              <n-input
                v-model:value="workOrderFormData.Bottombarcodetitle"
                @keydown.enter.prevent
              />
              <n-select
                v-model:value="workOrderFormData.Bottombarcodetype"
                :options="barcodeTypeDropDownList"
              />
            </n-form-item>

            <n-grid :span="24" :x-gap="24">
              <n-form-item-gi :span="12" path="Length" :label="$t('Settings.Length')">
                <n-input-number
                  :step="0.01"
                  v-model:value="workOrderFormData.Length"
                  @keydown.enter.prevent
                />
              </n-form-item-gi>

              <n-form-item-gi :span="12" path="Width" :label="$t('Settings.Width')">
                <n-input-number
                  :step="0.01"
                  v-model:value="workOrderFormData.Width"
                  @keydown.enter.prevent
                />
              </n-form-item-gi>

              <n-form-item-gi :span="12" path="Thickness" :label="$t('Settings.Thickness')">
                <n-input-number
                  :step="0.01"
                  v-model:value="workOrderFormData.Thickness"
                  @keydown.enter.prevent
                />
              </n-form-item-gi>

              <n-form-item-gi :span="12" path="ConveyorSpeed" :label="$t('Settings.ConveyorSpeed')">
                <n-input-number
                  :step="0.01"
                  v-model:value="workOrderFormData.ConveyorSpeed"
                  @keydown.enter.prevent
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                path="TopClearanceHeight"
                :label="$t('Settings.TopClearanceHeight')"
              >
                <n-input-number
                  :step="0.01"
                  v-model:value="workOrderFormData.TopClearanceHeight"
                  @keydown.enter.prevent
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                path="BottomClearanceHeight"
                :label="$t('Settings.BottomClearanceHeight')"
              >
                <n-input-number
                  :step="0.01"
                  v-model:value="workOrderFormData.BottomClearanceHeight"
                  @keydown.enter.prevent
                />
              </n-form-item-gi>

              <n-form-item-gi :span="12" path="Weight" :label="$t('Settings.Weight')">
                <n-input-number
                  :step="0.01"
                  v-model:value="workOrderFormData.Weight"
                  @keydown.enter.prevent
                />
              </n-form-item-gi>

              <n-form-item-gi
                :span="12"
                path="Route"
                :label="$t('Settings.Route')"
                v-if="versionNumber > 130"
              >
                <n-input-number v-model:value="workOrderFormData.Route" @keydown.enter.prevent />
              </n-form-item-gi>
            </n-grid>

            <n-form-item path="Action" :label="$t('Settings.Action')" v-if="versionNumber > 130">
              <n-input-number
                v-model:value="workOrderFormData.Action"
                @keydown.enter.prevent
                disabled
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-gi>

      <n-gi>
        <n-card :title="$t('Settings.SubBoards')">
          <n-table :bordered="false" :single-line="false">
            <thead>
              <tr>
                <th>{{ $t('Select') }}</th>
                <th>{{ $t('Postion') }}</th>
                <th>{{ $t('Barcode') }}</th>
                <th>{{ $t('Status') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in defaultSubList" :key="item.key">
                <td>
                  <n-checkbox
                    v-model:checked="item.isChecked"
                    @update:checked="handleChecked(item)"
                  ></n-checkbox>
                </td>
                <td>{{ item.sB_POS }}</td>
                <td>
                  <n-input v-model:value="item.sB_BC" type="text" />
                </td>
                <td>
                  <n-select v-model:value="item.sB_ST" :options="subBoardStatusDropDownList" />
                </td>
              </tr>
            </tbody>
          </n-table>
          <n-button type="info" ghost @click="addNewDefaultSub"
            >{{ $t('Settings.AddSubBoard') }}
          </n-button>
          <n-button type="error" ghost @click="removeFromDefaultSubList">
            {{ $t('Settings.DeleteSubBoard') }}
          </n-button>
        </n-card>
      </n-gi>
    </n-grid>
  </n-spin>
  <n-button type="info" ghost @click="SaveButtonClickByAsync" v-if="isEnableSaveBtn">
    {{ $t('Save') }}
  </n-button>
</template>

<!-- Composition 組合式寫法-->

<script lang="ts">
import { computed, defineComponent, inject, ref, onMounted, watch } from 'vue'
import { getCookie } from 'typescript-cookie'

import { workOrderDropDownList } from '@/common/workOrderForm/workOrderDropDownList'
import { formData } from '@/common/workOrderForm/formData'
import { defaultSubListForm } from '@/common/workOrderForm/defaultSubListForm'

import { AccessControlList } from '@/stores/accessControlList'
import { renderLanguage } from '@/utils/Common'

export default defineComponent({
  setup() {
    const renewLang = inject('renewLang') as String
    watch(renewLang, async (newVal, oldVal) => {
      console.log(`renewLang newVal: ${newVal},oldVal:${oldVal}`)
      setFailedBoardDropDownList()
      setFlippedBoardDropDownList()
      setBarcodeTypeDropDownList()
      setSubBoardStatusDropDownList()
    })

    const store = AccessControlList()
    const storeAccessControlList = computed(() => store.storeAccessControlList)

    /** 是否啟用儲存按鈕 */
    const isEnableSaveBtn = ref(false)

    /** 取得存取權限 */
    function getAccessControl() {
      var roleName = getCookie('RoleName')
      if (roleName !== undefined) {
        store.storeAccessControlList.forEach((element) => {
          if (element.functionCode === 'WorkOrder' && element.functionActionName === 'Modify') {
            isEnableSaveBtn.value = true
          }
        })
      }
    }

    const {
      failedBoardDropDownList,
      setFailedBoardDropDownList,

      flippedBoardDropDownList,
      setFlippedBoardDropDownList,

      barcodeTypeDropDownList,
      setBarcodeTypeDropDownList,

      subBoardStatusDropDownList,
      setSubBoardStatusDropDownList
    } = workOrderDropDownList()

    const { workOrderFormData, getWorOrderList, updateWorkInfo, versionNumber, getVersionNumber } =
      formData()
    const {
      defaultSubList,
      loadDefaultSubList,
      addNewDefaultSub,
      updateAllDefaultSubBoardList,

      checkedDefaultSubList,
      removeFromDefaultSubList,
      handleChecked
    } = defaultSubListForm()

    const saveSuccess = renderLanguage('SaveSuccess')
    const saveFail = renderLanguage('SaveFail')

    /** 是否顯示載入中 */
    const isShowLoading = ref(false)

    /**
     * 完成載入
     */
    function finishLoading() {
      setTimeout(() => {
        isShowLoading.value = false
      }, 1000)
    }

    /**
     * 儲存按鈕事件使用await
     */
    async function SaveButtonClickByAsync(e: MouseEvent) {
      e.preventDefault()

      isShowLoading.value = true

      await updateWorkInfo()
        .then((first) => {
          console.log('first', first)
          return updateAllDefaultSubBoardList()
        })
        .then((second) => {
          console.log('second', second)
          window.$message.success(saveSuccess)
          finishLoading()
        })
        .catch((fail) => {
          console.log('fail', fail)
          window.$message.error(saveFail)
          finishLoading()
        })
    }

    onMounted(() => {
      setFailedBoardDropDownList()
      setFlippedBoardDropDownList()
      setBarcodeTypeDropDownList()
      setSubBoardStatusDropDownList()

      getWorOrderList()
      loadDefaultSubList()

      getVersionNumber()

      getAccessControl()
    })

    return {
      failedBoardDropDownList,
      setFailedBoardDropDownList,

      flippedBoardDropDownList,
      setFlippedBoardDropDownList,

      barcodeTypeDropDownList,
      setBarcodeTypeDropDownList,

      subBoardStatusDropDownList,
      setSubBoardStatusDropDownList,

      storeAccessControlList,
      isEnableSaveBtn,
      getAccessControl,

      saveSuccess,
      saveFail,

      workOrderFormData,
      getWorOrderList,
      updateWorkInfo,

      defaultSubList,
      loadDefaultSubList,
      addNewDefaultSub,
      updateAllDefaultSubBoardList,

      checkedDefaultSubList,
      removeFromDefaultSubList,
      handleChecked,

      isShowLoading,
      finishLoading,
      SaveButtonClickByAsync,

      versionNumber,
      getVersionNumber
    }
  }
})
</script>
