import * as React from 'react';
import Layout from '~/ts/layouts/default';
import LoginForm from '~/ts/components/LoginForm';

const Login: React.FC = () => {
  // sessionId, userNameが残ってたらログアウト処理を挟む
  if (window.app.sessionId || window.app.userName) {
    location.assign('/logout');
  }

  const content = <LoginForm />;

  return <Layout content={content} />;
};

export default Login;
