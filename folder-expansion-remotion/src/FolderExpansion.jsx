import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Wallpaper} from './Wallpaper';

const documents = [
  {
    name: '学习笔记.md', extension: 'md',
    times: [1.13, 1.29, 1.49, 1.75, 2.08, 2.26],
    x: [718, 757, 889, 1113, 1280, 1280],
    y: [443, 406, 358, 356, 445, 443],
  },
  {
    name: '结构参数索引.json', extension: 'json',
    times: [2.12, 2.32, 2.57, 2.80, 3.13, 3.35],
    x: [718, 765, 1030, 1370, 1711, 1712],
    y: [443, 406, 252, 208, 439, 443],
  },
  {
    name: '整理原生结构.py', extension: 'py',
    times: [3.14, 3.34, 3.59, 3.84, 4.12, 4.44, 4.69],
    x: [718, 778, 1128, 1595, 2010, 2144, 2144],
    y: [443, 538, 640, 678, 443, 443, 443],
  },
];

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};

function DocumentIcon({extension}) {
  return (
    <svg width="155" height="190" viewBox="0 0 155 190" aria-hidden="true">
      <defs>
        <linearGradient id={`paper-${extension}`} x2=".84" y2="1">
          <stop stopColor="#f7f8f4"/>
          <stop offset="1" stopColor="#d8e1ce"/>
        </linearGradient>
        <linearGradient id={`fold-${extension}`} x2="1" y2="1">
          <stop stopColor="#f3f5ec"/>
          <stop offset="1" stopColor="#d6e1ce"/>
        </linearGradient>
      </defs>
      <path fill={`url(#paper-${extension})`} stroke="#fff" strokeOpacity=".68"
        d="M12 .5h96l46.5 45.5v127q0 16.5-17 16.5H17q-16.5 0-16.5-17V17Q.5.5 12 .5Z"/>
      <path fill={`url(#fold-${extension})`} d="M108 1v32q0 13 13 13h33Z"/>
      <path stroke="#a4aea0" strokeWidth="5" strokeOpacity=".7" strokeLinecap="round"
        d="M32 66h88m-88 16h88m-88 16h51"/>
      <text x="77.5" y="157" textAnchor="middle" fill="#547a22"
        fontFamily="Georgia, serif" fontSize="44" fontStyle="italic">{extension}</text>
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="230" height="190" viewBox="0 0 230 190" aria-hidden="true">
      <defs>
        <linearGradient id="folder-back" x2=".12" y2="1">
          <stop stopColor="#3eb0d1"/>
          <stop offset=".42" stopColor="#1684ad"/>
        </linearGradient>
        <linearGradient id="folder-face" x2="0" y2="1">
          <stop stopColor="#82d1eb"/>
          <stop offset=".88" stopColor="#82d0eb"/>
          <stop offset=".97" stopColor="#72c3e2"/>
          <stop offset="1" stopColor="#93d8ef"/>
        </linearGradient>
      </defs>
      <path fill="url(#folder-back)"
        d="M0 20Q0 1 20 1h41q10 0 19 7l14 11h116q20 0 20 20v128H0Z"/>
      <rect x="0.5" y="40" width="229" height="149" rx="18"
        fill="url(#folder-face)" stroke="#4ba8ca" strokeOpacity=".65"/>
    </svg>
  );
}

function Document({document, time}) {
  const {times, x, y, extension, name} = document;
  if (time < times[0]) return null;
  const progress = interpolate(time, [times[0], times.at(-2)], [0, 1], clamp);
  const scale = interpolate(progress, [0, .16, 1], [.62, .82, 1], clamp);
  return (
    <div className="item" style={{
      left: interpolate(time, times, x, clamp),
      top: interpolate(time, times, y, clamp),
      transform: `translateX(-50%) scale(${scale / .917})`,
    }}>
      <DocumentIcon extension={extension} />
      <div className="label" style={{opacity: interpolate(progress, [.79, .95], [0, 1], clamp)}}>
        {name.slice(0, -(extension.length + 1))}<span className="label-extension">.{extension}</span>
      </div>
    </div>
  );
}

export function FolderExpansion() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const time = frame / fps;
  const move = interpolate(time, [3.98, 4.25, 4.75, 5.04, 5.93], [0, -56, -296, -386, -398], clamp);
  const settleScale = interpolate(move, [-398, 0], [.917, 1], clamp);
  const approach = interpolate(time, [.28, .71], [0, 1], {
    ...clamp, easing: Easing.inOut(Easing.cubic),
  });
  const click = interpolate(time, [.78, .86, .97], [1, .953, 1], clamp);
  return (
    <AbsoluteFill className="scene">
      <Wallpaper />
      <AbsoluteFill style={{transformOrigin: '723px 530px', transform: `translateX(${move}px) scale(${settleScale})`}}>
        {documents.map((document) => <Document key={document.extension} document={document} time={time}/>)}
        <div className="item" style={{left: 723, top: 444, transform: `translateX(-50%) scale(${click / .917})`}}>
          <FolderIcon />
          <div className="label">参考工程分析</div>
        </div>
        <svg className="cursor" width="49" height="65" viewBox="0 0 45 60"
          style={{left: 890 - 80 * approach, top: 672 - 67 * approach}} aria-hidden="true">
          <path d="M2 2v46l12-12 9 20 9-4-10-19 19-1Z"
            fill="#090909" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round"/>
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
