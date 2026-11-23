# 长链路测试 · Remotion 复刻

《8月27日 (2)(1)-15》的可编辑动效复刻。画面为 1920 × 1080，30 fps，共 240 帧。

## 运行

使用 Node.js 20 或更新版本。

```bash
npm ci
npm run start
npm run render
```

渲染输出为 `out/long-link-test.mp4`。使用已有 Chromium 时，可运行 `npm run render -- --browser-executable=/path/to/chromium`。

## 画面与时间轴

| 时间 | 画面 |
| --- | --- |
| 0–1.47 秒 | 灰色纸纹上错位排入黑色宋体标题，暗红英文逐字显现，两侧手掌和银色齿轮升入画面。 |
| 1.47–2.03 秒 | 标题画面向上移出，成绩表自下方进入。 |
| 2.03–3.80 秒 | 逐项打出模型名称与分数，黄色底块扫过 42.0 和 35.0。 |
| 3.80–8.00 秒 | 保持成绩表，背景齿轮缓慢漂移，底部字幕继续切换。 |

`src/LongLinkTest.tsx` 包含标题、表格、字幕与时间轴。齿轮为参数化矢量图形，手掌是为本项目生成的透明素材。灰底、暗红字和黄色高亮取自参考画面的配色。纸纹和暗角由组件绘制。

## 可选本地音轨

默认输出为无旁白的视觉复刻。将有权使用的本地旁白放在 `public/local/narration.m4a`，然后运行：

```bash
npm run render -- --props='{"audioFile":"local/narration.m4a"}'
```

该目录在 Git 忽略列表中。
