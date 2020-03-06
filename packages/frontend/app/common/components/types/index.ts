import { ReactElementLike, ReactNodeArray } from 'prop-types';

export type Children = string | number | boolean | {} | ReactElementLike | ReactNodeArray;
export type FuncProp = () => void;
