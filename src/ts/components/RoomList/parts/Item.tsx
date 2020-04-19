import * as React from 'react';
import css from '~/scss/components/RoomList/index.scss';
import { Link } from 'react-router-dom';
import { Room } from '~/graphql/schema';

type Props = {
  data: Room;
};

const RoomList: React.FC<Props> = ({ data }) => {
  return (
    <li className={css['room-list__item']}>
      <Link to={`/room/${data.id}`} className={css['room-list__link']}>
        <p className={css['room-list__title']}>RoomName {data.name}</p>
      </Link>
    </li>
  );
};

export default RoomList;
