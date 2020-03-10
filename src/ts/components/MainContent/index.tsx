import * as React from 'react';
import css from '~/scss/components/MainContent/index.scss';

const MainContent: React.FC = ({ children }) => (
  <div className={css['content']}>
    <div className={css['content__inner']}>{children}</div>
  </div>
);

export default MainContent;
