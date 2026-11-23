import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import './scene.css';

const files = [
  {title: '口播视频', detail: '我的口播视频', count: '一段', caption: 'A-roll · MP4', thumbnail: 'a-roll.jpg', reveal: 2.82},
  {title: '录屏素材', detail: '一堆录屏素材', count: '一堆', caption: 'Screen recordings', thumbnail: 'screen-recordings.jpg', reveal: 5.87},
  {title: '剪映草稿', detail: '用作风格参考', count: '一个', caption: 'Style reference', thumbnail: 'style-reference.jpg', reveal: 8.88},
];

function transition(time: number, start: number, end: number) {
  return interpolate(time, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.45, 0, 0.22, 1),
  });
}

function FileCard({index, expanded}: {index: number; expanded: number}) {
  const file = files[index];
  return (
    <div className="card">
      {index === 1 && <div className="folder" style={{opacity: expanded}} />}
      <div className="large-number" style={{
        opacity: 1 - expanded,
        left: `${50 + 31 * expanded}%`,
        top: `${50 - 32 * expanded}%`,
        scale: String(1 - 0.57 * expanded),
      }}>{index + 1}</div>
      <div className="preview" style={{opacity: expanded, transform: `translateY(${12 * (1 - expanded)}px)`}}>
        <span className="count">{file.count}</span>
        <Img className="thumbnail" src={staticFile(file.thumbnail)} />
        <span className="caption">{file.caption}</span>
      </div>
      <div className="small-number" style={{opacity: expanded}}>{index + 1}</div>
    </div>
  );
}

export function ThreeFileFocus() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;
  const enter = transition(time, 0, 1.02);
  const first = transition(time, 2.22, 2.9);
  const second = transition(time, 5.22, 5.92);
  const third = transition(time, 8.18, 8.93);
  const overview = transition(time, 12.14, 12.98);
  const focus = first * (1 - overview);
  const camera = (-first + second + third) * (1 - overview);
  const spacing = 510 + 256 * focus;
  const titleOpacity = 1 - transition(time, 2.22, 2.62) + transition(time, 12.45, 13.06);
  const arcLeft = 960 - 440 * camera + 670 * (1 - enter);
  const arcTop = 75 - 292 * focus;
  const arcWidth = 2740 + 840 * focus;

  return (
    <AbsoluteFill className="scene">
      <style>{`@font-face{font-family:SceneSerif;src:url('${staticFile('noto-serif-sc.woff')}') format('woff');font-display:block}`}</style>
      <div className="arc" style={{left: arcLeft, top: arcTop, width: arcWidth, height: 2320 + 640 * focus}}>
        <div />
        <div />
        <div />
      </div>
      <div className="floor" />
      <div className="heading" style={{opacity: titleOpacity}}>
        <div className="eyebrow" style={{opacity: 1 - first}}>首先，我只准备了</div>
        <div>三部分文件</div>
      </div>
      {files.map((file, index) => {
        const distance = index - 1 - camera;
        const expanded = transition(time, file.reveal, file.reveal + 0.36);
        const blur = 8 * focus * Math.min(1, Math.abs(distance));
        const scale = 1 + 0.51 * focus + 0.59 * (1 - enter);
        const x = 960 + spacing * distance + 1450 * (1 - enter);
        const y = 535 - 60 * focus - 31 * overview;
        return (
          <div className="item" key={file.thumbnail} style={{left: x, top: y, transform: `translate(-50%, -50%) scale(${scale})`}}>
            <div style={{filter: `blur(${blur}px)`}}><FileCard index={index} expanded={expanded} /></div>
            <div className="labels" style={{filter: `blur(${blur * 0.15}px)`}}>
              <div className="title">{file.title}</div>
              <div className="detail" style={{opacity: expanded * (1 - 0.4 * Math.min(1, Math.abs(distance)))}}>{file.detail}</div>
            </div>
            <div className="reflection"><FileCard index={index} expanded={expanded} /></div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
