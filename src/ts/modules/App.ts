import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { actionCreatorFactory } from 'typescript-fsa';
const actionCreator = actionCreatorFactory();

export type AppState = {
  isLogin: boolean;
  sessionId: string;
  userName: string;
  socket: SocketIOClient.Socket | null;
};

/**
 * ActionType
 */
const SET_IS_LOGIN = 'SET_IS_LOGIN';
const SET_SESSION_ID = 'SET_SESSION_ID';
const SET_USER_NAME = 'SET_USER_NAME';
const SET_SOCKET = 'SET_SOCKET';

/**
 * Actions
 */
export const setIsLogin = actionCreator<AppState['isLogin']>(SET_IS_LOGIN);
export const setSessionId = actionCreator<AppState['sessionId']>(SET_SESSION_ID);
export const setUserName = actionCreator<AppState['userName']>(SET_USER_NAME);
export const setSocket = actionCreator<AppState['socket']>(SET_SOCKET);

/**
 * State
 */
const initialState: AppState = {
  isLogin: false,
  sessionId: '',
  userName: '',
  socket: null
};

/**
 * Reducer
 */
const reducer = reducerWithInitialState(initialState)
  .case(setIsLogin, (state, payload) => {
    return { ...state, isLogin: payload };
  })
  .case(setSessionId, (state, payload) => {
    return { ...state, sessionId: payload };
  })
  .case(setUserName, (state, payload) => {
    return { ...state, userName: payload };
  })
  .case(setSocket, (state, payload) => {
    return { ...state, socket: payload };
  });

export default reducer;
