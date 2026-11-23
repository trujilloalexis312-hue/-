import {Composition, registerRoot} from 'remotion';
import {RankingClimb} from './RankingClimb';

const Root = () => (
  <Composition id="RankingClimb" component={RankingClimb}
    width={1080} height={1920} fps={30} durationInFrames={240}/>
);

registerRoot(Root);
