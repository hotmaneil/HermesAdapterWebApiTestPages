<script setup lang="ts">
import { NConfigProvider, darkTheme } from 'naive-ui'
import LayoutMenu from './components/LayoutMenu.vue'
import LayoutMenuComposition from './components/LayoutMenuComposition.vue'

import GlobalMessage from './GlobalMessage.vue'
import GlobalDialog from './GlobalDialog.vue'
import GlobalLoadingBar from './GlobalLoadingBar.vue'
import GlobalNotification from './GlobalNotification.vue'

import { ThemeModeEnum } from '@/Enum/enums'
import { computed } from 'vue'
import { Theme } from '@/stores/theme'

const lightThemeOverrides = {
  common: {
    primaryColor: '#FF7575'
  }
  // ...
}

const darkThemeOverrides = {
  common: {
    bodyColor: '#272727',
    cardColor: '#272727'
  }
}

const theme = computed(() => {
  return Theme().storeTheme === ThemeModeEnum.Dark ? darkTheme : null
})
</script>

<template>
  <n-message-provider>
    <GlobalMessage />
  </n-message-provider>

  <n-dialog-provider>
    <GlobalDialog />
  </n-dialog-provider>

  <n-loading-bar-provider>
    <GlobalLoadingBar />
  </n-loading-bar-provider>

  <n-notification-provider>
    <GlobalNotification />
  </n-notification-provider>

  <n-config-provider
    :theme="theme"
    :theme-overrides="theme === null ? lightThemeOverrides : darkThemeOverrides"
    style="height: 100%"
  >
    <!-- <LayoutMenu /> -->
    <LayoutMenuComposition />
  </n-config-provider>
</template>

<style></style>
