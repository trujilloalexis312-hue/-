import React from 'react';
import {AbsoluteFill, Audio, Composition, interpolate, registerRoot, staticFile, useCurrentFrame} from 'remotion';

const sample = (t, times, values) =>
  interpolate(t, times, values, {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

function Definitions() {
  return <defs>
    <radialGradient id="dark"><stop stopColor="#1a1a1a"/><stop offset="1" stopColor="#020202"/></radialGradient>
    <radialGradient id="light" r=".76"><stop offset=".83" stopColor="white"/><stop offset=".95" stopColor="#f8f8f8"/><stop offset="1" stopColor="#b3b3b3"/></radialGradient>
    <radialGradient id="glow"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient>
    <radialGradient id="planet" cx=".42" cy=".43"><stop offset=".46" stopColor="#050505"/><stop offset=".65" stopColor="#0d0d0d"/><stop offset=".83" stopColor="#222"/><stop offset=".98" stopColor="#666"/><stop offset="1" stopColor="#444"/></radialGradient>
    <linearGradient id="card" x2=".85" y2="1"><stop stopColor="#484848"/><stop offset=".55" stopColor="#151515"/><stop offset="1" stopColor="#515151"/></linearGradient>
    <linearGradient id="metal" x2="1" y2=".64"><stop stopColor="#777"/><stop offset=".24" stopColor="#d0d0d0"/><stop offset=".56" stopColor="#555"/><stop offset="1" stopColor="#252525"/></linearGradient>
    <linearGradient id="hand"><stop stopColor="#222" stopOpacity="0"/><stop offset=".35" stopColor="#333"/><stop offset="1" stopColor="#373737"/></linearGradient>
    <linearGradient id="plot" x2="0" y2="1"><stop stopColor="#aaa" stopOpacity=".72"/><stop offset="1" stopColor="#aaa" stopOpacity="0"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="9"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="2.4"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".77" numOctaves="3" seed="12" stitchTiles="stitchTiles"/></filter>
    <clipPath id="graph"><rect x="27" y="192" width="216" height="121" rx="13"/></clipPath>
  </defs>;
}

const cards = [[52, 196, .79, 1], [159, 145, .65, 2], [56, 343, .56, 3], [157, 311, 1.14, 4]];

function Views({t}) {
  const count = Math.round(sample(t, [0, .75, 1.25, 1.75, 2.15], [0, 10263, 293233, 481203, 503411]));
  const label = t < 2.15 ? count : '9million+';
  const exit = sample(t, [1.94, 2.47], [0, 1]);
  return <>
    <rect width="270" height="480" fill="url(#dark)"/>
    <circle cx="193" cy="325" r="154" fill="url(#planet)" opacity={sample(t,[.7,1.7],[0,.46])}/>
    <ellipse cx="34" cy="174" rx="40" ry="38" fill="url(#glow)" opacity=".26"/>
    <g fill="#dedede" opacity={sample(t,[.27,.55],[0,1])}>
      <text x={t < 2.15 ? 93 : 36} y="157" fontSize="43" fontWeight="bold">{label}</text>
      <text x={t < 2.15 ? 96 : 39} y="179" fontSize="20">Views</text>
    </g>
    {cards.map(([x,y,size,phase]) => {
      const travel = sample(t,[0,.87],[phase%2 ? -85 : 62,0]);
      const sway = Math.sin(t*2.5+phase)*7;
      return <g key={phase} transform={`translate(${x + sway + exit*(x-132)*1.4} ${y + travel + sway - exit*(70+phase*28)}) scale(${size}) skewY(-7)`} opacity={1-exit*.68}>
        <rect x="-3" width="76" height="141" fill="#bcbcbc" opacity=".45" rx="8" filter="url(#soft)"/>
        <rect width="74" height="140" fill="url(#card)" stroke="#aaa" strokeWidth="1" rx="7"/>
        <path d="M3 6V132" stroke="#eee" opacity=".6" strokeWidth="4"/>
        <rect x="13" y="14" width="51" height="41" fill="url(#metal)" rx="4" opacity=".86"/>
        <text x="14" y="76" fill="#eee" fontSize="11" fontWeight="bold">{Math.round(count*(phase===4?1:.81+phase*.04))}</text>
        <text x="14" y="86" fill="#ddd" fontSize="8">Views</text>
      </g>;
    })}
    <ellipse cx="61" cy="280" rx="126" ry="137" fill="url(#glow)" opacity={sample(t,[2,2.47],[0,1])}/>
  </>;
}

function Coin({x,y,r,flat=1}) {
  return <g transform={`translate(${x} ${y}) scale(1 ${flat}) rotate(-23)`}>
    <circle r={r} fill="url(#metal)" stroke="#999" strokeWidth=".5"/>
    <circle r={r*.86} fill="none" stroke="#eee" strokeWidth=".55" opacity=".27"/>
  </g>;
}

function Coins({t}) {
  const count = Math.round(sample(t, [2.5,2.75,3.25,3.72], [18,28,48,68]));
  const exit = sample(t,[3.3,3.84],[0,1]);
  return <>
    <rect width="270" height="480" fill="url(#light)"/>
    <g transform={`translate(${-240*exit} 0)`}>
      <text x="23" y="157" fill="#d4d4d4" fontSize="40" fontWeight="bold" opacity=".76">{count}million+</text>
      <text x="30" y="179" fill="#d7d7d7" fontSize="20">Views</text>
      {[0,1,2].map(i => <Coin key={i} x={133+i*3} y={183+i*47+Math.sin(t*6+i)*17} r={32} flat={.17+.83*Math.abs(Math.cos(t*4.1+i*.83))}/>)}
      <path d="M-19 367L30 357Q58 339 81 339L151 333Q170 332 161 340L135 350Q123 357 137 361Q163 362 190 356Q204 352 210 360L172 376L132 385L73 381Q57 378 33 390L-19 408Z" fill="url(#hand)"/>
      <path d="M137 351l25-3q7 3 0 9l-30 1z" fill="#6d6d6d" opacity=".82"/>
    </g>
  </>;
}

function Graph({t}) {
  const enter = sample(t,[3.55,4.18],[1,0]);
  const zoom = sample(t,[3.73,4.6,5.85,6.6],[.72,1.03,1.03,.66]);
  const stacks = sample(t,[5.68,6.5],[0,1]);
  const shine = ((t-4.14)%1.09)*310-100;
  return <>
    <rect width="270" height="480" fill="url(#light)"/>
    <g transform={`translate(${135+enter*273} 250) scale(${zoom}) translate(-135 -250)`}>
      <path d="M-11 305L176 116L191 148L272 65" fill="none" stroke="#363636" strokeWidth="8"/>
      <rect x="23" y="353" width="224" height="44" rx="12" fill="#1c1c1c" opacity=".49" filter="url(#blur)"/>
      <path d="M26 348H246" stroke="#8b8b8b" strokeWidth="1.4"/>
      <rect x="27" y="192" width="216" height="121" rx="13" fill="#242424" stroke="#aaa" strokeWidth="1.2"/>
      <g clipPath="url(#graph)">
        <path d="M70 278L185 212V280Z" fill="url(#plot)"/>
        <path d={`M${shine} 320l98-142h32l-108 142z`} fill="#fff" opacity=".29" filter="url(#soft)"/>
      </g>
      <g fill="#a8a8a8" fontSize="7"><text x="46" y="253">Money</text><text x="130" y="301">Reach</text><text x="226" y="290">1</text></g>
    </g>
    {[[0,420,13],[263,440,16],[100,514,8],[216,546,7]].map(([x,y,n],j) =>
      <g key={x} transform={`translate(${x} ${y+(1-stacks)*225})`}>
        {Array.from({length:n},(_,i)=><g key={i} transform={`translate(${3*Math.sin(i*2+j)} ${-i*10})`}>
          <path d="M-24 0v7a24 6 0 0 0 48 0V0Z" fill="url(#metal)"/>
          <ellipse rx="24" ry="6" fill="#aaa" stroke="#ddd" strokeWidth="1"/>
          <ellipse rx="18" ry="4" fill="#797979"/>
        </g>)}
      </g>)}
    <rect width="270" height="480" fill="#050505" opacity={sample(t,[6.55,6.94],[0,1])}/>
  </>;
}

function Wheel({t}) {
  const start = sample(t,[6.94,7.65],[0,1]);
  const exit = sample(t,[9.94,10.65],[0,1]);
  const turn = sample(t,[7,7.65,8.3,9.25,10.05],[43,220,323,371,395]);
  const sectors = Array.from({length:10},(_,i) => {
    const a = Math.PI*i/5, b = a+Math.PI/5;
    return <g key={i} fill={['#9c9c9c','#b8b8b8','#858585','#bababa','#a0a0a0'][i%5]}>
      <path d={`M0 0L${90*Math.cos(a)} ${90*Math.sin(a)} A90 90 0 0 1 ${90*Math.cos(b)} ${90*Math.sin(b)}Z`}/>
      <circle cx={73*Math.cos(a+.3)} cy={73*Math.sin(a+.3)} r={i%3+2} fill="#161616"/>
    </g>;
  });
  return <>
    <rect width="270" height="480" fill="#050505"/>
    <circle cx="135" cy={8+start*9} r="177" fill="url(#planet)" filter="url(#soft)"/>
    <g transform={`translate(${135-58*(1-start)-230*exit} ${241+143*(1-start)}) scale(${.66+.34*start+.19*exit})`}>
      <circle r="89" fill="#9c9c9c" opacity=".55" filter="url(#blur)"/>
      <g transform={`rotate(${turn})`}>{sectors}</g>
      <circle r="89" fill="url(#glow)" opacity=".28"/>
      <circle r="7" fill="#161616"/>
      <path d="M-6 -106L6 -106L0 -87Z" fill="#080808"/>
    </g>
    {[[218,360,.73],[214,425,1],[109,448,.98],[150,411,.59]].map(([x,y,s],i) =>
      <g key={x} transform={`translate(${x-exit*92} ${y+45*(1-start)}) scale(${s})`} opacity={sample(t,[7.58+i*.26,8.12+i*.38],[0,.45+i*.11])*(1-exit)}>
        <circle r="17" fill="#666"/>
        <path d="M-39 56V46Q-38 20 -21 20H21Q38 20 39 46V56Z" fill="url(#card)"/>
      </g>)}
  </>;
}

function Outro({t}) {
  const drift = sample(t,[10.35,12.23],[0,143]);
  return <g opacity={sample(t,[10.28,10.63],[0,1])}>
    <rect width="270" height="480" fill="#020202"/>
    <circle cx={-162+drift*.35} cy="245" r="166" fill="url(#planet)" filter="url(#soft)"/>
    <circle cx={290+drift} cy="245" r="163" fill="url(#planet)" filter="url(#soft)"/>
    {['CREATE','TO','EARN'].map((line,i)=><text key={line} x="135" y={214+i*31} textAnchor="middle" fill="#e3e3e3" fontSize="16" fontWeight={i===1?400:700} opacity={sample(t,[10.6+i*.22,10.76+i*.22],[0,1])}>{line}</text>)}
  </g>;
}

function CreateToEarn() {
  const frame = useCurrentFrame();
  const t = frame/30;
  return <AbsoluteFill style={{backgroundColor:'#050505'}}>
    <Audio src={staticFile("soundtrack.wav")} />
    <svg viewBox="0 0 270 480" style={{width:'100%',height:'100%',fontFamily:'Arial, Helvetica, sans-serif'}}>
      <Definitions/>
      {t < 2.48 && <Views t={t}/>}
      {t >= 2.38 && t < 3.94 && <g opacity={sample(t,[2.38,2.53],[0,1])}><Coins t={t}/></g>}
      {t >= 3.55 && t < 6.94 && <g opacity={sample(t,[3.55,3.94],[0,1])}><Graph t={t}/></g>}
      {t >= 6.94 && <Wheel t={t}/>}
      {t >= 10.28 && <Outro t={t}/>}
      <rect width="270" height="480" filter="url(#grain)" opacity=".14" style={{mixBlendMode:'soft-light'}}/>
    </svg>
  </AbsoluteFill>;
}

registerRoot(() => <Composition id="CreateToEarn" component={CreateToEarn} width={720} height={1280} fps={30} durationInFrames={368}/>);
