import React, { ComponentType } from 'react';

const displayName = 'WhiteQueenComponents';

const BlackQueen: ComponentType = () => (
  <svg height="100%" width="100%" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
    <g
      fill="#000000"
      stroke="#000000"
    >
      <g
        fill="#000000"
      >
        <circle
          cx="6"
          cy="12"
          r="2.75"
        />
        <circle
          cx="14"
          cy="9"
          r="2.75"
        />
        <circle
          cx="22.5"
          cy="8"
          r="2.75"
        />
        <circle
          cx="31"
          cy="9"
          r="2.75"
        />
        <circle
          cx="39"
          cy="12"
          r="2.75"
        />
      </g>
      <path
        d="m 9,26 c 8.5,-1.5 21,-1.5 27,0 L 38.5,13.5 31,25 30.7,10.9 25.5,24.5 22.5,10 19.5,24.5 14.3,10.9 14,25 6.5,13.5 9,26 Z"
        stroke="#000000"
      />
      <path
        d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0,-2.5 0,0 0.5,-1.5 -1,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z"
        stroke="#000000"
      />
      <path
        d="m 11,38.5 a 35,35 0 0 0 23,0"
        stroke="#000000"
      />
      <path
        d="m 11,29 a 35,35 0 0 1 23,0"
        stroke="#ffffff"
      />
      <path
        d="m 12.5,31.5 20,0"
        stroke="#ffffff"
      />
      <path
        d="m 11.5,34.5 a 35,35 0 0 0 22,0"
        stroke="#ffffff"
      />
      <path
        d="m 10.5,37.5 a 35,35 0 0 0 24,0"
        stroke="#ffffff"
      />
    </g>
  </svg>
);

BlackQueen.displayName = displayName;

export default BlackQueen;
