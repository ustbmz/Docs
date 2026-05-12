import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import fs from 'node:fs'
import { buildSidebar, DOCS_ROOT, entryLinkForTopFolder } from './sidebar'
import { imgHtmlToMarkdown } from './markdown-img-html'

function topNav() {
  const skip = new Set([
    'node_modules',
    '.git',
    '.vitepress',
    '.cursor',
    'dist',
    '.DS_Store',
  ])
  return fs
    .readdirSync(DOCS_ROOT, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.') && !skip.has(e.name))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'))
    .map((e) => ({ text: e.name, link: entryLinkForTopFolder(e.name) }))
}

export default withMermaid(
  defineConfig({
    title: '学习资料库',
    description: '个人笔记与教程在线浏览',
    lang: 'zh-CN',
    srcExclude: ['README.md', '**/node_modules/**', '**/dist/**'],
    ignoreDeadLinks: [/^https?:\/\/localhost/],
    vite: {
      server: {
        watch: {
          ignored: ['**/node_modules/**', '**/.git/**'],
        },
      },
    },
    themeConfig: {
      nav: [{ text: '首页', link: '/' }, ...topNav()],
      sidebar: buildSidebar(),
      search: {
        provider: 'local',
        options: {
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              noResultsText: '无法找到相关结果',
              resetButtonTitle: '清除查询条件',
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
              },
            },
          },
        },
      },
      outline: { label: '页面目录', level: [2, 3] },
      docFooter: {
        prev: '上一页',
        next: '下一页',
      },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '菜单',
      darkModeSwitchLabel: '主题',
      lightModeSwitchTitle: '切换到浅色模式',
      darkModeSwitchTitle: '切换到深色模式',
    },
    markdown: {
      lineNumbers: true,
      // 关闭 HTML 可避免笔记里的 <foo> 被当成 Vue 标签；<img> 在解析前转为 ![](url)
      html: false,
      config(md) {
        md.core.ruler.before('normalize', 'img-html-to-md', (state) => {
          state.src = imgHtmlToMarkdown(state.src)
        })
      },
    },
    mermaid: {
      theme: 'default',
    },
    mermaidPlugin: {
      class: 'mermaid',
    },
  }),
)
