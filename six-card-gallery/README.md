# 六卡片 · 连续运镜空间画廊

一个 1920×1080、60 fps、776 帧（约 12.93 秒）的 Remotion 动画。

## 运行

需要 Node.js 20 或更新版本及 npm。

```sh
npm ci
npm start
```

在 Remotion Studio 中选择 `SixCardGallery`。渲染为 MP4：

```sh
npm run render
```

输出路径为 `out/six-card-gallery.mp4`。如需使用已安装的 Chromium，可传入 `--browser-executable` 及其路径。

## 实现

六张卡片固定在两行三列的画廊中。共享的仿射变换驱动画廊从轻倾斜的远景推近，向右移过上排，再回到左下方，并沿下排向右收尾。`src/camera.json` 保存每三帧测得的镜头位置、缩放与旋转，渲染时做平滑和插值。

卡面保留了参考的米白细边与暖橙色插画。U.G.C. 橙色粗字按三组从下方入场，招募卡用 Arial 排版并独立滚动，横向遮罩在卡片间交换局部内容。插画是从参考片段矫正后的静帧纹理，声音来自参考音轨。完整参考视频未随项目分发。
