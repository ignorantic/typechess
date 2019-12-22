import { mergeRight, reduce, toUpper } from 'ramda';
import {
  REQUEST, SUCCESS, FAILURE,
} from './const';
import makeActionType from './makeActionType';

const createActionTypes = (entity, actions) => {
  const ENTITY = toUpper(entity);

  const writeActionType = makeActionType(ENTITY);

  const mergeActionTypes = (acc, action) => {
    const types = {
      [writeActionType(action, null)]: writeActionType(action, null),
      [writeActionType(action, REQUEST)]: writeActionType(action, REQUEST),
      [writeActionType(action, SUCCESS)]: writeActionType(action, SUCCESS),
      [writeActionType(action, FAILURE)]: writeActionType(action, FAILURE),
    };

    return mergeRight(acc, types);
  };

  return reduce(mergeActionTypes, { ENTITY }, actions);
};

export default createActionTypes;
