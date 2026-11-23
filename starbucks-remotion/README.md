# More than just coffee — Remotion study

Editable recreation of the vertical Starbucks motion study. The `CoffeeStory`
composition runs for 361 frames at 30 fps and renders at 720 × 1280.

## Run locally

Requires Node.js 20 or newer.

```sh
npm ci
npm run studio
npm run typecheck
npm run render
```

Studio opens an editable timeline. The render command writes
`out/coffee-story.mp4`. To use an existing Chromium install, append
`-- --browser-executable=/path/to/chromium` to the render command.

## Edit the composition

`src/CoffeeStory.tsx` defines the frame ranges, typography, green ribbon, card
transitions, and end reveal. The media in `public/` consists of cropped or
masked stills from the supplied motion reference and its separate soundtrack.
The morning commute uses a short sequence of cropped stills.

[Motionface reference](https://motionface.cc/?recording=56b2315a-852c-409f-9050-3de363328d94)
