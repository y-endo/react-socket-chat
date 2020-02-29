import * as React from 'react';

import Layout from '~/ts/layouts/default';
import RoomList from '~/ts/components/RoomList';

const Index: React.FC = () => {
  const content = <RoomList />;

  return <Layout content={content} />;
};

export default Index;
