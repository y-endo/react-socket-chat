import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export interface Message {
  name: string;
  message: string;
  date: string;
}

export interface ChatRoomState {
  messages: Message[];
}

/**
 * ActionType
 */
const ADD_MESSAGES = 'ADD_MESSAGES';
const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

/**
 * Actions
 */
export const addMessages = actionCreator<ChatRoomState['messages']>(ADD_MESSAGES);
export const clearMessages = actionCreator(CLEAR_MESSAGES);

/**
 * State
 */
const initialState: ChatRoomState = {
  messages: []
};

/**
 * Reducer
 */
const reducer = reducerWithInitialState(initialState)
  .case(addMessages, (state, payload) => {
    return { ...state, messages: state.messages.concat(payload) };
  })
  .case(clearMessages, state => {
    return { ...state, messages: [] };
  });

export default reducer;
