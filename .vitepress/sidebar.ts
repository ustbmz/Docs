import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const DOCS_ROOT = path.resolve(__dirname, '..')

const SKIP_NAMES = new Set([
  'node_modules',
  '.git',
  '.vitepress',
  '.cursor',
  'dist',
  '.DS_Store',
])

export type SidebarItem = {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
}

function mdRelToLink(relFromDocsRoot: string): string {
  const norm = relFromDocsRoot.replace(/\\/g, '/').replace(/\.md$/i, '')
  if (norm === 'index') return '/'
  if (norm.endsWith('/index')) {
    const base = norm.slice(0, -6)
    const segs = base.split('/').filter(Boolean).map(encodeURIComponent)
    return '/' + segs.join('/') + '/'
  }
  const segs = norm.split('/').filter(Boolean).map(encodeURIComponent)
  return '/' + segs.join('/')
}

function readSortedEntries(dir: string) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => !e.name.startsWith('.') && !SKIP_NAMES.has(e.name))
    .sort((a, b) =>
      a.isDirectory() === b.isDirectory()
        ? a.name.localeCompare(b.name, 'zh-CN')
        : a.isDirectory()
          ? -1
          : 1,
    )
}

function sortMdItems(items: SidebarItem[]): SidebarItem[] {
  return [...items].sort((a, b) => {
    const ai = a.text === '目录' ? 0 : 1
    const bi = b.text === '目录' ? 0 : 1
    if (ai !== bi) return ai - bi
    return (a.text ?? '').localeCompare(b.text ?? '', 'zh-CN')
  })
}

function buildTree(dirAbs: string, relDir: string): SidebarItem[] {
  const dirs: SidebarItem[] = []
  const files: SidebarItem[] = []
  for (const ent of readSortedEntries(dirAbs)) {
    const abs = path.join(dirAbs, ent.name)
    const rel = relDir ? `${relDir}/${ent.name}` : ent.name
    if (ent.isDirectory()) {
      const children = buildTree(abs, rel)
      if (children.length) {
        dirs.push({
          text: ent.name,
          items: children,
          collapsed: true,
        })
      }
    } else if (ent.isFile() && ent.name.toLowerCase().endsWith('.md')) {
      const text =
        ent.name.toLowerCase() === 'index.md'
          ? '目录'
          : ent.name.replace(/\.md$/i, '')
      files.push({
        text,
        link: mdRelToLink(rel),
      })
    }
  }
  return [...dirs, ...sortMdItems(files)]
}

function findFirstMdRel(dirAbs: string, relPrefix: string): string | null {
  for (const ent of readSortedEntries(dirAbs)) {
    const rel = `${relPrefix}/${ent.name}`.replace(/\\/g, '/')
    const sub = path.join(dirAbs, ent.name)
    if (ent.isDirectory()) {
      const inner = findFirstMdRel(sub, rel)
      if (inner) return inner
    } else if (ent.name.toLowerCase().endsWith('.md')) {
      return rel
    }
  }
  return null
}

/** 顶部导航入口：有 index 则进目录页，否则进该分类下第一篇笔记 */
export function entryLinkForTopFolder(folderName: string): string {
  const idx = path.join(DOCS_ROOT, folderName, 'index.md')
  if (fs.existsSync(idx)) {
    const segs = folderName.split('/').filter(Boolean).map(encodeURIComponent)
    return '/' + segs.join('/') + '/'
  }
  const abs = path.join(DOCS_ROOT, folderName)
  const first = findFirstMdRel(abs, folderName)
  return first ? mdRelToLink(first) : '/'
}

export function buildSidebar(): SidebarItem[] {
  const top: SidebarItem[] = []
  for (const ent of readSortedEntries(DOCS_ROOT)) {
    if (!ent.isDirectory()) continue
    const abs = path.join(DOCS_ROOT, ent.name)
    const children = buildTree(abs, ent.name)
    if (!children.length) continue
    top.push({
      text: ent.name,
      items: children,
      collapsed: false,
    })
  }
  return top
}
