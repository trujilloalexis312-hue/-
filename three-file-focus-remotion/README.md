# 三部分文件 · 聚焦展开

用 Remotion 重建的 14 秒动效，分辨率为 1920×1080，帧率为 60 fps。三个编号卡片依次聚焦，展开为口播视频、录屏素材和剪映草稿，最后回到三卡总览。

## 本地运行

需要 Node.js 22 和 npm。

```sh
npm ci
npm start
```

在 Remotion Studio 中打开 `ThreeFileFocus` 合成。渲染 MP4：

```sh
npm run render
```

输出文件为 `out/three-file-focus.mp4`。如果需要使用系统安装的 Chromium，可运行 `npm run render -- --browser-executable=/path/to/chromium`。使用 `npm run check` 检查 TypeScript。

## 时间线与素材

- 0–2.2 秒，三张编号卡片横向入场。
- 2.2–5.2 秒，聚焦口播视频。
- 5.2–8.2 秒，聚焦录屏素材。
- 8.2–12.1 秒，聚焦剪映草稿。
- 12.1–14 秒，拉回三张展开卡片的总览。

`src/ThreeFileFocus.tsx` 管理镜头、卡片和展开时间，`src/scene.css` 定义光弧、字形和倒影。三张静态缩略图从用户提供的参考视频中裁出。中文文字使用随项目提供的 Noto Serif CJK SC 字体子集，其许可见 [public/noto-serif-license.txt](public/noto-serif-license.txt)。

[原动效片段](https://motionface.cc/?recording=9924802d-2428-4472-89dd-b6e26aceefb0)
