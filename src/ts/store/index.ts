import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

// import chatRoomReducer, { ChatRoomState } from '~/ts/modules/ChatRoom';
import appReducer, { AppState } from '~/ts/modules/App';

export type StoreState = {
  app: AppState;
  // chatRoom: ChatRoomState;
};

const reducers = combineReducers({
  app: appReducer
  // chatRoom: chatRoomReducer
});

export default createStore(reducers, applyMiddleware(createLogger({ diff: true, collapsed: true })));
