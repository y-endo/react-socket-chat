import * as React from 'react';

import AppHeader from '~/ts/components/App/AppHeader';
import MainContent from '~/ts/components/MainContent';

type Props = {
  content: JSX.Element;
};

const Layout: React.FC<Props> = ({ content }) => {
  return (
    <>
      <AppHeader />
      <MainContent>{content}</MainContent>
    </>
  );
};

export default Layout;
