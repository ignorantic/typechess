import React, { ComponentType } from 'react';

const displayName = 'BlackRookComponents';

const BlackRook: ComponentType = () => (
  <svg height="100%" width="100%" viewBox="0 0 45 45" preserveAspectRatio="xMidYMid meet">
    <g
      fill="#000000"
      stroke="#000000"
    >
      <path
        d="m 9,39 27,0 0,-3 -27,0 0,3 z"
      />
      <path
        d="m 12.5,32 1.5,-2.5 17,0 1.5,2.5 -20,0 z"
      />
      <path
        d="m 12,36 0,-4 21,0 0,4 -21,0 z"
      />
      <path
        d="m 14,29.5 0,-13 17,0 0,13 -17,0 z"
      />
      <path
        d="m 14,16.5 -3,-2.5 23,0 -3,2.5 -17,0 z"
      />
      <path
        d="m 11,14 0,-5 4,0 0,2 5,0 0,-2 5,0 0,2 5,0 0,-2 4,0 0,5 -23,0 z"
      />
      <g stroke="#ffffff">
        <path
          d="m 12,35.5 21,0 0,0"
        />
        <path
          d="m 13,31.5 19,0"
        />
        <path
          d="m 14,29.5 17,0"
        />
        <path
          d="m 14,16.5 17,0"
        />
        <path
          d="m 11,14 23,0"
        />
      </g>
    </g>
  </svg>
);

BlackRook.displayName = displayName;

export default BlackRook;
