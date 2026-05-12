---
layout: home

hero:
  name: 学习资料库
  text: 在线浏览本地 Markdown 笔记
  tagline: 使用 VitePress 构建，支持全文搜索与 Mermaid 图表
  actions:
    - theme: brand
      text: DuOneClass
      link: /DuOneClass/
    - theme: alt
      text: 大前端笔记
      link: /大前端笔记/

features:
  - title: 侧边栏自动索引
    details: 按文件夹生成目录，点开即可阅读，无需手工维护路由表。
  - title: 本地搜索
    details: 内置 Local Search，中文关键词可快速定位到具体页面。
  - title: Mermaid
    details: 课程里的流程图、时序图等 Mermaid 代码块会直接渲染。
---

## 使用说明

在本仓库根目录执行：

```bash
npm install
npm run dev
```

浏览器打开终端里提示的本地地址即可预览。构建静态站点：

```bash
npm run build
npm run preview
```

生成结果在 `dist` 目录，可部署到任意静态托管（GitHub Pages、Cloudflare Pages、VPS + Nginx 等）。

## 安全提示

若笔记中包含账号密码、密钥或内网信息，请勿将 `npm run build` 产物公开托管，或在 `.vitepress/config.ts` 的 `srcExclude` 中排除相应路径后再构建。
