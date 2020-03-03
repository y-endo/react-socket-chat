import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '~/ts/layouts/default';
import LoginForm from '~/ts/components/LoginForm';

const Login: React.FC = () => {
  const content = window.app.sessionId ? <Redirect to="/" /> : <LoginForm />;

  return <Layout content={content} />;
};

export default Login;
