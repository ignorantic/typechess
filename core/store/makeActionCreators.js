import {
  mergeRight,
  reduce,
  toLower,
  toUpper,
} from 'ramda';
import { toCamel } from '../helpers/strings';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
} from './const';
import makeActionType from './makeActionType';

const makeActionCreators = (entity, actions) => {
  const ENTITY = toUpper(entity);

  const writeActionType = makeActionType(ENTITY);

  const mergeActionTypes = (acc, action) => {
    const getActionCreatorName = suffix => toCamel(toLower(`${action}_${suffix}`));
    const actionCreators = {
      [toCamel(toLower(action))]: payload => ({
        type: writeActionType(action, null),
        payload,
      }),
      [getActionCreatorName(REQUEST)]: payload => ({
        type: writeActionType(action, REQUEST),
        payload,
      }),
      [getActionCreatorName(SUCCESS)]: payload => ({
        type: writeActionType(action, SUCCESS),
        payload,
      }),
      [getActionCreatorName(FAILURE)]: payload => ({
        type: writeActionType(action, FAILURE),
        payload,
      }),
    };

    return mergeRight(acc, actionCreators);
  };

  return reduce(mergeActionTypes, {}, actions);
};

export default makeActionCreators;
