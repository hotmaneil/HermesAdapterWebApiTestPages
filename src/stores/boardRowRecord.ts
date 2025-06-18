import { defineStore } from 'pinia'
import type { BoardRowData } from '@/types/BoardRowData'

/**
 * 板Id紀錄-stores(pinia)
 */
export const BoardRowRecord = defineStore('boardRowRecord', {
  state: () => ({
    /**
     * 板Id紀錄List
     */
    storeBoardIdRecordList: [] as BoardRowData[]
  }),

  actions: {
    /**
     * 加暫存進板Id紀錄列表
     * @param value
     */
    addToBoardIdRecordList(value: BoardRowData) {
      this.storeBoardIdRecordList.push(value)
    },

    /**
     * 從暫存進板Id紀錄列表移除
     * @param value
     */
    removeFromBoardIdRecordList(value: BoardRowData) {
      const index = this.storeBoardIdRecordList.indexOf(value)
      if (index > -1) {
        this.storeBoardIdRecordList.splice(index, 1)
      }
    }
  }
})
