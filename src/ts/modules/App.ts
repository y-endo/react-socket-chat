import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';

export interface AppState {
  sessionId: string;
  userName: string;
}

const actionCreator = actionCreatorFactory();

/**
 * ActionType
 */
const SET_SESSION_ID = 'SET_SESSION_ID';
const SET_USER_NAME = 'SET_USER_NAME';

/**
 * Actions
 */
export const setSessionId = actionCreator<AppState['sessionId']>(SET_SESSION_ID);
export const setUserName = actionCreator<AppState['userName']>(SET_USER_NAME);

/**
 * State
 */
const initialState: AppState = {
  sessionId: '',
  userName: ''
};

/**
 * Reducer
 */
const reducer = reducerWithInitialState(initialState)
  .case(setSessionId, (state, payload) => {
    return { ...state, sessionId: payload };
  })
  .case(setUserName, (state, payload) => {
    return { ...state, userName: payload };
  });

export default reducer;
