# 财务卡片巡游 · Finance Card Parade

使用 Remotion 重建的 6 秒竖屏动效。合成 ID 为 `FinanceCardParade`，输出尺寸为 720 × 1280，帧率为 60 fps，共 360 帧。成片为静音。

## 预览与渲染

需要 Node.js 22 或更新版本。

```bash
npm ci
npm run studio
npm run typecheck
npm run render
```

Studio 会打开本地预览。渲染输出位于 `out/finance-card-parade.mp4`。首轮渲染时 Remotion 会在需要时下载 Chromium。已有 Chromium 时，可以通过 `npm run render -- --browser-executable=/path/to/chromium` 指定路径。

## 关键帧

| 时间（约） | 构图与动作 |
| --- | --- |
| 0.0–1.0 秒 | 多张白色财务卡片从画面边缘巡游，荧光短条穿过画面 |
| 1.0–2.1 秒 | 收入卡片放大，荧光标题由左向右显现 |
| 2.1–3.3 秒 | 收入卡片上移，发票卡片从底部旋入特写 |
| 3.3–4.4 秒 | 发票向左退出，交易卡片横向滑入，费用环形图从上方掠过 |
| 4.4–6.0 秒 | 卡片缩回四周，中央出现两行总结标题并停留 |

`src/cards.tsx` 定义卡片内容，`src/parade.tsx` 定义每张卡片的空间姿态、出入场时机及标题，`src/style.css` 定义深绿光晕、荧光黄绿标题、圆角白卡和无衬线排版。渲染所需的图表和背景由 CSS 绘制。
