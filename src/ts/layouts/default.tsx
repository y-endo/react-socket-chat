import * as React from 'react';

import AppHeader from '~/ts/components/common/AppHeader';
import AppFooter from '~/ts/components/common/AppFooter';
import MainContent from '~/ts/components/common/MainContent';

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
