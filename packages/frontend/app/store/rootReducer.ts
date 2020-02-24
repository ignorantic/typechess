import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../core/auth/index';
import game from './reducers/game/reducer';

export default combineReducers({
  auth,
  game,
});
