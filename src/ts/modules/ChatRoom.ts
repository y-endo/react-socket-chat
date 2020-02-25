import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';

export interface ChatRoomState {
  roomId: number;
  messages: string[];
}

const actionCreator = actionCreatorFactory();

/**
 * ActionType
 */
const SET_ROOM_ID = 'SET_ROOM_ID';
const ADD_MESSAGE = 'ADD_MESSAGE';

/**
 * Actions
 */
export const setRoomId = actionCreator<number>(SET_ROOM_ID);
export const addMessage = actionCreator<string>(ADD_MESSAGE);

/**
 * State
 */
const initialState: ChatRoomState = {
  roomId: -1,
  messages: []
};

const reducer = reducerWithInitialState(initialState)
  .case(setRoomId, (state, payload) => {
    return { ...state, roomId: payload };
  })
  .case(addMessage, (state, payload) => {
    return { ...state, messages: state.messages.concat(payload) };
  });

export default reducer;
