import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './rootReducer';
import makeRootSaga from './makeRootSaga';
import dataProvider from '../../data-provider';

export interface ApplicationState {
  readonly auth: object;
  readonly game: object;
}

function makeStore(preloadedState: ApplicationState): Store {
  const saga = createSagaMiddleware();
  const middleware = [
    saga,
    thunk,
    logger,
  ];
  const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [],
  });

  const rootSaga = makeRootSaga(dataProvider);

  saga.run(rootSaga);
  return store;
}

export default makeStore;
