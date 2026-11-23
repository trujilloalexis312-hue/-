import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {ReactNode} from 'react';
import {ExpenseCategories, Expenses, Income, Invoice, Transactions} from './cards';
import './style.css';

type Pose = readonly [x: number, y: number, scale: number, tilt: number, yaw: number, pitch: number];
type Key = readonly [seconds: number, pose: Pose];

const income: Key[] = [
  [0, [500, 268, .62, 2, -7, -6]],
  [.43, [500, 273, .62, 3, 10, -5]],
  [.72, [492, 239, .69, 1, 19, -4]],
  [.97, [396, 393, .94, -7, -17, -8]],
  [1.33, [362, 614, 1, -2.7, -6, -9]],
  [1.92, [367, 626, 1, -1, -3, -7]],
  [2.06, [361, 690, 1.16, 5, 7, -9]],
  [2.32, [378, 45, 1.35, 1, 7, 13]],
  [2.53, [412, -210, .9, 0, 0, 5]],
  [4.04, [915, -190, .56, 3, 17, 9]],
  [4.4, [642, 157, .62, 4, 18, 0]],
  [4.72, [510, 328, .54, 1, 9, -4]],
  [5.06, [470, 354, .50, -2.3, -5, 3]],
  [5.99, [475, 353, .50, -2.3, -5, 3]],
];

const invoice: Key[] = [
  [0, [510, 904, .55, -9, -30, 5]],
  [.47, [493, 917, .55, -9, -30, 5]],
  [.73, [503, 936, .57, -9, -28, 4]],
  [1.05, [499, 1232, .62, -8, -21, 2]],
  [1.43, [550, 1475, .70, -3, -12, -3]],
  [1.94, [497, 1500, .81, -4, -9, 0]],
  [2.13, [350, 1137, .93, -4, -11, 18]],
  [2.48, [201, 655, 1.04, -3, 29, -2]],
  [2.76, [309, 631, 1.02, 2, 17, 2]],
  [3.01, [328, 633, 1.01, 2, 14, 2]],
  [3.24, [392, 659, 1.07, 4, 35, 5]],
  [3.51, [-285, 714, .96, -7, -42, 5]],
  [4.26, [-418, 708, .74, -3, 40, 0]],
  [4.27, [1070, 898, .65, 5, 34, 0]],
  [4.49, [648, 908, .60, 3, 25, 0]],
  [4.86, [523, 923, .52, 0, 8, 2]],
  [5.15, [507, 925, .49, -1.3, -2, 2]],
  [5.99, [507, 925, .49, -1.3, -2, 2]],
];

const transactions: Key[] = [
  [0, [15, 913, .60, -4, 20, -6]],
  [.72, [50, 913, .62, -3, 23, -3]],
  [1.03, [-251, 1093, .60, 5, 22, 3]],
  [2.83, [-446, 715, .89, -4, 38, 0]],
  [2.84, [1080, 565, .96, -13, -34, 4]],
  [3.18, [829, 616, 1, -13, -33, 4]],
  [3.48, [298, 573, 1.02, -10, -24, -3]],
  [3.78, [351, 611, 1, -7.5, -9, -7]],
  [4.14, [350, 639, 1.02, -6, -15, -4]],
  [4.42, [176, 823, .81, -4, 21, 0]],
  [4.70, [21, 838, .63, -3, 24, 0]],
  [5.08, [2, 810, .52, 1, 11, 0]],
  [5.99, [2, 810, .52, 1, 11, 0]],
];

const expenses: Key[] = [
  [0, [-47, 288, .69, 2, -5, 0]],
  [.47, [-88, 282, .65, 7, -7, 0]],
  [.95, [-176, 333, .70, 2, -6, 0]],
  [3.10, [446, -229, .84, 4, 6, 4]],
  [3.47, [261, 48, .91, 5, 2, 6]],
  [4.04, [318, 32, .89, 4, 2, 7]],
  [4.43, [205, 238, .72, 7, 0, 3]],
  [4.86, [107, 371, .64, 6, -3, 0]],
  [5.16, [109, 402, .61, 5, -5, 0]],
  [5.99, [109, 402, .61, 5, -5, 0]],
];

const categories: Key[] = [
  [0, [845, 507, .78, 2, -12, 0]],
  [1.01, [896, 1020, .88, 5, -10, 0]],
  [1.46, [831, 1078, .88, 4, -12, 0]],
  [1.94, [840, 1091, .88, 5, -10, 0]],
  [2.24, [912, 1137, .82, 2, 12, 0]],
  [4.28, [941, 590, .65, 0, -6, 0]],
  [4.72, [786, 555, .57, 1, -7, 0]],
  [5.17, [790, 546, .50, -2, -5, 0]],
  [5.99, [790, 546, .50, -2, -5, 0]],
];

function samplePose(seconds: number, keys: Key[]) {
  const times = keys.map(([time]) => time);
  return keys[0][1].map((_, index) => interpolate(
    seconds, times, keys.map(([, pose]) => pose[index]),
    {easing: Easing.inOut(Easing.sin), extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  ));
}

function Float({seconds, keys, children}: {seconds: number; keys: Key[]; children: ReactNode}) {
  const [x, y, scale, tilt, yaw, pitch] = samplePose(seconds, keys);
  return <div className="float" style={{
    left: x,
    top: y,
    transform: `translate(-50%, -50%) perspective(920px) rotateZ(${tilt}deg) rotateY(${yaw}deg) rotateX(${pitch}deg) scale(${scale})`,
  }}>{children}</div>;
}

const titles: {text: string; start: number; end: number; keys: Key[]}[] = [
  {text: 'Track Income', start: .95, end: 2.05, keys: [[.95, [228, 392, .81, -9, -15, 0]], [1.36, [335, 363, 1, -3.5, -4, 0]], [2.05, [355, 370, 1, 0, 0, 0]]]},
  {text: 'Manage Invoices', start: 2.48, end: 3.25, keys: [[2.48, [248, 227, .92, 2, 20, 0]], [2.77, [322, 242, 1, 3, 12, 0]], [3.25, [355, 254, 1, 4, 16, 0]]]},
  {text: 'Organize Transactions', start: 3.46, end: 4.28, keys: [[3.46, [300, 269, .94, -10, -19, 0]], [3.80, [317, 284, 1, -8, -6, 0]], [4.28, [331, 284, 1, -7, -9, 0]]]},
  {text: 'Understand\nBusiness', start: 4.63, end: 6.4, keys: [[4.63, [311, 614, .86, -4, 8, 0]], [5.00, [350, 624, 1, 0, 0, 0]]]},
];

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export function FinanceCardParade() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const seconds = frame / fps;

  return (
    <AbsoluteFill className="stage">
      <AbsoluteFill className="lighting" style={{
        transform: `translate(${36 * Math.sin(seconds * 1.6)}px, ${44 * Math.cos(seconds * 1.3)}px) scale(1.13)`,
      }} />
      <Float seconds={seconds} keys={expenses}><Expenses /></Float>
      <Float seconds={seconds} keys={categories}><ExpenseCategories /></Float>
      {(seconds <= 2.83 || seconds >= 2.84) && <Float seconds={seconds} keys={transactions}><Transactions /></Float>}
      {(seconds <= 4.26 || seconds >= 4.27) && <Float seconds={seconds} keys={invoice}><Invoice /></Float>}
      <Float seconds={seconds} keys={income}><Income /></Float>
      {seconds < 1.02 && <div className="spark" style={{
        left: interpolate(seconds, [0, .8, 1.02], [127, 325, 530], clamp),
        top: interpolate(seconds, [0, .8, 1.02], [414, 526, 243], clamp),
        transform: `translate(-50%, -50%) rotate(${8 + 24 * seconds}deg) scale(${1 - seconds * .5})`,
        opacity: interpolate(seconds, [.86, 1.02], [1, 0], clamp),
      }} />}
      {titles.filter(({start, end}) => seconds >= start && seconds <= end).map(({text, start, end, keys}) => {
        const reveal = interpolate(seconds, [start, start + .18], [0, 100], clamp);
        const opacity = interpolate(seconds, [end - .10, end], [1, 0], clamp);
        return <Float key={text} seconds={seconds} keys={keys}>
          <div className="title" style={{opacity, clipPath: reveal < 100 ? `inset(-28px ${100 - reveal}% -28px -25px)` : undefined}}>{text}</div>
        </Float>;
      })}
    </AbsoluteFill>
  );
}
