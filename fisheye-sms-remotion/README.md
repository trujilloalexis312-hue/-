# 鱼眼短信动效

用 Remotion 重建 2 秒的深色短信动效。画布为 1080 × 1102，30 fps，共 60 帧。合成 ID 为 `FisheyeSMS`，输出为静音视频。

```sh
npm ci
npm start
npm run render
```

`npm start` 打开 Remotion Studio，`npm run render` 输出 `out/fisheye-sms.mp4`。中文字体子集随项目提供，渲染时无需访问远程素材。

`src/index.jsx` 从文字和几何图形绘制界面，将界面按列投影以形成鱼眼畸变，再叠加细条纹和暗角。镜头在前半段平滑倾斜，后半段逐步揭示“浙大”二字下方的黄色高亮。视频全程为单镜头。
