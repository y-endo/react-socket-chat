import * as React from 'react';
import { Redirect } from 'react-router-dom';

const Auth: React.FC = ({ children }) => {
  return window.sessionId ? <>{children}</> : <Redirect to="/login" />;
};

export default Auth;
