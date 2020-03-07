import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { StoreState } from '~/ts/store';
import Layout from '~/ts/layouts/default';
import LoginForm from '~/ts/components/LoginForm';

const Login: React.FC = () => {
  const isLogin = useSelector<StoreState, StoreState['app']['isLogin']>(state => state.app.isLogin);
  const content = isLogin ? <Redirect to="/" /> : <LoginForm />;

  return <Layout content={content} />;
};

export default Login;
