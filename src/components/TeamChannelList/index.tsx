import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';
import UserInterface from 'src/interfaces/UserInterface';
import { ChannelList } from 'stream-chat-react';
import styled from 'styled-components';
import ChannelListItemPreview from './ChannelListItemPreview';
import ChannelListContainer from './ChannelListContainer';
import AppContext from 'src/contexts/AppContext';
import MessageListItemPreview from './MessageListItemPreview';
import { Channel } from 'stream-chat';

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

  .list-block {
    margin-bottom: 20px;

    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      justify-content: space-between;
      h3 {
        margin: 0;
        font-size: 15px;
        color: #ccc;
        padding: 0 20px;
      }

      button {
        background: none;
        border: none;
        color: #ccc;
        cursor: pointer;
        font-size: 20px;
        margin-right: 10px;
      }
    }
  }

  .str-chat {
    height: max-content;
    &.str-chat-channel-list {
      float: none;
    }
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
  const { creatingChannel, setCreatingChannel } = useContext(AppContext);

  const teamFilters = {
    members: { $in: [(user as UserInterface)._id] },
  };

  const customTeamFilter = (channels: Channel[]) => {
    return channels.filter(f => f.type === 'team');
  };

  const messageFilters = {
    members: { $in: [(user as UserInterface)._id] },
  };

  const customMessagingFilter = (channels: Channel[]) => {
    return channels.filter(f => f.type === 'messaging');
  };

  const addChannel = (type: 'messaging' | 'team') => {
    if (creatingChannel.type !== type)
      setCreatingChannel({ type, status: true });
  };

  return (
    <Container>
      <section>
        <header>
          <h2>slack-demo</h2>
        </header>
        <div className="list-block">
          <div className="list-block__header">
            <h3>Channels</h3>
            <button onClick={() => addChannel('team')}>+</button>
          </div>
          <ChannelList
            filters={teamFilters}
            channelRenderFilterFn={customTeamFilter}
            List={listProps => (
              <ChannelListContainer type="team" {...listProps} />
            )}
            Preview={previewProps => (
              <ChannelListItemPreview {...previewProps} />
            )}
          />
        </div>
        <div className="list-block">
          <div className="list-block__header">
            <h3>Direct Messages</h3>
            <button onClick={() => addChannel('messaging')}>+</button>
          </div>
          <ChannelList
            filters={messageFilters}
            channelRenderFilterFn={customMessagingFilter}
            List={listProps => (
              <ChannelListContainer type="messaging" {...listProps} />
            )}
            Preview={previewProps => (
              <MessageListItemPreview {...previewProps} />
            )}
          />
        </div>
      </section>
    </Container>
  );
}
