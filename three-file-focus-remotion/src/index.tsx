import {Composition, registerRoot} from 'remotion';
import {ThreeFileFocus} from './ThreeFileFocus';

function Root() {
  return (
    <Composition
      id="ThreeFileFocus"
      component={ThreeFileFocus}
      durationInFrames={840}
      fps={60}
      width={1920}
      height={1080}
    />
  );
}

registerRoot(Root);
