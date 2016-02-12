import React from 'react';
import { Link } from 'react-router';

import { RouteTransition } from 'react-router-transition'

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

export default Transition;
