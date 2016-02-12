import React from 'react'
import { RouteTransition } from 'react-router-transition'
import presets from './presets'

const Transition = (props) => (
  <div>
    <RouteTransition
      className="transition-wrapper"
      pathname={props.location.pathname}
      {...props.preset}
    >
      {props.children}
    </RouteTransition>
  </div>
);

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

