import reducer from './store/reducer';

import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
} from './store/action-types';

export const actions = {
  LOGIN_SUCCESS: AUTH_LOGIN_SUCCESS,
  LOGIN_FAILURE: AUTH_LOGIN_FAILURE,
  LOGOUT_SUCCESS: AUTH_LOGOUT_SUCCESS,
  LOGOUT_FAILURE: AUTH_LOGOUT_FAILURE,
};

export {
  login,
  logout,
  reset,
  authorize,
  authCheck as checkAuthorization,
} from './store/actions';

export {
  selectAuth,
  selectAuthorized,
  selectCompanyAdmin,
  selectAuthError,
  selectAuthLoading,
} from './store/reducer';

export default reducer;
