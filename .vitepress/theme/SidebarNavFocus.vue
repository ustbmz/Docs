<script setup lang="ts">
import { useRoute } from 'vitepress'
import { useSidebar } from 'vitepress/theme'
import { nextTick, onBeforeUnmount, onMounted, watch } from 'vue'

const route = useRoute()
const { isOpen } = useSidebar()

/** 路由变化后稍晚再滚侧栏，等 DOM 稳定 */
const SCROLL_SIDEBAR_DELAY_MS = 80
/** 侧栏内缓动滚动时长 */
const SCROLL_DURATION_MS = 480
/**
 * 当前栏目分组对齐到侧栏可视区域时，分组顶边距侧栏顶部的目标比例（约 1/4 留白）
 */
const SIDEBAR_GROUP_TOP_RATIO = 0.25
/**
 * 分组顶边与目标位置的差距小于该比例时不再滚动，避免「点第一条也大幅滑动」
 */
const SIDEBAR_SCROLL_IDLE_BAND_RATIO = 0.07

let scrollAnimFrame = 0
let scrollDelayTimer: ReturnType<typeof setTimeout> | undefined
/** 上一次用于判断「是否同一顶级栏目」的路径 */
let lastPathForSidebarCategory = ''
/** 左侧栏内带链接的点击时间戳；短时间内触发的路由/ hash 更新一律视为侧栏导航 */
let lastSidebarLinkClickAt = 0
const SIDEBAR_LINK_CLICK_GRACE_MS = 180

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

  const withinSidebarLinkGrace =
    Date.now() - lastSidebarLinkClickAt < SIDEBAR_LINK_CLICK_GRACE_MS
  if (withinSidebarLinkGrace && !opts?.forceSidebarScroll) {
    lastPathForSidebarCategory = path
    return
  }
  if (opts?.forceSidebarScroll) {
    lastSidebarLinkClickAt = 0
  }

  const prevTop = lastPathForSidebarCategory
    ? topLevelSegment(lastPathForSidebarCategory)
    : ''
  const nextTop = topLevelSegment(path)
  const sameTopCategory =
    lastPathForSidebarCategory !== '' && prevTop === nextTop

  nextTick(() => {
    requestAnimationFrame(() => {
      scrollDelayTimer = setTimeout(() => {
        scrollDelayTimer = undefined
        lastPathForSidebarCategory = path
        if (!sameTopCategory || opts?.forceSidebarScroll) {
          scrollActiveGroupToTop()
        }
      }, SCROLL_SIDEBAR_DELAY_MS)
    })
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

/** 将当前栏目分组滚到侧栏内合适位置：顶部约留 1/4 视口，已接近则不再滚 */
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
  const vh = aside.clientHeight
  const reserveTop = vh * SIDEBAR_GROUP_TOP_RATIO
  const currentOffset = groupRect.top - asideRect.top
  const delta = currentOffset - reserveTop
  const idle = Math.max(20, vh * SIDEBAR_SCROLL_IDLE_BAND_RATIO)
  if (Math.abs(delta) < idle) return

  const nextTop = aside.scrollTop + delta
  animateAsideScroll(aside, nextTop)
}

watch(() => route.path, runSidebarFocus, { flush: 'post', immediate: true })
watch(() => route.hash, runSidebarFocus, { flush: 'post' })

watch(isOpen, (open) => {
  if (open) runSidebarFocus({ forceSidebarScroll: true })
})

function onDocumentClickCapture(e: MouseEvent) {
  if (e.button !== 0) return
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const el = e.target as HTMLElement | null
  const a = el?.closest('a')
  if (!a?.getAttribute('href')) return
  if (!a.closest('.VPSidebar')) return
  lastSidebarLinkClickAt = Date.now()
}

onMounted(() => {
  document.addEventListener('click', onDocumentClickCapture, true)
  setTimeout(runSidebarFocus, 100)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onDocumentClickCapture, true)
  if (scrollDelayTimer != null) clearTimeout(scrollDelayTimer)
  cancelAnimationFrame(scrollAnimFrame)
})
</script>

<template>
  <!-- 无 UI：仅同步侧栏滚动 -->
</template>
