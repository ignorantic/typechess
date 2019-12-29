import React, { ComponentType } from 'react';

const displayName = 'BlackKnightComponents';

const BlackKnight: ComponentType = () => (
  <svg height="100%" width="100%" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
    <g>
      <g
        fill="#000000"
        stroke="#000000"
      >
        <path
          d="m 22,10 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21"
        />
        <path
          d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-3.04 0,-3 -1,0 0.19,1.23 -1,2 -1,0 -4.003,1 -4,-4 0,-2 6,-12 6,-12 0,0 1.89,-1.9 2,-3.5 -0.73,-0.994 -0.5,-2 -0.5,-3 1,-1 3,2.5 3,2.5 l 2,0 c 0,0 0.78,-1.992 2.5,-3 1,0 1,3 1,3"
        />
      </g>
      <g stroke="#ffffff">
        <path
          d="m 9.5,25.5 a 0.5,0.5 0 0 1 -1,0 0.5,0.5 0 1 1 1,0 z"
        />
        <path
          d="m 14.933,15.75 a 0.499989,1.499967 30.000728 0 1 -0.866,-0.5 0.499989,1.499967 30.000728 0 1 0.866,0.5 z"
        />
      </g>
      <g fill="#ffffff">
        <path
          d="M 24.55,10.4 24.1,11.85 24.6,12 c 3.15,1 5.65,2.49 7.9,6.75 2.25,4.26 3.25,10.31 2.75,20.25 l -0.05,0.5 2.25,0 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 31.88,13.17 28.46,11.02 25.06,10.5 l -0.51,-0.1 z"
        />
      </g>
    </g>
  </svg>
);

BlackKnight.displayName = displayName;

export default BlackKnight;
