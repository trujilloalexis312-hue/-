import type {CSSProperties, ReactNode} from 'react';
import {
  AbsoluteFill, Audio, Composition, Easing, Img, Sequence,
  interpolate, staticFile, useCurrentFrame,
} from 'remotion';

const width = 720;
const height = 1280;
const fps = 30;
const duration = 361;
const ease = Easing.bezier(0.22, 0.72, 0.24, 1);
const rise = (frame: number, start: number, end: number) =>
  interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease,
  });

const ink = '#17231f';
const green = '#006442';
const serif = '"Georgia", "Liberation Serif", serif';
const sans = '"Arial", "Liberation Sans", sans-serif';
const drop = 'drop-shadow(18px 30px 25px #17251e73)';

function Art({name, style}: {name: string; style: CSSProperties}) {
  return <Img src={staticFile(name + '.webp')} style={{position: 'absolute', ...style}} />;
}

function Caption({x, y, size, appear = 0, classic = false, children}: {
  x: number; y: number; size: number; appear?: number; classic?: boolean; children: ReactNode;
}) {
  const frame = useCurrentFrame();
  const progress = rise(frame, appear, appear + 10);
  return <div style={{
    position: 'absolute', left: x, top: y, whiteSpace: 'nowrap',
    opacity: progress, transform: `translateY(${14 * (1 - progress)}px)`,
    filter: `blur(${4 * (1 - progress)}px)`, fontSize: size, lineHeight: 1,
    color: ink, fontFamily: classic ? serif : sans, fontStyle: 'italic',
    fontWeight: classic ? 600 : 400,
  }}>{children}</div>;
}

function Ribbon({ascending = false, start = 0}: {ascending?: boolean; start?: number}) {
  const frame = useCurrentFrame();
  const reveal = rise(frame, start, start + 17);
  return <svg viewBox="0 0 720 1280" width={720} height={1280} style={{
    position: 'absolute', clipPath: `inset(0 ${100 * (1 - reveal)}% 0 0)`,
  }}>
    <path fill={green} d={ascending
      ? 'M-90 1000 C175 943 310 685 810 463 L810 520 C380 738 180 1010 -90 1060 Z'
      : 'M-55 330 C150 615 384 537 670 745 Q711 804 663 798 C410 599 147 696 -55 458 Z'} />
  </svg>;
}

type Corner = 'topRight' | 'topLeft' | 'bottomLeft' | 'bottomRight';

function Rays({corner, angle = 0}: {corner: Corner; angle?: number}) {
  const top = corner.startsWith('top');
  const left = corner.endsWith('Left');
  return <svg width={280} height={280} viewBox="0 0 280 280" style={{
    position: 'absolute', top: top ? -22 : undefined, bottom: top ? undefined : -22,
    left: left ? -22 : undefined, right: left ? undefined : -22,
    transform: `scale(${left ? -1 : 1}, ${top ? 1 : -1}) rotate(${angle}deg)`,
    filter: 'blur(2.5px) drop-shadow(8px 12px 9px #12181640)',
  }}>
    <path fill="#141817" d="M280 0 C215 4 116 14 64 37 C30 52 32 91 69 90 C126 88 221 43 280 0 M280 0 C245 69 213 186 214 233 C215 273 252 281 263 240 C276 182 279 76 280 0 M280 0 C243 29 148 98 108 153 C89 180 112 204 140 184 C199 138 260 63 280 0" />
  </svg>;
}

function Opening() {
  const frame = useCurrentFrame();
  const inProgress = rise(frame, 2, 26);
  const out = rise(frame, 53, 62);
  const cups = rise(frame, 18, 34);
  return <AbsoluteFill style={{opacity: 1 - out, transform: `scale(${1 + out * .08})`}}>
    <Ribbon start={18} />
    <div style={{position: 'absolute', left: 65, top: 43, opacity: cups,
      color: ink, font: 'italic 29px Georgia', transform: 'rotate(-17deg)'}}>
      Brand Studio
    </div>
    <Art name="cup" style={{width: 118, right: -15, top: -54, opacity: cups,
      transform: 'rotate(46deg)', filter: drop}} />
    <Art name="cup" style={{width: 122, left: -49, bottom: -30, opacity: cups,
      transform: 'rotate(67deg)', filter: drop}} />
    <Art name="cup" style={{
      width: 181, left: 270 - 343 * (1 - inProgress), top: 477 + 174 * (1 - inProgress),
      opacity: inProgress, transform: `rotate(${-5 - 10 * (1 - inProgress)}deg)`, filter: drop,
    }} />
    <Caption x={385} y={324} size={43} appear={8}>This is how</Caption>
    <Caption x={262} y={366} size={79} appear={13} classic>Starbucks</Caption>
    <Caption x={166} y={814} size={43} appear={24}>built a</Caption>
    <Caption x={223} y={857} size={80} appear={29} classic>lifestyle</Caption>
  </AbsoluteFill>;
}

function Drinks() {
  const frame = useCurrentFrame();
  const enter = rise(frame, 0, 10);
  const exit = rise(frame, 33, 40);
  return <AbsoluteFill style={{opacity: enter * (1 - exit)}}>
    <Rays corner="topRight" angle={8 * (1 - enter)} />
    <Rays corner="bottomLeft" angle={-18} />
    <svg width={430} height={430} viewBox="0 0 430 430"
      style={{position: 'absolute', top: 433, left: 145, opacity: rise(frame, 5, 14)}}>
      <circle cx="215" cy="215" r="201" fill="none" stroke={ink}
        strokeWidth="2.8" strokeDasharray="6 7" />
    </svg>
    <Art name="drinks" style={{width: 282, left: 218, top: 474,
      transform: `translateY(${30 * (1 - enter)}px) scale(${.78 + .22 * enter})`, filter: drop}} />
    <Caption x={257} y={389} size={44} appear={3}>More than</Caption>
    <Caption x={222} y={855} size={68} appear={9} classic>just coffee</Caption>
  </AbsoluteFill>;
}

const cards = {
  store: {title: 'They focused on experience', x: 129, y: 363, w: 474, h: 717, label: 43},
  morning: {title: 'Morning routines', x: 96, y: 255, w: 528, h: 774, label: 61},
  cafe: {title: 'cozy cafés', x: 96, y: 255, w: 528, h: 774, label: 61},
  work: {title: 'work sessions', x: 96, y: 252, w: 528, h: 777, label: 61},
};

function Experience({kind, length}: {kind: keyof typeof cards; length: number}) {
  const frame = useCurrentFrame();
  const {title, x, y, w, h, label} = cards[kind];
  const isStore = kind === 'store';
  const enter = rise(frame, 0, isStore ? 17 : 9);
  const exit = rise(frame, length - (isStore ? 15 : 5), length);
  const moving = Math.min(9, Math.max(0, Math.floor((frame - 8) / 2.12)));
  const flash = kind === 'cafe' ? .85 * (1 - rise(frame, 0, 7)) : 0;
  return <AbsoluteFill style={{opacity: Math.min(1, enter * 2) * (1 - exit)}}>
    <Ribbon ascending={isStore} />
    <Rays corner={isStore ? 'topLeft' : 'topRight'} angle={isStore ? -10 : 0} />
    {isStore && <Rays corner="bottomRight" angle={-20} />}
    <AbsoluteFill style={{
      transform: `translateY(${(isStore || kind === 'morning' ? 600 * (1 - enter) : 35 * (1 - enter)) - (isStore ? 650 * exit : 20 * exit)}px)`,
    }}>
      <div style={{position: 'absolute', top: y - label - 16, width: '100%', textAlign: 'center',
        font: `italic ${label}px ${sans}`, color: ink, opacity: rise(frame, 4, 13)}}>{title}</div>
      <div style={{position: 'absolute', left: x, top: y, width: w, height: h,
        borderRadius: 30, boxShadow: '22px 30px 42px #26352d73', overflow: 'hidden'}}>
        <Art name={kind === 'morning' && frame >= 8 ? `morning-${moving}` : kind}
          style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        {flash > 0 && <AbsoluteFill style={{background: '#fff0c5', opacity: flash}} />}
      </div>
    </AbsoluteFill>
  </AbsoluteFill>;
}

function FinalCup({close = false}: {close?: boolean}) {
  const frame = useCurrentFrame();
  const enter = rise(frame, 0, close ? 9 : 13);
  const exit = close ? 0 : rise(frame, 28, 37);
  return <AbsoluteFill style={{opacity: enter * (1 - exit)}}>
    <Rays corner="topRight" angle={close ? 7 : -15} />
    {close ? <>
      <Art name="cup" style={{width: 532, left: -271 - 110 * (1 - enter), top: 186,
        transform: 'rotate(5deg)', filter: drop}} />
      <Caption x={322} y={384} size={81} appear={0}>It was</Caption>
      <Caption x={380} y={445} size={92} appear={5}>about</Caption>
      <Caption x={360} y={552} size={49} appear={11}>the</Caption>
      <Caption x={258} y={574} size={132} appear={16} classic>feeling</Caption>
    </> : <>
      <Art name="cup" style={{width: 199, left: 259, top: 458, filter: drop,
        transform: `scale(${.66 + .34 * enter + .22 * exit})`}} />
      <Caption x={260} y={340} size={52} appear={4}>It wasn’t</Caption>
      <Caption x={233} y={857} size={52} appear={13}>about</Caption>
      <Caption x={269} y={909} size={88} appear={18} classic>coffee</Caption>
    </>}
  </AbsoluteFill>;
}

function CoffeeStory() {
  const frame = useCurrentFrame();
  const close = rise(frame, 295, 309);
  const middle = rise(frame, 97, 116) * (1 - rise(frame, 255, 273));
  return <AbsoluteFill style={{background: '#e2ebe8', overflow: 'hidden'}}>
    <Art name="paper" style={{width: '100%', height: '100%', opacity: 1 - .62 * middle,
      transform: `translateX(${-133 * close}px) scale(${1 + .63 * close})`}} />
    <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 47%, transparent 53%, #23322b35 100%)'}} />
    <Audio src={staticFile('soundtrack.m4a')} />
    <Sequence from={0} durationInFrames={62}><Opening /></Sequence>
    <Sequence from={59} durationInFrames={40}><Drinks /></Sequence>
    <Sequence from={96} durationInFrames={76}><Experience kind="store" length={76} /></Sequence>
    <Sequence from={166} durationInFrames={36}><Experience kind="morning" length={36} /></Sequence>
    <Sequence from={199} durationInFrames={41}><Experience kind="cafe" length={41} /></Sequence>
    <Sequence from={235} durationInFrames={34}><Experience kind="work" length={34} /></Sequence>
    <Sequence from={262} durationInFrames={37}><FinalCup /></Sequence>
    <Sequence from={296}><FinalCup close /></Sequence>
  </AbsoluteFill>;
}

export function Root() {
  return <Composition id="CoffeeStory" component={CoffeeStory}
    width={width} height={height} fps={fps} durationInFrames={duration} />;
}
