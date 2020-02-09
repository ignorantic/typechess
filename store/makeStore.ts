import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';
import rootSaga from './rootSaga';

interface Game {
  readonly board: object;
}

export interface ApplicationState {
  readonly auth: object;
  readonly game: Game;
}

function makeStore(preloadedState: ApplicationState): Store {
  const saga = createSagaMiddleware();
  const middleware = [saga, thunk, logger];
  const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [],
  });

  saga.run(rootSaga);
  return store;
}

export default makeStore;
