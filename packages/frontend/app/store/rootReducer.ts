import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../core/auth/index';
import admin from '../../lib/typecore/reducer/admin';
import game from './reducers/game/reducer';

export default combineReducers({
  auth,
  game,
  admin,
});
