import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSessionId, setUserName } from '~/ts/modules/App';

const Auth: React.FC = ({ children }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (window.app.sessionId) {
      dispatch(setSessionId(window.app.sessionId));
      dispatch(setUserName(window.app.userName));
    }
  }, [window.app.sessionId, window.app.userName]);

  if (window.app.sessionId) {
    return <>{children}</>;
  } else {
    return <Redirect to="/login" />;
  }
};

export default Auth;
