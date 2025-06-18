// import VueI18n from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import zh from '../locales/zh.json'
import cn from '../locales/cn.json'

type MessageSchema = typeof en

const i18n = createI18n<[MessageSchema], 'zh-TW' | 'en-US' | 'zh-CN'>({
  legacy: false, // 要把 legacy 設為 false，才可以使用 Composition API
  locale: 'en-US',
  fallbackLocale: 'en-US',
  globalInjection: true,
  messages: {
    'zh-TW': zh,
    'en-US': en,
    'zh-CN': cn
  }
})

export default i18n
