import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import queryRooms from '~/graphql/queries/rooms.graphql';
import Layout from '~/ts/layouts/default';
import RoomList from '~/ts/components/RoomList';

const Index: React.FC = () => {
  const { loading, error, data } = useQuery(
    gql`
      ${queryRooms}
    `
  );
  const content = <RoomList />;

  console.log(loading, error, data);

  return <Layout content={content} />;
};

export default Index;
