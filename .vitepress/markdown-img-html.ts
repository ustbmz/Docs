function isLocalMachinePath(url: string): boolean {
  const pathOnly = decodeURIComponent(url.trim()).split(/[?#]/)[0]
  if (/^\/Users\/|^\/home\/|^\/Volumes\//i.test(pathOnly)) return true
  if (/^[a-zA-Z]:[\\/]/.test(pathOnly)) return true
  return false
}

function skipLocalImageNote(_alt: string): string {
  return `\n\n*（图片为另一台电脑的本地绝对路径，无法在站点中显示；请改为仓库内相对路径或图床链接）*\n\n`
}

/** 将 Typora 等导出的行内 <img ...> 转为 Markdown 图片，便于在 markdown.html=false 时仍能显示图 */
export function imgHtmlToMarkdown(src: string): string {
  let out = src.replace(/<img\b[^>]*>/gi, (tag) => {
    const srcM = /\bsrc\s*=\s*["']([^"']+)["']/i.exec(tag)
    if (!srcM) return tag
    let url = srcM[1].trim()
    const altM = /\balt\s*=\s*["']([^"']*)["']/i.exec(tag)
    const alt = altM ? altM[1].replace(/]/g, '') : ''

    if (isLocalMachinePath(url)) return skipLocalImageNote(alt)

    // Windows 本机路径：尽量收成 ./assets/xxx
    if (/^[a-zA-Z]:[\\/]/.test(url) || (url.includes('\\') && !/^https?:\/\//i.test(url))) {
      const tail = url.match(/[/\\]assets[/\\]([^/\\]+\.(?:png|jpe?g|gif|webp|svg))$/i)
      if (tail) url = `./assets/${tail[1]}`
      else return skipLocalImageNote(alt)
    }

    if (!/^https?:\/\//i.test(url) && !url.startsWith('./') && !url.startsWith('../') && !url.startsWith('/'))
      return `\n\n*（图片地址无效：${alt || '无描述'}）*\n\n`

    return `![${alt}](${url})`
  })

  // 已是 Markdown 语法但指向本机绝对路径的 ![](...)
  out = out.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (full, alt, url: string) => {
    const u = url.trim()
    if (isLocalMachinePath(u)) return skipLocalImageNote(alt)
    return full
  })

  return out
}
