import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import rootSaga from './rootSaga';

interface Game {
  readonly board: object;
}

export interface ApplicationState {
  readonly auth: object;
  readonly game: Game;
}

function makeStore(initialState: ApplicationState): Store {
  const saga = createSagaMiddleware();
  const middleWares = [saga, thunk];

  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWares)),
  );

  saga.run(rootSaga);
  return store;
}

export default makeStore;
