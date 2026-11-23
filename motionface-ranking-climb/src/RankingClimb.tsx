import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';

const entries = [
  {lab: 'Anthropic', model: 'claude-fable-5', score: 1509, margin: 6, modelRank: 1, spread: '1–4', color: '#9f624e'},
  {lab: 'Meta', model: 'muse-spark-1.1', score: 1490, margin: 6, modelRank: 9, spread: '4–16', color: '#4379d4'},
  {lab: 'Google', model: 'gemini-3-pro', score: 1486, margin: 4, modelRank: 11, spread: '5–19', color: '#3476bd'},
  {lab: 'Moonshot', model: 'kimi-k3-max', score: 1485, margin: 10, modelRank: 13, spread: '4–31', color: '#343735'},
  {lab: 'OpenAI', model: 'gpt-5.6-sol-xhigh', score: 1483, margin: 6, modelRank: 15, spread: '5–25', color: '#3e504a'},
  {lab: 'SpaceXAI', model: 'grok-4.20-beta1', score: 1474, margin: 5, modelRank: 25, spread: '13–40', color: '#343735'},
  {lab: 'Z.ai', model: 'glm-5.2-max', score: 1469, margin: 5, modelRank: 33, spread: '18–47', color: '#343735'},
  {lab: 'Baidu', model: 'ernie-5.1', score: 1468, margin: 6, modelRank: 38, spread: '19–48', color: '#5c7dc4'},
  {lab: 'Xiaomi', model: 'mimo-v2.5-pro', score: 1466, margin: 4, modelRank: 40, spread: '21–51', color: '#877a70'},
  {lab: 'DeepSeek', model: 'deepseek-v4-pro', score: 1458, margin: 4, modelRank: 49, spread: '39–60', color: '#3e68de'},
];

const featured = {lab: 'Alibaba', model: 'qwen3.8-max', score: 1496, margin: 10, modelRank: 5, spread: '1–17', color: '#3e64de'};
const rowHeight = 76;
const rowsTop = 360;
const paperWidth = 1056;
const paperHeight = 1218;
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const smooth = Easing.bezier(.36, .05, .29, 1);
const place = (frame: number, frames: number[], values: number[]) =>
  interpolate(frame, frames, values, {...clamp, easing: smooth});

type Entry = typeof featured;

const LeaderboardRow = ({entry, slot, rank, blur, featured = false, line = 0}: {
  entry: Entry; slot: number; rank: number; blur: number; featured?: boolean; line?: number;
}) => (
  <div style={{
    position: 'absolute', left: 12, right: 12, height: rowHeight, top: rowsTop + slot * rowHeight,
    display: 'grid', gridTemplateColumns: '105px 1fr 270px 125px 103px', alignItems: 'center',
    padding: '0 18px', boxSizing: 'border-box', borderBottom: '1px solid #dedfd9',
    borderRadius: featured ? 10 : 0, zIndex: featured ? 2 : 1, filter: `blur(${blur}px)`,
    background: featured ? 'linear-gradient(105deg, #f3fff7, #ebfbf0 80%, #f1fdf4)' : undefined,
    boxShadow: featured ? '0 12px 25px #426b4c46, 0 0 6px #7ca28b78' : undefined,
  }}>
    <span style={{fontSize: 19, fontWeight: 700, paddingLeft: 26}}>{rank}</span>
    <div style={{display: 'flex', gap: 13, alignItems: 'center'}}>
      <span style={{
        width: 23, textAlign: 'center', color: entry.color, fontSize: featured ? 26 : 18, fontWeight: 800,
      }}>{featured ? '✣' : entry.lab.slice(0, 1)}</span>
      <div>
        <div style={{font: '600 24px "Courier New", monospace', letterSpacing: '.3px'}}>{entry.lab}</div>
        <div style={{fontSize: 17, color: '#555d56', marginTop: 1}}>{entry.model}</div>
      </div>
    </div>
    <div style={{position: 'relative', width: 215}}>
      <span style={{fontSize: featured ? 24 : 20, fontWeight: featured ? 750 : 500}}>{entry.score}</span>
      <span style={{marginLeft: 11, fontSize: 14, color: '#5b645e'}}>±{entry.margin}</span>
      {featured && <div style={{
        height: 6, width: line * 215, borderRadius: 5, position: 'absolute', left: 2, bottom: -12,
        background: 'linear-gradient(90deg, #1db860, #81e3a5)', boxShadow: '0 1px 5px #3bd16c88',
      }}/>}
    </div>
    <span style={{fontSize: 17}}>{entry.modelRank}</span>
    <span style={{fontSize: 17}}>{entry.spread}</span>
  </div>
);

export const RankingClimb = () => {
  const frame = useCurrentFrame();
  const climb = place(frame, [0, 26, 43, 76, 133, 156, 181, 239], [10.45, 10.05, 7.15, 1.02, .87, .62, 1, 1]);
  const line = place(frame, [35, 85, 161, 205], [0, .55, 1, 1]);
  const scale = place(frame, [0, 31, 64, 132, 153, 184, 213, 239], [1.58, 1.65, 1.77, 1.9, 1.64, 1.22, 1, 1]);
  const angle = place(frame, [0, 36, 72, 133, 185, 230], [-22, -15, -12, -6, -2, 0]);
  const focusX = place(frame, [0, 37, 82, 145, 208], [750, 720, 730, 682, 540]);
  const settledY = 231 + rowsTop + 1.5 * rowHeight;
  const focusY = place(frame, [0, 10, 31, 57, 78, 124, 156, 177, 206, 239],
    [-114, 448, 706, 947, 968, 935, 895, 818, settledY, settledY]);

  return <AbsoluteFill style={{
    overflow: 'hidden', background: 'radial-gradient(ellipse at 50% 45%, #f7f5ed 5%, #e2ded4 49%, #aaa79e 100%)',
    fontFamily: 'Arial, Helvetica, sans-serif', color: '#242a24',
  }}>
    <div style={{
      position: 'absolute', left: focusX - paperWidth / 2,
      top: focusY - rowsTop - (climb + .5) * rowHeight,
      width: paperWidth, height: paperHeight, background: '#fafaf7',
      transformOrigin: `50% ${rowsTop + (climb + .5) * rowHeight}px`,
      transform: `perspective(2300px) rotate(${angle}deg) rotateX(${angle * .62}deg) scale(${scale})`,
      boxShadow: '4px 34px 85px #514d4350',
      filter: `blur(${place(frame, [0, 18, 28, 145, 160, 179], [4.2, 1.4, 0, 0, 2.4, 0])}px)`,
    }}>
      <header style={{
        position: 'absolute', inset: '24px 32px auto', height: 297,
        display: 'flex', flexDirection: 'column', padding: '11px 0 0',
      }}>
        <div style={{fontSize: 15, fontWeight: 700, letterSpacing: 1.1, borderBottom: '1px solid #e5e5dd', paddingBottom: 16}}>
          MODEL LEADERBOARD
        </div>
        <div style={{font: '38px Georgia, serif', marginTop: 28}}>Text Arena</div>
        <div style={{fontSize: 16, color: '#66685e', marginTop: 12}}>Overall model scores by lab</div>
      </header>
      <div style={{
        position: 'absolute', top: 287, left: 30, right: 30, height: 73, borderBottom: '1px solid #d8dbd3',
        display: 'grid', gridTemplateColumns: '105px 1fr 270px 125px 103px', alignItems: 'center',
        fontSize: 16, fontWeight: 750,
      }}>
        <span>Lab rank</span><span>Lab</span><span>Model score ↓</span><span>Model rank</span><span>Rank range</span>
      </div>
      {entries.map((entry, index) => {
        const rank = index + 1 + (index >= 1 ? 1 : 0);
        const slot = index + interpolate(climb - index, [-.65, .65], [1, 0], clamp);
        const blur = place(frame, [155, 212], [Math.max(0, Math.abs(slot - climb) - 1.6) * .62, 0]);
        return <LeaderboardRow key={entry.lab} entry={entry} slot={slot} rank={frame >= 76 ? rank : Math.round(slot) + 1} blur={blur}/>;
      })}
      <LeaderboardRow entry={featured} slot={climb} rank={Math.min(11, Math.round(climb) + 1)} blur={0} featured line={line}/>
    </div>
    <AbsoluteFill style={{
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 51% 47%, #fff9e9a0 0%, transparent 42%, #534b3d52 100%)',
      opacity: place(frame, [0, 98, 219], [.46, .43, .22]),
    }}/>
  </AbsoluteFill>;
};
