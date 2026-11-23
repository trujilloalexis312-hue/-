import React, {type ReactNode} from 'react';
import {AbsoluteFill, Audio, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {cameraTransform} from './camera';

const cardWidth = 350;
const cardHeight = 210;
const edge = 9;
const cream = '#e9e6dc';

function progress(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.inOut(Easing.cubic),
  });
}

function Artwork({name}: {name: string}) {
  return (
    <Img
      src={staticFile(`cards/${name}.png`)}
      alt=""
      style={{width: '100%', height: '100%', display: 'block'}}
    />
  );
}

function Card({column, row, children, paper = false}: {
  column: number;
  row: number;
  children: ReactNode;
  paper?: boolean;
}) {
  return (
    <div style={{
      position: 'absolute', left: column * 440, top: row * 310,
      width: cardWidth, height: cardHeight, backgroundColor: paper ? cream : '#eae8e5',
      boxShadow: '0 2px 4px #0004',
    }}>
      <div style={{position: 'absolute', inset: paper ? 0 : edge, overflow: 'hidden'}}>
        {children}
      </div>
    </div>
  );
}

function Reveal({children, amount}: {children: ReactNode; amount: number}) {
  return <AbsoluteFill style={{clipPath: `inset(0 ${100 * (1 - amount)}% 0 0)`}}>{children}</AbsoluteFill>;
}

const letterStrips = [
  {left: 0, right: 34.5, start: 232, end: 246},
  {left: 34.5, right: 69, start: 251, end: 265},
  {left: 69, right: 100, start: 270, end: 284},
];

function Ugc({frame}: {frame: number}) {
  return (
    <AbsoluteFill style={{backgroundColor: '#090708'}}>
      {letterStrips.map(({left, right, start, end}) => (
        <AbsoluteFill key={start} style={{
          clipPath: `inset(0 ${100 - right}% 0 ${left}%)`,
          transform: `translateY(${100 * (1 - progress(frame, start, end))}%)`,
        }}>
          <Artwork name="ugc" />
        </AbsoluteFill>
      ))}
    </AbsoluteFill>
  );
}

const briefLines = [
  'We’re partnering with content creators who align with our brand values.',
  'Create engaging, authentic stories with strong communication.',
  'Bring your creativity and help bring our brand to life.',
  'Professional communication and timely deliverables.',
];

function Brief({frame, cursor = true}: {frame: number; cursor?: boolean}) {
  const scroll = 57 * progress(frame, 465, 530) + 42 * progress(frame, 530, 612);
  return (
    <AbsoluteFill style={{background: cream, color: '#161512', fontFamily: 'Arial, sans-serif'}}>
      <div style={{position: 'absolute', left: 21, right: 21, top: 28 - scroll}}>
        <div style={{fontSize: 7, color: '#9b7846', fontWeight: 700}}>▪ BRAND DEAL</div>
        <div style={{fontSize: 22, fontWeight: 800, lineHeight: 1, marginTop: 10}}>
          Lifestyle Brand<br />Collaboration
        </div>
        <div style={{fontSize: 6, color: '#807d74', marginTop: 9}}>
          ♧ Remote　 ◇ Sponsored Partnership　 • Flexible
        </div>
        <div style={{borderTop: '1px solid #d8d4c9', marginTop: 14, paddingTop: 9, fontSize: 7, fontWeight: 700}}>
          ABOUT THE OPPORTUNITY
        </div>
        {briefLines.map((line) => <p key={line} style={{fontSize: 8.5, margin: '12px 0'}}>{line}</p>)}
        <div style={{background: '#ff8c06', color: '#fff3da', borderRadius: 3, fontSize: 8, fontWeight: 700, padding: '11px 8px'}}>
          APPLY NOW →
        </div>
      </div>
      {cursor && (
        <div aria-hidden style={{
          position: 'absolute', left: 133 - 9 * progress(frame, 490, 558),
          top: 147 + 22 * progress(frame, 475, 535), width: 15, height: 23,
          background: '#141210', filter: 'drop-shadow(1px 1px 1px #fff)',
          clipPath: 'polygon(0 0, 100% 58%, 60% 61%, 85% 93%, 68% 100%, 44% 70%, 14% 92%)',
        }} />
      )}
    </AbsoluteFill>
  );
}

export function Gallery() {
  const frame = useCurrentFrame();
  const firstWipe = progress(frame, 207, 280);
  const lastWipe = progress(frame, 560, 653);
  const briefToLounge = Math.max(firstWipe * (1 - progress(frame, 280, 305)), progress(frame, 554, 594));

  return (
    <AbsoluteFill style={{
      overflow: 'hidden',
      background: 'linear-gradient(157deg, #1d1c19 0%, #181616 48%, #110f0e 100%)',
    }}>
      <Audio src={staticFile('soundtrack.m4a')} />
      <AbsoluteFill style={{transform: cameraTransform(frame), transformOrigin: '0 0'}}>
        <Card column={0} row={0}>
          <Artwork name="desk" />
          <Reveal amount={firstWipe * (1 - progress(frame, 285, 365))}><Ugc frame={frame} /></Reveal>
        </Card>
        <Card column={1} row={0}><Artwork name="halo" /></Card>
        <Card column={2} row={0}>
          <Ugc frame={frame} />
          {frame >= 231 && frame < 275 && (
            <AbsoluteFill style={{clipPath: `inset(0 0 0 ${56 + 44 * progress(frame, 239, 275)}%)`}}>
              <Artwork name="desk" />
            </AbsoluteFill>
          )}
        </Card>
        <Card column={0} row={1} paper>
          <Brief frame={frame} />
          <Reveal amount={briefToLounge}><Artwork name="lounge" /></Reveal>
        </Card>
        <Card column={1} row={1}><Artwork name="phone" /></Card>
        <Card column={2} row={1}>
          <Artwork name="lounge" />
          {frame >= 560 && frame < 653 && (
            <AbsoluteFill style={{clipPath: `inset(0 0 0 ${100 * lastWipe}%)`}}>
              <Brief frame={frame} cursor={false} />
            </AbsoluteFill>
          )}
        </Card>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
