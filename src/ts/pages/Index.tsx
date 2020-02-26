import * as React from 'react';
import { Redirect } from 'react-router-dom';
import css from '~/scss/pages.scss';

import Layout from '~/ts/layouts/index';
import ChatRoom from '~/ts/containers/ChatRoom';

declare global {
  interface Window {
    session_id: string;
  }
}

const Index: React.FC = () => {
  const content = window.session_id ? (
    <div className={css['page']}>
      <div className={css['page__inner']}>
        <ChatRoom />
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );

  return <Layout content={content} />;
};

export default Index;
