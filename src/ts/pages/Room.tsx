import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StoreState } from '~/ts/store';
import Layout from '~/ts/layouts/default';
import ChatRoom from '~/ts/components/ChatRoom';
import { useSelector } from 'react-redux';
import validateSessionId from '~/ts/utils/validateSessionId';

type Props = {} & RouteComponentProps<{ id: string }>;

const Room: React.FC<Props> = ({ match }) => {
  const [contentType, setContentType] = React.useState('loading');
  const sessionId = useSelector<StoreState, string>(state => state.app.sessionId);
  const userName = useSelector<StoreState, string>(state => state.app.userName);

  let content = <></>;
  if (contentType === 'loading') {
    content = (
      <div>
        <h1>読込中</h1>
      </div>
    );
  } else if (contentType === 'loaded') {
    content = (
      <div>
        <h1>Room {match.params.id}</h1>
        <ChatRoom roomId={match.params.id} />
      </div>
    );
  } else if (contentType === 'error') {
    content = (
      <div>
        <h1>エラーが発生しました。</h1>
      </div>
    );
  }

  React.useEffect(() => {
    // AppStateのsessionIdとuserNameが正当なものか確認
    validateSessionId({
      sessionId,
      userName
    })
      .then(res => res.json())
      .then(data => {
        // 正当ならチャット表示、不正等ならエラー画面
        if (data.result) {
          setContentType('loaded');
        } else {
          setContentType('error');
        }
      });
  }, []);

  return <Layout content={content} />;
};

export default Room;
