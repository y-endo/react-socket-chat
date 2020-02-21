import * as React from 'react';
import css from '~/scss/components/AppHeader.scss';

const AppHeader: React.FC = () => {
  return (
    <>
      <header className={css['header']}>ヘッダー</header>
    </>
  );
};

export default AppHeader;
