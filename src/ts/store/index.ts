import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import appReducer, { AppState } from '~/ts/modules/App';

export type StoreState = {
  app: AppState;
};

const reducers = combineReducers({
  app: appReducer
});

export default createStore(reducers, applyMiddleware(createLogger({ diff: true, collapsed: true })));
