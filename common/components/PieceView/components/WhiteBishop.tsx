import React, { ComponentType } from 'react';

const displayName = 'WhiteBishopComponents';

const WhiteBishop: ComponentType = () => (
  <svg height="100%" width="100%" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
    <g
      fill="#ffffff"
      stroke="#000000"
    >
      <path
        d="m 9,36 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,0.5 -3.39,-0.97 -10.11,0.46 -13.5,-1 C 19.11,38.96 12.39,37.53 9,38.5 7.646,38.99 6.677,38.97 6,38 7.354,36.06 9,36 9,36 Z"
      />
      <path
        d="m 15,32 c 2.5,2.5 12.5,2.5 15,0 0.5,-1.5 0,-2 0,-2 0,-2.5 -2.5,-4 -2.5,-4 5.5,-1.5 6,-11.5 -5,-15.5 -11,4 -10.5,14 -5,15.5 0,0 -2.5,1.5 -2.5,4 0,0 -0.5,0.5 0,2 z"
      />
      <path
        d="m 25,8 a 2.5,2.5 0 1 1 -5,0 2.5,2.5 0 1 1 5,0 z"
      />
      <path
        d="m 17.5,26 10,0 M 15,30 30,30 m -7.5,-14.5 0,5 M 20,18 l 5,0"
      />
    </g>
  </svg>
);

WhiteBishop.displayName = displayName;

export default WhiteBishop;
