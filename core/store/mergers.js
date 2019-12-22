import { concat, map } from 'ramda';

/**
 * Merge payload with state for request action
 *
 * @param state
 * @returns {{loading: boolean}}
 */
export const request = state => ({
  ...state,
  loading: true,
});

/**
 * Merge payload with state for failure action
 *
 * @param state
 * @param payload
 * @returns {{loading: boolean, error: *}}
 */
export const failure = (state, payload) => ({
  ...state,
  loading: false,
  error: payload,
});

/**
 * Merge payload with state for success action
 *
 * @param state
 * @param payload
 */
export const success = (state, payload) => ({
  ...state,
  ...payload,
  loading: false,
  error: null,
});

/**
 * Merge payload with state for update one success action
 *
 * @param state
 * @param payload
 * @return {{data: *, loading: boolean, error: null}}
 */
export const updateSuccess = (state, payload) => {
  const { data } = state;
  const { id: currentId } = payload;
  const newData = map(item => {
    const { id } = item;
    const isCurrentElem = (currentId === id);
    return isCurrentElem ? payload : item;
  }, data);

  return {
    ...state,
    data: newData,
    loading: false,
    error: null,
  };
};

/**
 * Merge payload with state for create success action
 *
 * @param state
 * @param payload
 */
export const createSuccess = (state, payload) => {
  const { data } = state;
  return {
    ...state,
    data: concat(data, [payload]),
    loading: false,
    error: null,
  };
};
