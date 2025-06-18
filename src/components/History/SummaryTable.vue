<template>
  <n-card :title="title">
    <n-pagination
      v-model:page="paginationValue.page"
      :page-count="paginationValue.pageCount"
      :on-update:page="updatePagination"
    />
    <n-table :bordered="true" :single-line="false">
      <thead>
        <tr>
          <th></th>
          <th style="font-weight: bold">TimeStamp</th>
          <th style="font-weight: bold">Board ID</th>
        </tr>
      </thead>

      <tbody v-for="item in historyList" :key="item.timestamp">
        <tr>
          <th></th>
          <th>{{ item.timestamp }}</th>
          <th>{{ item.boardID }}</th>
        </tr>
        <tr>
          <th colspan="3">
            <n-collapse>
              <n-collapse-item title="" name="1">
                <div>
                  <n-descriptions label-placement="top" :column="3">
                    <n-descriptions-item label="Created By">
                      {{ item.createdBy }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Product Type ID">
                      {{ item.productTypeID }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Top Barcode">
                      {{ item.topBarcode }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Bottom Barcode">
                      {{ item.bottomBarcode }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Work Order ID">
                      {{ item.workOrderID }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Length"> {{ item.length }} </n-descriptions-item>
                    <n-descriptions-item label="Flipped"> {{ item.flipped }} </n-descriptions-item>
                    <n-descriptions-item label="Failed"> {{ item.failed }} </n-descriptions-item>
                    <n-descriptions-item label="Width"> {{ item.width }} </n-descriptions-item>
                    <n-descriptions-item label="Thickness">
                      {{ item.thickness }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Conveyor Speed">
                      {{ item.conveyorSpeed }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Top Clearance Height">
                      {{ item.topClearanceHeight }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Bottom Clearance Height">
                      {{ item.bottomClearanceHeight }}
                    </n-descriptions-item>
                    <n-descriptions-item label="Weight"> {{ item.weight }} </n-descriptions-item>
                    <n-descriptions-item label="Batch ID"> {{ item.batchID }} </n-descriptions-item>
                    <n-descriptions-item label="Route"> {{ item.route }} </n-descriptions-item>
                    <n-descriptions-item label="Action"> {{ item.action }} </n-descriptions-item>
                    <n-descriptions-item label="SubBoard">
                      <n-input
                        v-model:value="item.sub"
                        type="textarea"
                        readonly="true"
                        placeholder=""
                      />
                    </n-descriptions-item>
                  </n-descriptions>
                </div>
              </n-collapse-item>
            </n-collapse>
          </th>
        </tr>
      </tbody>
    </n-table>
    <n-pagination
      v-model:page="paginationValue.page"
      :page-count="paginationValue.pageCount"
      :on-update:page="updatePagination"
    />
  </n-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Pagination } from '@/types/Pagination'

export default defineComponent({
  props: {
    title: {
      type: String as PropType<String>,
      required: true
    },
    historyList: {
      type: Object as PropType<IHistory[]>,
      required: true
    },
    pagination: {
      type: Object as PropType<Pagination>,
      required: true
    }
  },

  computed: {
    paginationValue: {
      get() {
        return this.pagination
      },
      set(newValue: Pagination) {
        console.log('paginationValue newValue', newValue)
        this.$emit('update:pagination', newValue)
      }
    }
  },

  data() {
    return {
      show: false
    }
  },

  methods: {
    /**
     * 更新頁面參數
     * @param pageNumber
     */
    updatePagination(pageNumber: number) {
      const vm = this
      vm.paginationValue.page = pageNumber
      this.$emit('update:pagination', vm.paginationValue)
    }
  }
})
</script>
