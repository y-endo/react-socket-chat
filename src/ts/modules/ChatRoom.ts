import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';

export interface ChatRoomState {
  socket: SocketIOClient.Socket | null;
}

const actionCreator = actionCreatorFactory();

/**
 * ActionType
 */
const SET_SOCKET = 'SET_SOCKET';

/**
 * Actions
 */
export const setSocket = actionCreator<SocketIOClient.Socket>(SET_SOCKET);

/**
 * State
 */
const initialState: ChatRoomState = {
  socket: null
};

const reducer = reducerWithInitialState(initialState).case(setSocket, (state, payload) => {
  return { ...state, socket: payload };
});

export default reducer;
