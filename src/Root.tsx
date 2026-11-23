import '@fontsource/noto-serif-sc/900.css';
import '@fontsource/noto-sans-sc/400.css';
import {Composition} from 'remotion';
import {LongLinkTest} from './LongLinkTest';

export const Root = () => (
  <Composition
    id="LongLinkTest"
    component={LongLinkTest}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={240}
    defaultProps={{audioFile: ''}}
  />
);
