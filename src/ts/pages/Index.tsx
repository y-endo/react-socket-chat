import * as React from 'react';
import gql from 'graphql-tag';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { useTransition, animated } from 'react-spring';
import queryRooms from '~/graphql/queries/rooms.graphql';
import { withRouter, RouteComponentProps } from 'react-router';
import Layout from '~/ts/layouts/default';
import RoomList from '~/ts/components/RoomList';
import Modal from '~/ts/components/Modal';
import CreateRoomForm from '~/ts/components/CreateRoomForm';
import { StoreState } from '~/ts/store';

type Props = RouteComponentProps;

const Index: React.FC<Props> = ({ history }) => {
  const socket = useSelector<StoreState, StoreState['app']['socket']>(state => state.app.socket);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const transition = useTransition(isModalOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });
  const { loading, error, data } = useQuery(
    gql`
      ${queryRooms}
    `
  );

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const addRoomComplete = React.useCallback((roomId: string) => {
    history.push(`/room/${roomId}`);
  }, []);

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
        <>
          {transition.map(
            ({ item, key, props }) =>
              item && (
                <animated.div style={props} key={key}>
                  <Modal content={<CreateRoomForm addRoomComplete={addRoomComplete} />} closeModal={closeModal} />
                </animated.div>
              )
          )}
        </>
      </>
    );
    return <Layout content={content} />;
  }

  return <></>;
};

export default withRouter(Index);
