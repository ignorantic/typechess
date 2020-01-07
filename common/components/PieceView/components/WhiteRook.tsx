import React, { ComponentType } from 'react';

const displayName = 'WhiteRookComponents';

const WhiteRook: ComponentType = () => (
  <svg height="100%" width="100%" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
    <g
      fill="#ffffff"
      stroke="#000000"
    >
      <path
        d="m 9,39 27,0 0,-3 -27,0 0,3 z"
      />
      <path
        d="m 12,36 0,-4 21,0 0,4 -21,0 z"
      />
      <path
        d="m 11,14 0,-5 4,0 0,2 5,0 0,-2 5,0 0,2 5,0 0,-2 4,0 0,5"
      />
      <path
        d="m 34,14 -3,3 -17,0 -3,-3"
      />
      <path
        d="m 31,17 0,12.5 -17,0 0,-12.5"
      />
      <path
        d="m 31,29.5 1.5,2.5 -20,0 1.5,-2.5"
      />
      <path
        d="m 11,14 23,0"
      />
    </g>
  </svg>
);

WhiteRook.displayName = displayName;

export default WhiteRook;
