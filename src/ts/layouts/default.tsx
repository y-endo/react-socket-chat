import * as React from 'react';

import AppHeader from '~/ts/components/App/AppHeader';
import AppFooter from '~/ts/components/App/AppFooter';
import MainContent from '~/ts/components/MainContent';

type Props = {
  content: JSX.Element;
};

const Layout: React.FC<Props> = ({ content }) => {
  return (
    <>
      <AppHeader />
      <MainContent>{content}</MainContent>
      <AppFooter />
    </>
  );
};

export default Layout;
