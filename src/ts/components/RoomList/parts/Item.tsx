import * as React from 'react';
import { Link } from 'react-router-dom';
import { Room } from '~/graphql/schema';

type Props = {
  data: Room;
};

const RoomList: React.FC<Props> = ({ data }) => {
  return (
    <li>
      <Link to={`/room/${data.id}`}>
        <p>RoomName {data.name}</p>
        <p>member {data.count}</p>
      </Link>
    </li>
  );
};

export default RoomList;
