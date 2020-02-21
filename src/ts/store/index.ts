import { createStore, applyMiddleware, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';

import chatRoomReducer, { ChatRoomState } from '~/ts/modules/ChatRoom';

export interface StoreState {
  chatRoom: ChatRoomState;
}

const reducers = combineReducers({
  chatRoom: chatRoomReducer
});

export default createStore(reducers, applyMiddleware(createLogger({ diff: true, collapsed: true })));
