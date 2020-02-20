import * as React from 'react';
import css from '~/scss/components/AppHeader.scss';

const AppHeader: React.FC = () => {
  return (
    <>
      <header className={css.locals['header']}>ヘッダー</header>
      <style>{css.toString()}</style>
    </>
  );
};

export default AppHeader;
