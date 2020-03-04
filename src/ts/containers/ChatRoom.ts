import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setSocket } from '~/ts/modules/ChatRoom';
import { StoreState } from '~/ts/store';

import ChatRoom from '~/ts/components/ChatRoom';

const mapStateToProps = (state: StoreState) => {
  return {
    chatRoom: state.chatRoom
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSocket: (value: SocketIOClient.Socket) => dispatch(setSocket(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
