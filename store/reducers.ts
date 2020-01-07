import { combineReducers } from 'redux';
import auth from '../core/auth';
import game from './reducers/game/game';

export default combineReducers({
  auth,
  game,
});
