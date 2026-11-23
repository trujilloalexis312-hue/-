import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  AbsoluteFill, Composition, Easing, interpolate, registerRoot,
  staticFile, useDelayRender, useCurrentFrame,
} from 'remotion';

const width = 1080;
const height = 1102;
const overscan = 160;
const fontFamily = 'Message, "Noto Sans CJK SC", sans-serif';

function ellipse(ctx, x, y, rx, ry, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
  ctx.fill();
}

function label(ctx, value, x, y, size, color, align = 'left') {
  ctx.font = `${size}px ${fontFamily}`;
  ctx.textAlign = align;
  ctx.fillStyle = color;
  ctx.fillText(value, x, y);
}

function drawHeader(ctx, pose) {
  const center = 587 + 51 * pose;
  ctx.fillStyle = '#141414';
  ctx.fillRect(-overscan, 0, width + overscan * 2, 272);
  ellipse(ctx, center, 115 + 22 * pose, 99 - 9 * pose, 68, '#858992');
  ellipse(ctx, center, 96 + 22 * pose, 33 - 3 * pose, 25, '#d5d7d9');
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(center, 115 + 22 * pose, 98 - 9 * pose, 67, 0, 0, 2 * Math.PI);
  ctx.clip();
  ellipse(ctx, center, 164 + 22 * pose, 62 - 4 * pose, 33, '#d5d7d9');
  ctx.restore();
  label(ctx, '10688037970779', center - 5, 231, 47, '#dfdfdf', 'center');
  label(ctx, '›', center + 212, 231, 37, '#565656');
  ellipse(ctx, -12 + 58 * pose, 148, 38, 23, '#0976cc');
  label(ctx, '52', -13 + 58 * pose, 157, 27, '#d4efff', 'center');

  const statusX = 922 - 39 * pose;
  ctx.fillStyle = '#dedede';
  for (let bar = 0; bar < 4; bar++) {
    ctx.fillRect(statusX + bar * 11, 24 - bar * 4 + 14 * pose, 6, 7 + bar * 4);
  }
  ctx.strokeStyle = '#d8d8d8';
  ctx.lineWidth = 4;
  for (const radius of [9, 16, 23]) {
    ctx.beginPath();
    ctx.arc(statusX + 81, 30 + 14 * pose, radius, Math.PI * 1.19, Math.PI * 1.81);
    ctx.stroke();
  }
  ctx.fillStyle = '#c5c5c5';
  ctx.beginPath();
  ctx.roundRect(statusX + 120, 8 + 14 * pose, 54, 28, 8);
  ctx.fill();
  label(ctx, '34', statusX + 147, 29 + 14 * pose, 20, '#191919', 'center');
}

function drawMessage(ctx, pose, reveal) {
  const left = -159 + 43 * pose;
  const right = 1102 - 51 * pose;
  ctx.fillStyle = '#282828';
  ctx.beginPath();
  ctx.roundRect(-145, 500, right + 145, 449, 52);
  ctx.fill();

  const lines = [
    '【浙江大学】欢迎您在2026年09月04',
    '~2026年09月04日访问紫金港校区。',
    '支付宝“浙大通”小程序通行码或本人',
    '身份证进入校园。',
  ];
  const size = 71;
  const scale = .99;
  ctx.save();
  ctx.translate(left, 0);
  ctx.scale(scale, 1);
  ctx.font = `${size}px ${fontFamily}`;
  const highlightStart = ctx.measureText('支付宝“').width;
  const highlightWidth = ctx.measureText('浙大').width;
  ctx.fillStyle = '#d7b708';
  ctx.fillRect(highlightStart, 717, highlightWidth * reveal, 102);

  lines.forEach((line, index) => {
    const y = 581 + 94 * index;
    label(ctx, line, 0, y, size, '#ededed');
    if (index < 2) {
      const prefix = index === 0 ? '【浙江大学】欢迎您在' : '';
      const date = index === 0 ? '2026年09月04' : '~2026年09月04日';
      ctx.fillRect(ctx.measureText(prefix).width, y + 5, ctx.measureText(date).width, 2);
    }
  });
  ctx.restore();
}

// Project the flat UI through a column-wise barrel warp. The top and message
// bands bend independently around the optical center as the camera rolls.
function project(ctx, source, pose, band) {
  const {top, bottom, shift, bow, tilt, edgeScale, skew = 0, fillTop} = band;
  for (let x = 0; x < width; x += 2) {
    const u = (x + 1 - (540 + 28 * pose)) / 540;
    const stretch = 1 - edgeScale * u * u + skew * u;
    const sourceX = x + overscan + 55 * u * u * u;
    const y = top + shift + bow * u * u + tilt * u;
    if (fillTop && y > 0) {
      ctx.fillStyle = fillTop;
      ctx.fillRect(x, 0, 2, y + 1);
    }
    ctx.drawImage(source, sourceX, top, 2 + .6 * u * u, bottom - top,
      x, y, 2, (bottom - top) * stretch);
  }
}

function drawTexture(ctx, frame) {
  for (let y = 0; y < 900; y += 4) {
    const beat = .035 + .027 * Math.sin(y * .33 + frame * .14);
    ctx.fillStyle = `rgba(0,0,0,${beat})`;
    ctx.fillRect(0, y, width, 2);
    if (y % 8 === 0) {
      ctx.fillStyle = 'rgba(193,202,226,0.025)';
      ctx.fillRect(0, y + 2, width, 1);
    }
  }
  const vignette = ctx.createRadialGradient(540, 359, 115, 540, 446, 780);
  vignette.addColorStop(0, 'rgba(0,0,0,0)');
  vignette.addColorStop(.58, 'rgba(0,0,0,.10)');
  vignette.addColorStop(1, 'rgba(0,0,0,.62)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);
}

function FisheyeSMS() {
  const frame = useCurrentFrame();
  const canvas = useRef(null);
  const plate = useRef(null);
  const {delayRender, continueRender, cancelRender} = useDelayRender();
  const [handle] = useState(() => delayRender('Loading the message typeface'));
  const [fontReady, setFontReady] = useState(false);

  useEffect(() => {
    const font = new FontFace('Message', `url(${staticFile('message.woff')})`);
    font.load().then((loaded) => {
      document.fonts.add(loaded);
      setFontReady(true);
    }).catch(cancelRender);
  }, [cancelRender]);

  useLayoutEffect(() => {
    if (!fontReady) return;
    if (!plate.current) {
      plate.current = document.createElement('canvas');
      plate.current.width = width + 2 * overscan;
      plate.current.height = height;
    }
    const ease = Easing.bezier(.23, .72, .35, 1);
    const pose = interpolate(frame, [8, 25], [0, 1], {
      easing: ease, extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    const reveal = interpolate(frame, [29, 48], [0, 1], {
      easing: Easing.bezier(.35, .1, .3, 1),
      extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
    });
    const source = plate.current.getContext('2d');
    source.setTransform(1, 0, 0, 1, overscan, 0);
    source.clearRect(-overscan, 0, plate.current.width, height);
    drawHeader(source, pose);
    label(source, '信息・短信', 586 + 57 * pose, 328, 45, '#999', 'center');
    label(source, '前天 21:07', 586 + 57 * pose, 383, 45, '#999', 'center');
    drawMessage(source, pose, reveal);

    const ctx = canvas.current.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    project(ctx, plate.current, pose, {
      top: 0, bottom: 274, shift: -45 + 5 * pose,
      bow: 97, tilt: 7 + 63 * pose, edgeScale: .055, fillTop: '#141414',
    });
    project(ctx, plate.current, pose, {
      top: 274, bottom: 424, shift: 0 - 13 * pose,
      bow: 30, tilt: 20 + 57 * pose, edgeScale: .18,
    });
    project(ctx, plate.current, pose, {
      top: 490, bottom: 952, shift: -46 - 77 * pose,
      bow: 36 + 19 * pose, tilt: -6 + 30 * pose, edgeScale: .28 - .15 * pose, skew: -.17 * pose,
    });
    drawTexture(ctx, frame);
    continueRender(handle);
  }, [continueRender, fontReady, frame, handle]);

  return <AbsoluteFill style={{backgroundColor: '#000'}}>
    <canvas ref={canvas} width={width} height={height} />
  </AbsoluteFill>;
}

function Root() {
  return <Composition id="FisheyeSMS" component={FisheyeSMS}
    width={width} height={height} fps={30} durationInFrames={60} />;
}

registerRoot(Root);
