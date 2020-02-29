import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../core/auth/index';
import { reducer as resources } from '../../lib/redux-resource';
import game from './reducers/game/reducer';

export default combineReducers({
  auth,
  resources,
  game,
});
