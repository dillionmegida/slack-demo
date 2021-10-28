import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';
import UserInterface from 'src/interfaces/UserInterface';
import { ChannelList } from 'stream-chat-react';
import styled from 'styled-components';
import ChannelListItemPreview from '../ChatContainer/ChannelListItemPreview';
import ChannelListContainer from './ListContainer';

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
        List={listProps => <ChannelListContainer {...listProps} />}
        Preview={previewProps => <ChannelListItemPreview {...previewProps} />}
      />
    </Container>
  );
}
