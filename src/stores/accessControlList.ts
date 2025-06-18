import { defineStore } from 'pinia'

export const AccessControlList = defineStore('accessControlList', {
  state: () => ({
    /**
     * 暫存存取權限List
     */
    storeAccessControlList: [] as IRoleFunction[]
  }),

  actions: {
    /**
     * 設定全域存取權限List
     * @param value
     */
    setGlobalAccessControlList(value: IRoleFunction[]) {
      this.storeAccessControlList = value
    },

    /**
     * 移除全域存取權限List
     */
    removeGlobalAccessControlList() {
      this.storeAccessControlList = []
    }
  }
})
