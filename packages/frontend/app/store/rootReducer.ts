import { combineReducers } from '@reduxjs/toolkit';
import { reducer as resources } from 'redux-resourcify';
import auth from '../../core/auth/index';
import game from './reducers/game/reducer';

export default combineReducers({
  auth,
  resources,
  game,
});
