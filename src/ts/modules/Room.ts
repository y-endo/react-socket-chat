import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export type RoomState = {
  members: string[];
};

/**
 * ActionType
 */
const ADD_MEMBER = 'ADD_MEMBER';

/**
 * Actions
 */
export const addMember = actionCreator<string>(ADD_MEMBER);

/**
 * State
 */
const initialState: RoomState = {
  members: []
};

/**
 * Reducer
 */
const reducer = reducerWithInitialState(initialState).case(addMember, (state, payload) => {
  return { ...state, members: state.members.concat(payload) };
});

export default reducer;
