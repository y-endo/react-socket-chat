import * as React from 'react';
import css from '~/scss/components/AppHeader.scss';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '~/ts/store';

const AppHeader: React.FC = () => {
  const isLogin = useSelector<StoreState, StoreState['app']['isLogin']>(state => state.app.isLogin);

  return (
    <header className={css['header']}>
      <p>ヘッダー</p>
      {isLogin && <a href="/logout">ログアウト</a>}
    </header>
  );
};

export default AppHeader;
