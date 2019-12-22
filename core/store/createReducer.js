// import libs
import {
  concat,
  find,
  is,
  map,
  mergeRight,
} from 'ramda';

import {
  request,
  success,
  createSuccess,
  updateSuccess,
  failure,
} from './mergers';

// import helpers
import createActionTypes from './createActionTypes';
import makeActionCreators from './makeActionCreators';
import {
  CREATE,
  GET_LIST,
  GET_ONE,
  GET_SINGLE,
  UPDATE,
  UPDATE_SINGLE,
  REQUEST,
  SUCCESS,
  FAILURE,
} from './const';
import makeActionType from './makeActionType';

const defaultActions = [
  {
    type: GET_SINGLE,
    request,
    success,
    failure,
  },
  {
    type: GET_LIST,
    request,
    success,
    failure,
  },
  {
    type: GET_ONE,
    request,
    success,
    failure,
  },
  {
    type: UPDATE_SINGLE,
    request,
    success,
    failure,
  },
  {
    type: UPDATE,
    request,
    success: updateSuccess,
    failure,
  },
  {
    type: CREATE,
    request,
    success: createSuccess,
    failure,
  },
];

const defaultOptions = {
  root: 'data',
  meta: 'meta',
  defaultActions,
  customActions: [],
};

const createReducer = options => {
  const appliedOptions = {
    ...defaultOptions,
    ...options,
  };

  const {
    entity,
    initialState,
    defaultActions,
    customActions,
  } = appliedOptions;

  const actions = concat(defaultActions, customActions);
  const types = map(action => action.type, actions);
  const actionTypes = createActionTypes(entity, types);
  const actionCreators = makeActionCreators(entity, types);

  const { ENTITY } = actionTypes;

  const writeActionType = makeActionType(ENTITY);

  const reducer = (state = initialState, { type, payload = null }) => {
    const requestAction = find(action => writeActionType(action.type, REQUEST) === type, actions);
    if (requestAction) {
      if (is(Function, requestAction.request)) {
        return requestAction.request(state, payload);
      }

      return request(state);
    }

    const successAction = find(action => writeActionType(action.type, SUCCESS) === type, actions);
    if (successAction) {
      if (is(Function, successAction.success)) {
        return successAction.success(state, payload);
      }

      return success(state, payload);
    }

    const failureAction = find(action => writeActionType(action.type, FAILURE) === type, actions);
    if (failureAction) {
      if (is(Function, failureAction.failure)) {
        return mergeRight(state, failureAction.failure(state, payload));
      }

      return failure(state, payload);
    }

    return state;
  };

  return {
    ...actionTypes,
    ...actionCreators,
    reducer,
  };
};

export default createReducer;
