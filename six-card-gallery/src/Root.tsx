import React from 'react';
import {Composition} from 'remotion';
import {Gallery} from './Gallery';

export const Root = () => (
  <Composition
    id="SixCardGallery"
    component={Gallery}
    width={1920}
    height={1080}
    fps={60}
    durationInFrames={776}
  />
);
