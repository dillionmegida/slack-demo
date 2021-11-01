import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';
import UserInterface from 'src/interfaces/UserInterface';
import { ChannelList, useChatContext } from 'stream-chat-react';
import styled from 'styled-components';
import ChannelListItemPreview from './ChannelListItemPreview';
import ChannelListContainer from './ListContainer';

const Container = styled.div`
  header {
    height: 50px;
    margin-bottom: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #404040;

    h2 {
      color: white;
      margin: 0;
      font-size: 16px;
    }
  }

  h3 {
    margin: 0;
    font-size: 15px;
    color: #ccc;
    padding: 0 20px;
    margin-bottom: 10px;
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

  const { client } = useChatContext();

  const filters = {
    type: 'team',
    members: { $in: [(user as UserInterface)._id] },
  };

  return (
    <Container>
      <section>
        <header>
          <h2>slack-demo</h2>
        </header>
        <h3>Channels</h3>
        <ChannelList
          filters={filters}
          List={listProps => <ChannelListContainer {...listProps} />}
          Preview={previewProps => <ChannelListItemPreview {...previewProps} />}
        />
      </section>
    </Container>
  );
}
