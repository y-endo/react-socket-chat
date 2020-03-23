import * as React from 'react';
import css from '~/scss/components/App/AppHeader.scss';
import { useSelector } from 'react-redux';
import { StoreState } from '~/ts/store';
import Button from '~/ts/elements/Button';

const AppHeader: React.FC = () => {
  const isLogin = useSelector<StoreState, StoreState['app']['isLogin']>(state => state.app.isLogin);

  return (
    <header className={css['header']}>
      <p className={css['title']}>Chat</p>
      <div className={css['logout-button']}>
        {isLogin && (
          <Button isAnchor={true} anchorAttributes={{ href: '/logout' }}>
            ログアウト
          </Button>
        )}
      </div>
    </header>
  );
};

export default AppHeader;
