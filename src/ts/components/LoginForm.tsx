import * as React from 'react';
import css from '~/scss/components/LoginForm.scss';

const LoginForm: React.FC = () => {
  return (
    <form method="post" className={css['form']}>
      <input type="text" name="name" placeholder="ユーザー名" className={css['input']} />
      <button className={css['button']}>ログイン</button>
    </form>
  );
};

export default LoginForm;
