import * as React from 'react';
import css from '~/scss/components/AppHeader.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin } from '~/ts/modules/App';
import { StoreState } from '~/ts/store';

const AppHeader: React.FC = () => {
  const isLogin = useSelector<StoreState, StoreState['app']['isLogin']>(state => state.app.isLogin);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setIsLogin(false));
  };

  return (
    <header className={css['header']}>
      <p>ヘッダー</p>
      {isLogin && <button onClick={handleClick}>ログアウト</button>}
    </header>
  );
};

export default AppHeader;
