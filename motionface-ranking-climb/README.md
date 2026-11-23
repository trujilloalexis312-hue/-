# 排名攀升动效

一个可编辑的 Remotion 竖屏动效，画面规格为 1080 × 1920、30 fps、8 秒（240 帧）。动画通过组件绘制榜单、数据、聚光、阴影和绿色高亮，可独立渲染。参考片段的音轨为静音，复刻默认导出纯视频。

## 预览和导出

需要 Node.js 20 或更新版本。在项目目录运行：

```bash
npm ci
npm run start
```

在 Remotion Studio 中选择 `RankingClimb`。在项目目录另开终端，运行 `npm run render` 导出 `out/ranking-climb.mp4`。如果要使用已安装的 Chromium，运行 `npm run render -- --browser-executable=/path/to/chromium`。

## 编辑动效

打开 `src/RankingClimb.tsx`，修改 `entries` 和 `featured` 可替换成绩表内容。组件中的 `climb` 控制高亮行的位置，`line` 控制绿色分数下划线，`scale`、`angle` 和焦点坐标控制镜头。

- 0–1.3 秒，倾斜的白色成绩表从上方滑入，镜头对焦薄荷绿色高亮行。
- 1.3–2.6 秒，高亮行快速越过其他行，进入第 2 名，绿色下划线延长。
- 2.6–5.8 秒，镜头保持特写，行位置略微上冲后回落。
- 5.8–8.0 秒，镜头拉远并转正，露出完整榜单。

参考画面使用暖灰背景、深灰文字、等宽模型机构名和细分隔线。复刻沿用这些构图和节奏，表头与机构标记采用简化设计。
