import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';
import UserInterface from 'src/interfaces/UserInterface';
import {
  ChannelList,
  ChannelListMessengerProps,
  ChannelListProps,
  useChannelStateContext,
} from 'stream-chat-react';
import styled from 'styled-components';
import ChannelListItemPreview from './ChannelListItemPreview';

const Container = styled.div`
  h2 {
    color: white;
    margin: 0 0 10px;
  }

  .str-chat.str-chat-channel-list {
    float: none;
  }

  .channel-list {
    background-color: #333333;
    width: 100%;
    &__message {
      color: white;
    }
  }
`;

const ListContainer = (props: any) => {
  const { loading, children } = props;

  if (loading)
    return (
      <div className="channel-list">
        <p className="channel-list__message">Channels are loading...</p>
      </div>
    );

  return <div className="channel-list">{children}</div>;
};

export default function TeamChannelList() {
  const { user } = useContext(AuthContext);

  const filters = {
    type: 'team',
    members: { $in: [(user as UserInterface)._id] },
  };

  return (
    <Container>
      <h2>Channels</h2>
      <ChannelList
        filters={filters}
        List={listProps => <ListContainer {...listProps} />}
        Preview={previewProps => <ChannelListItemPreview {...previewProps} />}
      />
    </Container>
  );
}
