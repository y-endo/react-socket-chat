import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Layout from '~/ts/layouts/default';
import RoomList from '~/ts/components/RoomList';

declare global {
  interface Window {
    sessionId: string;
  }
}

const Index: React.FC = () => {
  const content = window.sessionId ? <RoomList /> : <Redirect to="/login" />;

  return <Layout content={content} />;
};

export default Index;
