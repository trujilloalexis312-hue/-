import {mkdirSync, writeFileSync} from 'node:fs';

const sampleRate = 24000;
const samples = sampleRate * 368 / 30;
const wav = Buffer.alloc(44 + samples * 2);
wav.write('RIFF');
wav.writeUInt32LE(wav.length - 8, 4);
wav.write('WAVEfmt ', 8);
wav.writeUInt32LE(16, 16);
wav.writeUInt16LE(1, 20);
wav.writeUInt16LE(1, 22);
wav.writeUInt32LE(sampleRate, 24);
wav.writeUInt32LE(sampleRate * 2, 28);
wav.writeUInt16LE(2, 32);
wav.writeUInt16LE(16, 34);
wav.write('data', 36);
wav.writeUInt32LE(samples * 2, 40);

const cuts = [0, 2.42, 3.78, 5.89, 6.94, 10.43, 10.8, 11.08, 11.33];
const sinusoid = (cycles) => Math.sin(2 * Math.PI * cycles);
let smoothedNoise = 0;
let seed = 53;
for (let i = 0; i < samples; i++) {
  const t = i / sampleRate;
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  smoothedNoise += .1 * (seed / 2147483648 - 1 - smoothedNoise);
  let value = .035 * (sinusoid(48*t) + .4*sinusoid(72*t)) * (.7 + .3*sinusoid(.25*t));
  for (const cut of cuts) {
    const elapsed = t - cut;
    if (elapsed < -.18 || elapsed > .85) continue;
    const attack = Math.min(1, (elapsed + .18) / .18);
    const envelope = elapsed < 0 ? attack ** 3 : Math.exp(-elapsed * 8);
    value += envelope * (.13 * sinusoid(47 * elapsed + 7 * (1 - Math.exp(-Math.max(0, elapsed) * 10))) + .17 * smoothedNoise);
  }
  const fade = Math.min(1, t*24, (samples-i)/(sampleRate*.28));
  wav.writeInt16LE(Math.round(value * fade * 32767), 44 + i * 2);
}
mkdirSync(new URL('../public/', import.meta.url), {recursive:true});
writeFileSync(new URL('../public/soundtrack.wav', import.meta.url), wav);
