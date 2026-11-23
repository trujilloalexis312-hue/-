# 参考工程分析 · 文件夹展开

用 Remotion 重绘的桌面文件夹展开动效。合成 ID 为 `FolderExpansion`，分辨率 1920×1080，60 fps，共 589 帧，无音轨。

## 本地运行

需要 Node.js 20 或更新版本。

```bash
npm ci
npm start
```

## 渲染 MP4

```bash
npm run render
```

输出文件为 `out/folder-expansion.mp4`。Remotion 首次渲染时可能需要下载浏览器。也可通过 `npm run render -- --browser-executable=/usr/bin/chromium` 使用本机 Chromium。

## 关键帧观察

| 时间（秒） | 动作 |
| --- | --- |
| 0–1.1 | 深绿波纹背景保持静止，蓝色文件夹位于画面左侧，光标移到文件夹右下角 |
| 1.1–2.2 | Markdown 文件从文件夹上方滑出，落在同一水平线上 |
| 2.1–3.3 | JSON 文件沿更高的弧线飞出，落在 Markdown 文件右侧 |
| 3.1–4.7 | Python 文件沿下方弧线绕出，随后回到图标基线 |
| 4.0–5.9 | 整排图标左移，四个图标进入最终构图 |
| 5.9–9.82 | 保持最终画面 |

背景、图标和光标是独立的 SVG 图层，标签使用 Noto Serif SC 与斜体样式。文件轨迹和整排位移可在 `src/FolderExpansion.jsx` 中独立调整。
