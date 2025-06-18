<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { defineProps } from 'vue'

// 定義組件的 props
const props = defineProps<{
  icon: string
  className?: string
}>()

// 計算 iconName 和 svgClass
const iconName = computed(() => `#icon-${props.icon}`)
const svgClass = computed(() => `svg-icon ${props.className || ''}`)
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;

  fill: currentColor;
  vertical-align: middle;
}
</style>
