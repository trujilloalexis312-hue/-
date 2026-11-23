# Create to Earn

A Remotion recreation of a monochrome, vertical motion graphics clip. The composition is 720 × 1280 at 30 fps and runs for 368 frames. It uses React and SVG for the artwork and a small deterministic audio generator for the soundtrack.

## Run locally

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Render the complete composition to `out/create-to-earn.mp4`:

```sh
npm run render
```

The npm scripts generate the WAV before starting Studio or rendering. For an existing Chromium installation, pass its path with `npm run render -- --browser-executable=/usr/bin/chromium`.

## Scene timing

| Time | Animation |
| --- | --- |
| 0–2.48 s | Floating perspective cards, rising view counter, and a white flash |
| 2.38–3.94 s | Grayscale coins rotate above an outstretched hand |
| 3.55–6.94 s | Rising arrow and reflective earnings chart, with coin stacks entering at the end |
| 6.94–10.65 s | Spinning segmented wheel and audience silhouettes |
| 10.28–12.27 s | Planet rims slide behind the three-line CREATE TO EARN title |

Timing, layout, gradients, and text are defined in `src/index.jsx`. The synthesized sound accents are defined in `scripts/audio.mjs`.
