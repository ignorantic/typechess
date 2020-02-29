import {
  REGISTER_RESOURCE,
  RegisterResourceAction,
  UNREGISTER_RESOURCE,
  UnregisterResourceAction,
} from '../../actions';

import data from './data';
import list from './list';

const initialState = {};

type ActionTypes =
  | RegisterResourceAction
  | UnregisterResourceAction
  | { type: 'OTHER_ACTION'; payload?: any; meta?: { resource?: string } };

export default (previousState = initialState, action: ActionTypes) => {
  if (action.type === REGISTER_RESOURCE) {
    const resourceState = {
      props: action.payload,
      data: data(undefined, action),
      list: list(undefined, action),
    };
    return {
      ...previousState,
      [action.payload.name]: resourceState,
    };
  }

  if (action.type === UNREGISTER_RESOURCE) {
    return Object.keys(previousState).reduce((acc, key) => {
      if (key === action.payload) {
        return acc;
      }

      // @ts-ignore
      return { ...acc, [key]: previousState[key] };
    }, {});
  }

  if (!action.meta || !action.meta.resource) {
    return previousState;
  }

  const resources = Object.keys(previousState);
  // @ts-ignore
  const newState = resources.reduce(
    (acc, resource) => ({
      ...acc,
      [resource]:
      // @ts-ignore
        action.meta.resource === resource
          ? {
            // @ts-ignore
            props: previousState[resource].props,
            // @ts-ignore
            data: data(previousState[resource].data, action),
            // @ts-ignore
            list: list(previousState[resource].list, action),
          }
          // @ts-ignore
          : previousState[resource],
    }),
    {}
  );

  return newState;
};
