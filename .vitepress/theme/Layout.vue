<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import SidebarNavFocus from './SidebarNavFocus.vue'
import SidebarOutline from './SidebarOutline.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #sidebar-nav-after>
      <SidebarOutline />
    </template>
  </DefaultTheme.Layout>
  <SidebarNavFocus />
</template>
