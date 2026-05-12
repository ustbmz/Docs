import type { EnhanceAppContext } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import './custom.css'

/** 与默认顶栏高度大致对齐，避免 scrollIntoView 时标题贴顶被挡 */
const HASH_SCROLL_TOP_OFFSET = 64

type RouterLike = {
  options?: {
    scrollBehavior?: (
      to: { hash?: string; path?: string },
      from: { path?: string },
      savedPosition: unknown,
    ) => unknown
  }
}

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ router }: EnhanceAppContext) {
    const r = router as RouterLike
    if (!r.options) return

    const previous = r.options.scrollBehavior
    r.options.scrollBehavior = (to, from, savedPosition) => {
      if (savedPosition) return savedPosition
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
          top: HASH_SCROLL_TOP_OFFSET,
        }
      }
      if (typeof previous === 'function') {
        return previous(to, from, savedPosition)
      }
      return { top: 0, left: 0 }
    }
  },
}
