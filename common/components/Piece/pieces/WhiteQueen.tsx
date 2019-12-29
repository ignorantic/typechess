import React, { ComponentType } from 'react';

const displayName = 'WhiteQueenComponents';

const WhiteQueen: ComponentType = () => (
  <svg height="100%" width="100%" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
    <g
      fill="#ffffff"
      stroke="#000000"
    >
      <path
        d="m 8,12 a 2,2 0 0 1 -4,0 2,2 0 1 1 4,0 z"
      />
      <path
        d="m 24.5,7.5 a 2,2 0 0 1 -4,0 2,2 0 1 1 4,0 z"
      />
      <path
        d="m 41,12 a 2,2 0 0 1 -4,0 2,2 0 1 1 4,0 z"
      />
      <path
        d="m 16,8.5 a 2,2 0 0 1 -4,0 2,2 0 1 1 4,0 z"
      />
      <path
        d="m 33,9 a 2,2 0 0 1 -4,0 2,2 0 1 1 4,0 z"
      />
      <path
        d="m 9,26 c 8.5,-1.5 21,-1.5 27,0 l 2,-12 -7,11 0,-14 -5.5,13.5 -3,-15 -3,15 L 14,10.5 14,25 7,14 9,26 Z"
      />
      <path
        d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"
      />
      <path
        d="M 11.5,30 C 15,29 30,29 33.5,30"
      />
      <path
        d="m 12,33.5 c 6,-1 15,-1 21,0"
      />
    </g>
  </svg>
);

WhiteQueen.displayName = displayName;

export default WhiteQueen;
