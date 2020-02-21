import * as React from 'react';
import css from '~/scss/pages.scss';

import Layout from '~/ts/layouts/index';
import ChatRoom from '~/ts/containers/ChatRoom';

const Index: React.FC = () => {
  const content = (
    <div className={css['page']}>
      <div className={css['page__inner']}>
        <ChatRoom />
      </div>
    </div>
  );

  return <Layout content={content} />;
};

export default Index;
