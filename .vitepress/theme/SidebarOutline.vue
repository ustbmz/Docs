<script setup lang="ts">
import { onContentUpdated, useData } from 'vitepress'
import { shallowRef } from 'vue'
import { useSidebar } from 'vitepress/theme'
import {
  getHeaders,
  resolveTitle,
  type MenuItem,
} from 'vitepress/dist/client/theme-default/composables/outline.js'
import VPDocOutlineItem from 'vitepress/dist/client/theme-default/components/VPDocOutlineItem.vue'

const { frontmatter, theme } = useData()
const { close } = useSidebar()

const headers = shallowRef<MenuItem[]>([])

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

function onNavClick(e: MouseEvent) {
  const a = (e.target as HTMLElement).closest('a')
  if (!a?.href?.includes('#')) return
  close()
}
</script>

<template>
  <div
    v-if="headers.length"
    class="sidebar-outline"
    @click.capture="onNavClick"
  >
    <div class="sidebar-outline-title">{{ resolveTitle(theme) }}</div>
    <nav class="sidebar-outline-nav" aria-label="本页目录">
      <VPDocOutlineItem :headers="headers" :root="true" />
    </nav>
  </div>
</template>

<style scoped>
.sidebar-outline {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--vp-c-divider);
}

.sidebar-outline-title {
  margin-bottom: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--vp-c-text-3);
}

.sidebar-outline-nav :deep(.outline-link) {
  font-size: 13px;
  line-height: 28px;
}
</style>
