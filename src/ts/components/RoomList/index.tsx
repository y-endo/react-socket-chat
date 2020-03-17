import * as React from 'react';
import { Room } from '~/graphql/schema';

import Item from './parts/Item';

type Props = {
  rooms: Room[];
};

const RoomList: React.FC<Props> = ({ rooms }) => {
  const items = rooms.map(room => {
    return <Item key={room.id} data={room} />;
  });

  return <ul>{items}</ul>;
};

export default RoomList;
