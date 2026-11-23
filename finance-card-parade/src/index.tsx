import {Composition, registerRoot} from 'remotion';
import {FinanceCardParade} from './parade';

registerRoot(() => (
  <Composition
    id="FinanceCardParade"
    component={FinanceCardParade}
    width={720}
    height={1280}
    fps={60}
    durationInFrames={360}
  />
));
