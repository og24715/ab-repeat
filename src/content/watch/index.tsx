import * as React from 'react';
import {render} from 'react-dom';

import RepeatButton from './repeatButton';

const mountTargetElement = document.createElement('div');
mountTargetElement.id = 'ReactAppMountTarget';
mountTargetElement.classList.add('ytp-button');
const controls = document.querySelector('#movie_player div.ytp-right-controls');
controls?.prepend(mountTargetElement);

const video = document.querySelector<HTMLVideoElement>('#movie_player video');

if (video) {
  render(
    <RepeatButton video={video}/>,
    document.getElementById('ReactAppMountTarget'),
  );
}

