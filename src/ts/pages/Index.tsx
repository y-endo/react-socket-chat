import * as React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import queryRooms from '~/graphql/queries/rooms.graphql';
import Layout from '~/ts/layouts/default';
import RoomList from '~/ts/components/RoomList';
import Modal from '~/ts/components/Modal';

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { loading, error, data } = useQuery(
    gql`
      ${queryRooms}
    `
  );

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  if (loading) {
    return <Layout content={<div>読込中...</div>} />;
  }
  if (error) {
    return <Layout content={<div>エラーが発生しました。</div>} />;
  }
  if (data) {
    const content = (
      <>
        <button onClick={handleButtonClick}>チャットルーム作成</button>
        <RoomList rooms={data.rooms} />
        {isModalOpen && <Modal closeModal={closeModal} />}
      </>
    );
    return <Layout content={content} />;
  }

  return <></>;
};

export default Index;
