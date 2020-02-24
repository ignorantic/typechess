import { createSelector } from '@reduxjs/toolkit';
import { identity, pathOr } from 'ramda';

// eslint-disable-next-line import/prefer-default-export
export const selectPosition = createSelector(
  pathOr([], ['game', 'board']),
  identity,
);
