import * as React from 'react';

import Layout from '~/ts/layouts/index';

const Index: React.FC = () => {
  const content = (
    <div>
      <h1>TOPページ</h1>
    </div>
  );

  return <Layout content={content} />;
};

export default Index;
