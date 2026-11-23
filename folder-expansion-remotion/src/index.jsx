import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {FolderExpansion} from './FolderExpansion';
import '@fontsource/noto-serif-sc/700.css';
import './style.css';

function Root() {
  return <Composition id="FolderExpansion" component={FolderExpansion}
    width={1920} height={1080} fps={60} durationInFrames={589} />;
}

registerRoot(Root);
