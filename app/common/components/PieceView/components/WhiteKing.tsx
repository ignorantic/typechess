import React, { ComponentType } from 'react';

const displayName = 'WhiteKingComponents';

const WhiteKing: ComponentType = () => (
  <svg height="100%" width="100%" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
    <g
      fill="#ffffff"
      stroke="#000000"
    >
      <path
        d="M 22.5,11.63 22.5,6"
      />
      <path
        d="m 20,8 5,0"
      />
      <path
        d="m 22.5,25 c 0,0 4.5,-7.5 3,-10.5 0,0 -1,-2.5 -3,-2.5 -2,0 -3,2.5 -3,2.5 -1.5,3 3,10.5 3,10.5"
      />
      <path
        d="m 11.5,37 c 5.5,3.5 15.5,3.5 21,0 l 0,-7 c 0,0 9,-4.5 6,-10.5 -4,-6.5 -13.5,-3.5 -16,4 l 0,3.5 0,-3.5 C 19,16 9.5,13 6.5,19.5 c -3,6 5,10 5,10 l 0,7.5 z"
      />
      <path
        d="M 11.5,30 C 17,27 27,27 32.5,30"
      />
      <path
        d="m 11.5,33.5 c 5.5,-3 15.5,-3 21,0"
      />
      <path
        d="M 11.5,37 C 17,34 27,34 32.5,37"
      />
    </g>
  </svg>
);

WhiteKing.displayName = displayName;

export default WhiteKing;
