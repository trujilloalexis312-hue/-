import type {CSSProperties} from 'react';

const teeth = 52;
const outline = Array.from({length: teeth * 4}, (_, index) => {
  const angle = index / (teeth * 4) * Math.PI * 2;
  const radius = index % 4 === 1 || index % 4 === 2 ? 113 : 106;
  return [120 + Math.cos(angle) * radius, 120 + Math.sin(angle) * radius].join(',');
}).join(' ');

export const Gear = ({id, size, angle, style}: {
  id: string;
  size: number;
  angle: number;
  style: CSSProperties;
}) => (
  <svg viewBox="0 0 240 240" width={size} height={size} style={{
    position: 'absolute',
    filter: 'drop-shadow(-8px 13px 9px #34415190)',
    ...style,
  }} aria-hidden="true">
    <defs>
      <linearGradient id={id + '-edge'} x1="10%" y1="10%" x2="85%" y2="90%">
        <stop stopColor="#f3f1ed"/>
        <stop offset=".35" stopColor="#a5a4a2"/>
        <stop offset=".71" stopColor="#68686b"/>
        <stop offset="1" stopColor="#d6d8d8"/>
      </linearGradient>
      <radialGradient id={id + '-face'} cx="70%" cy="38%" r="69%">
        <stop stopColor="#d8d8d6"/>
        <stop offset=".66" stopColor="#aaa9a6"/>
        <stop offset=".9" stopColor="#807f7d"/>
        <stop offset="1" stopColor="#c3c4c2"/>
      </radialGradient>
      <linearGradient id={id + '-bore'} x1="85%" y1="100%" x2="12%" y2="0%">
        <stop stopColor="#deddd9"/>
        <stop offset=".5" stopColor="#969590"/>
        <stop offset="1" stopColor="#353437"/>
      </linearGradient>
      <pattern id={id + '-brush'} width="3" height="3" patternUnits="userSpaceOnUse">
        <path d="M0 0h3M0 2h3" stroke="#fff" strokeOpacity=".09" strokeWidth=".6"/>
      </pattern>
    </defs>
    <polygon points={outline} transform={`translate(-3 5) rotate(${angle} 120 120)`} fill="#71706e"/>
    <polygon points={outline} transform={`rotate(${angle} 120 120)`} fill={`url(#${id}-edge)`}/>
    <circle cx="120" cy="120" r="91" fill={`url(#${id}-face)`} stroke="#484749" strokeWidth="4"/>
    <circle cx="120" cy="120" r="87" fill={`url(#${id}-brush)`} stroke="#edede880" strokeWidth="2"/>
    <circle cx="120" cy="120" r="42" fill={`url(#${id}-edge)`} stroke="#595957" strokeWidth="2"/>
    <circle cx="120" cy="120" r="35" fill={`url(#${id}-bore)`} stroke="#e5e4df" strokeWidth="2"/>
    <path d="M90 116a31 31 0 0 1 51-21" fill="none" stroke="#3e3d3d" strokeWidth="4" opacity=".7"/>
  </svg>
);
