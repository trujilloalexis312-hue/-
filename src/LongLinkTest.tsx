import type {CSSProperties} from 'react';
import {
  AbsoluteFill, Audio, Easing, Img, interpolate, staticFile, useCurrentFrame,
} from 'remotion';
import {Gear} from './Gear';

const paper = '#d2d0ce';
const ink = '#141313';
const serif = '"Noto Serif SC", "Songti SC", serif';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const range = (frame: number, start: number, end: number, from: number, to: number, easing = Easing.linear) =>
  interpolate(frame, [start, end], [from, to], {...clamp, easing});
const easeOut = Easing.out(Easing.cubic);

const type = (value: string, frame: number, start: number, end: number) =>
  value.slice(0, Math.floor(range(frame, start, end, 0, value.length)));

const Grain = ({frame}: {frame: number}) => (
  <AbsoluteFill style={{
    backgroundImage: `url("${staticFile('grain.png')}")`,
    backgroundPosition: `${11 * Math.floor(frame / 3) % 192}px ${7 * Math.floor(frame / 3) % 192}px`,
    mixBlendMode: 'soft-light',
  }}/>
);

const Splice = ({style}: {style?: CSSProperties}) => (
  <div style={{
    position: 'absolute', width: 3, background: 'repeating-linear-gradient(#4b484774 0 5px, transparent 5px 10px)',
    ...style,
  }}/>
);

const Hand = ({left, top, width, mirror = false, blur = 0}: {
  left: number; top: number; width: number; mirror?: boolean; blur?: number;
}) => (
  <Img src={staticFile('hand.webp')} style={{
    width, left, top, position: 'absolute', transform: mirror ? 'scaleX(-1)' : undefined,
    filter: `blur(${blur}px) drop-shadow(-7px 12px 10px #40586a80)`,
  }}/>
);

const Intro = ({frame}: {frame: number}) => {
  const lift = range(frame, 0, 32, 190, 0, easeOut);
  const pan = range(frame, 28, 47, 35, -16);
  const wobble = Math.sin(frame * .16) * 8;
  const title = [
    {text: '长', left: 404, top: 147, size: 326, scale: .73, skew: -2, entry: 0},
    {text: '链路', left: 648, top: 303, size: 205, scale: 1.08, skew: -14, entry: 3},
    {text: '测试', left: 1169, top: 278, size: 166, scale: 1.04, skew: -10, entry: 6},
  ];

  return <AbsoluteFill style={{transform: `translateX(${pan}px)`}}>
    <Splice style={{left: 938, top: 628, bottom: 0}}/>
    {title.map(({text, left, top, size, scale, skew, entry}) => (
      <div key={text} style={{
        position: 'absolute', left: left + range(frame, entry, 28, -235, 0, easeOut),
        top: top + range(frame, entry, 28, 136, 0, easeOut), fontFamily: serif,
        fontSize: size, fontWeight: 900, lineHeight: 1, whiteSpace: 'nowrap', transformOrigin: 'left',
        transform: `scaleX(${scale}) skewX(${skew}deg)`, opacity: range(frame, entry, entry + 7, 0, 1),
        filter: `blur(${range(frame, entry, 28, 5, 0)}px)`,
      }}>{text}</div>
    ))}
    <div style={{
      position: 'absolute', top: 502 + lift * .55, left: 299,
      font: 'italic 700 108px Arial, sans-serif', color: '#ae191d', whiteSpace: 'nowrap',
      letterSpacing: -5,
    }}>{type('Long link testing', frame, 2, 28)}</div>
    <Hand left={-94} top={768 + lift} width={705} blur={3}/>
    <Hand left={1045} top={675 + lift * 1.4} width={1000} mirror blur={3}/>
    <Gear id="intro-left" size={232} angle={frame * 1.8} style={{left: 319, top: 573 + lift + wobble}}/>
    <Gear id="intro-right" size={329} angle={-frame * 1.55} style={{left: 1127, top: 413 + lift * 1.6 - wobble}}/>
  </AbsoluteFill>;
};

const rows = [
  {model: 'Kimi K3', score: '42.0', nameStart: 50, scoreStart: 60},
  {model: 'Fable 5', score: '35.0', nameStart: 66, scoreStart: 78},
  {model: 'GPT-5.6Sol', score: '39.0', nameStart: 87, scoreStart: 99},
];

const Scores = ({frame}: {frame: number}) => {
  const drift = Math.sin(frame / 22) * 12;
  const highlight = range(frame, 101, 114, 0, 100, easeOut);

  return <AbsoluteFill style={{transform: `translate(${drift}px, ${drift * .33}px)`}}>
    <Splice style={{left: 945, top: 0, height: 277, opacity: .63}}/>
    <div style={{position: 'absolute', left: 389, top: 254, whiteSpace: 'nowrap', fontSize: 96, transform: 'scaleX(1.1)', transformOrigin: 'left', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 500}}>
      SWE Marathon<span style={{fontFamily: serif, fontSize: 79, fontWeight: 900}}>长链路测试</span>
    </div>
    <div style={{position: 'absolute', left: 386, top: 414, width: 1196, height: 414}}>
      <div style={{
        position: 'absolute', left: 682, top: 1, width: 512, height: 268,
        backgroundColor: '#e6b800', clipPath: `inset(0 ${100 - highlight}% 0 0)`,
      }}/>
      <div style={{position: 'absolute', left: 682, top: 0, height: '100%', borderLeft: '2px solid #73706d35'}}/>
      {rows.map(({model, score, nameStart, scoreStart}, index) => (
        <div key={model} style={{
          position: 'absolute', top: index * 138, width: '100%', height: 126, display: 'flex',
          alignItems: 'center', borderBottom: index < 2 ? '2px solid #73706d42' : undefined,
          fontFamily: 'Arial, sans-serif', fontSize: 99, fontWeight: 900, letterSpacing: -2,
        }}>
          <span style={{transform: index === 2 ? 'scaleX(.86)' : 'scaleX(1.31)', transformOrigin: 'left', fontWeight: index === 2 ? 400 : 900}}>
            {type(model, frame, nameStart, nameStart + 13)}
          </span>
          <span style={{position: 'absolute', left: 836, transform: 'scaleX(1.54)', transformOrigin: 'left'}}>
            {type(score, frame, scoreStart, scoreStart + 10)}
          </span>
        </div>
      ))}
    </div>
    <Gear id="score-distant-left" size={164} angle={frame} style={{left: 100, top: 215, opacity: .48, filter: 'blur(10px) drop-shadow(-8px 14px 9px #34415188)'}}/>
    <Gear id="score-distant-right" size={334} angle={-frame * .7} style={{left: 1729, top: 330, opacity: .69, filter: 'blur(13px) drop-shadow(-12px 17px 10px #34415188)'}}/>
    <Hand left={-209} top={898} width={718} blur={9}/>
    <Gear id="score-left" size={257} angle={frame * 1.13} style={{left: 164, top: 720 + drift, filter: 'blur(4px) drop-shadow(-14px 18px 10px #344151a0)'}}/>
    <Hand left={1476} top={841} width={490} mirror blur={7}/>
    <Gear id="score-right" size={139} angle={-frame * 1.3} style={{left: 1574, top: 731 - drift, filter: 'blur(4px) drop-shadow(-8px 14px 10px #344151a0)'}}/>
  </AbsoluteFill>;
};

const captions = [
  {end: 52, text: '在这项长链路的测试里边'},
  {end: 87, text: 'K3拿了42分'},
  {end: 150, text: '比Fable 5的35分高出了7分'},
  {end: 171, text: '也就是说'},
  {end: 240, text: 'K3赢的不只是页面做的好不好看'},
];

export const LongLinkTest = ({audioFile}: {audioFile: string}) => {
  const frame = useCurrentFrame();
  const slide = range(frame, 44, 61, 0, 1080, Easing.bezier(.52, .02, .32, 1));
  const caption = captions.find(({end}) => frame < end);

  return <AbsoluteFill style={{backgroundColor: paper, color: ink, overflow: 'hidden'}}>
    {audioFile ? <Audio src={staticFile(audioFile)}/> : null}
    {frame < 61 && <AbsoluteFill style={{transform: `translateY(${-slide}px)`}}><Intro frame={frame}/></AbsoluteFill>}
    {frame >= 44 && <AbsoluteFill style={{transform: `translateY(${1080 - slide}px)`}}><Scores frame={frame}/></AbsoluteFill>}
    <Grain frame={frame}/>
    <AbsoluteFill style={{
      background: 'radial-gradient(ellipse at 50% 48%, #ffffff12 14%, transparent 54%, #27272635 100%)',
      boxShadow: 'inset 0 0 4px #52504d60',
    }}/>
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 63, textAlign: 'center', color: '#f7f7f6',
      font: '400 57px "Noto Sans SC", Arial, sans-serif', transform: 'scaleX(.89)',
      textShadow: '0 3px 5px #4e4d4a, 0 0 2px #8a8884',
    }}>{caption?.text}</div>
  </AbsoluteFill>;
};
