<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

const route = useRoute()
const { isOpen } = useSidebar()

/** 等折叠动画基本结束再滚，避免和高度变化打架 */
const SCROLL_AFTER_COLLAPSE_MS = 340
/** 侧栏内缓动滚动时长 */
const SCROLL_DURATION_MS = 520
/** 目标分组与侧栏顶部的留白（略大一点，视觉上不那么“顶死”） */
const SCROLL_TOP_PADDING = 20

let scrollAnimFrame = 0
let scrollDelayTimer: ReturnType<typeof setTimeout> | undefined
/** 上一次用于判断「是否同一顶级栏目」的路径 */
let lastPathForSidebarCategory = ''

function topLevelSegment(path: string): string {
  const seg = path.split('/').filter(Boolean)[0] ?? ''
  try {
    return decodeURIComponent(seg)
  } catch {
    return seg
  }
}

function runSidebarFocus(opts?: { forceSidebarScroll?: boolean }) {
  if (typeof document === 'undefined') return

  if (scrollDelayTimer != null) {
    clearTimeout(scrollDelayTimer)
    scrollDelayTimer = undefined
  }
  cancelAnimationFrame(scrollAnimFrame)

  const path = route.path
  const prevTop = lastPathForSidebarCategory
    ? topLevelSegment(lastPathForSidebarCategory)
    : ''
  const nextTop = topLevelSegment(path)
  const sameTopCategory =
    lastPathForSidebarCategory !== '' && prevTop === nextTop

  nextTick(() => {
    requestAnimationFrame(() => {
      collapseInactiveTopSections()
      scrollDelayTimer = setTimeout(() => {
        scrollDelayTimer = undefined
        lastPathForSidebarCategory = path
        if (!sameTopCategory || opts?.forceSidebarScroll) {
          scrollActiveGroupToTop()
        }
      }, SCROLL_AFTER_COLLAPSE_MS)
    })
  })
}

/** 收起当前文档所属顶级分组以外的所有顶级分组（与顶部导航切换栏目时的预期一致） */
function collapseInactiveTopSections() {
  const aside = document.querySelector('.VPSidebar')
  const nav = aside?.querySelector('#VPSidebarNav')
  if (!nav) return

  const groups = nav.querySelectorAll(':scope > .group')
  groups.forEach((group) => {
    const root = group.querySelector(':scope > .VPSidebarItem.level-0')
    if (!root || root.classList.contains('has-active')) return
    if (!root.classList.contains('collapsed')) {
      const caret = root.querySelector<HTMLElement>(':scope > .item > .caret')
      caret?.click()
    }
  })
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/** 缓动滚动侧栏，比原生 smooth 更柔和、可控制时长 */
function animateAsideScroll(aside: HTMLElement, targetTop: number) {
  const clamped = Math.max(0, Math.min(targetTop, aside.scrollHeight - aside.clientHeight))
  const from = aside.scrollTop
  const delta = clamped - from
  if (Math.abs(delta) < 6) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    aside.scrollTop = clamped
    return
  }

  const t0 = performance.now()
  function step(now: number) {
    const t = Math.min(1, (now - t0) / SCROLL_DURATION_MS)
    const eased = easeInOutCubic(t)
    aside.scrollTop = from + delta * eased
    if (t < 1) {
      scrollAnimFrame = requestAnimationFrame(step)
    } else {
      scrollAnimFrame = 0
    }
  }
  scrollAnimFrame = requestAnimationFrame(step)
}

/** 把包含当前页的顶级分组滚到左侧栏可视区域靠上位置 */
function scrollActiveGroupToTop() {
  const aside = document.querySelector<HTMLElement>('.VPSidebar')
  if (!aside) return

  cancelAnimationFrame(scrollAnimFrame)

  const activeRoot = aside.querySelector<HTMLElement>(
    '.VPSidebarItem.level-0.has-active',
  )
  const group = activeRoot?.closest<HTMLElement>('.group')
  if (!group) return

  const asideRect = aside.getBoundingClientRect()
  const groupRect = group.getBoundingClientRect()
  const nextTop =
    aside.scrollTop + (groupRect.top - asideRect.top) - SCROLL_TOP_PADDING

  animateAsideScroll(aside, nextTop)
}

watch(() => route.path, runSidebarFocus, { flush: 'post', immediate: true })
watch(() => route.hash, runSidebarFocus, { flush: 'post' })

watch(isOpen, (open) => {
  if (open) runSidebarFocus({ forceSidebarScroll: true })
})

onMounted(() => {
  setTimeout(runSidebarFocus, 100)
})

onBeforeUnmount(() => {
  if (scrollDelayTimer != null) clearTimeout(scrollDelayTimer)
  cancelAnimationFrame(scrollAnimFrame)
})
</script>

<template>
  <!-- 无 UI：仅同步侧栏折叠与滚动 -->
</template>
