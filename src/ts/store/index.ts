import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import roomReducer, { RoomState } from '~/ts/modules/Room';
import appReducer, { AppState } from '~/ts/modules/App';

export type StoreState = {
  app: AppState;
  room: RoomState;
};

const reducers = combineReducers({
  app: appReducer,
  room: roomReducer
});

export default createStore(reducers, applyMiddleware(createLogger({ diff: true, collapsed: true })));
