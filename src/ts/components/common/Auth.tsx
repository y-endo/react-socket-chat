import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin, setSessionId, setUserName } from '~/ts/modules/App';
import { StoreState } from '~/ts/store';
import validateSessionId from '~/ts/utils/validateSessionId';

const Auth: React.FC = ({ children }) => {
  const isLogin = useSelector<StoreState, StoreState['app']['isLogin']>(state => state.app.isLogin);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.app.sessionId && window.app.userName && !isLogin) {
      // sessionIdとuserNameが正当なものか確認
      validateSessionId({
        sessionId: window.app.sessionId,
        userName: window.app.userName
      })
        .then(res => res.json())
        .then(data => {
          // 正当なら画面表示、不正等ならログイン画面へ飛ばす
          if (data.result) {
            dispatch(setIsLogin(true));
            dispatch(setSessionId(window.app.sessionId));
            dispatch(setUserName(window.app.userName));
          } else {
            dispatch(setIsLogin(false));
          }
        });
    }
  }, [window.app.sessionId, window.app.userName]);

  if (isLogin) {
    return <>{children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Auth;
