import * as React from 'react';

import AppHeader from '~/ts/components/AppHeader';
import AppFooter from '~/ts/components/AppFooter';

type Props = {
  content: JSX.Element;
};

const Layout: React.FC<Props> = ({ content }) => {
  return (
    <div>
      <AppHeader />
      <main>{content}</main>
      <AppFooter />
    </div>
  );
};

export default Layout;
