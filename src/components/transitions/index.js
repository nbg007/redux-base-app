import React from 'react'
import { presets } from 'react-router-transition'
import Transition from './route-transition'

export const FadeTransition = props => (
  <Transition preset={presets.fade} {...props} />
);

export const PopTransition = props => (
  <Transition preset={presets.pop} {...props} />
);

export const SlideLeftTransition = props => (
  <Transition preset={presets.slideLeft} {...props} />
);

export const SlideRightTransition = props => (
  <Transition preset={presets.slideRight} {...props} />
);
