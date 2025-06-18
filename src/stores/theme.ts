import { defineStore } from 'pinia'
import { ThemeModeEnum } from '@/Enum/enums'

export const Theme = defineStore('theme', {
  state: () => ({
    /**
     * 暫存佈景主題
     */
    storeTheme: ''
  }),

  actions: {
    /**
     * 設定暫存佈景主題
     * @param value
     */
    setStoreTheme(value: boolean) {
      this.storeTheme = value === true ? ThemeModeEnum.Light : ThemeModeEnum.Dark
    }
  }
})
