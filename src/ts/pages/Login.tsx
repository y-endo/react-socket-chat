import * as React from 'react';
import { Redirect } from 'react-router-dom';

const Login: React.FC = () => {
  return window.session_id ? (
    <Redirect to="/" />
  ) : (
    <div>
      <form method="post">
        <input type="text" name="name" />
        <button>ログイン</button>
      </form>
    </div>
  );
};

export default Login;
