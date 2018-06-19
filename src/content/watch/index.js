import React from 'react';
import ReactDOM from 'react-dom';

import RepeatButton from './repeatButton';

const mountTargetElement = document.createElement('div');
mountTargetElement.id = 'ReactAppMountTarget';
mountTargetElement.classList.add('ytp-button');
const controls = document.querySelector('#movie_player div.ytp-right-controls');
controls.prepend(mountTargetElement);

const video = document.querySelector('#movie_player video');

ReactDOM.render(
  <RepeatButton video={video}/>,
  document.getElementById('ReactAppMountTarget'),
);
