import { combineReducers } from '@reduxjs/toolkit';
import auth from '../../core/auth/index';
import resources from '../../lib/redux-resource/reducer/resource';
import game from './reducers/game/reducer';

export default combineReducers({
  auth,
  game,
  resources,
});
