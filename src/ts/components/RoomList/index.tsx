import * as React from 'react';
import { Link } from 'react-router-dom';

const RoomList: React.FC = () => {
  const list = [];
  for (let i = 1; i <= 10; i++) {
    list.push(
      <li key={`room_${i}`}>
        <Link to={`/room/${i}`}>{`RoomName ${i}`}</Link>
      </li>
    );
  }

  return <ul>{list}</ul>;
};

export default RoomList;
