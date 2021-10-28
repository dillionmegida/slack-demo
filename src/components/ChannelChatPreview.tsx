import {
  MessageList,
  useChannelStateContext,
  MessageInput,
  useChatContext,
  Window,
} from 'stream-chat-react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;
  .str-chat {
    &__list {
      width: 100%;
    }

    &__input-flat {
      position: absolute;
      bottom: 0;
      background: #333;
      padding: 0;
    }

    &__date-separator {
      padding: 0 0 10px;
      &-line {
        background: #ccc;
      }
      &-date {
        color: #ccc;
      }
    }

    &__message-simple-timestamp {
      color: #ccc;
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 10px;
  width: 100%;

  h2 {
    margin: 0;
    color: #ccc;
    font-size: 20px;
  }

  .members {
    color: #ccc;
  }
`;

const ChannelChat = styled.div``;

const ChannelHeader = () => {
  const { channel } = useChatContext();

  if (!channel) return null;

  return (
    <Header>
      <h2>{channel?.data?.name}</h2>
      <div className="members">
        <span>{channel?.data?.member_count} members</span>
      </div>
    </Header>
  );
};

export default function ChannelChatPreview() {
  return (
    <Container>
      <ChannelHeader />
      <ChannelChat />
      <MessageList />
      <MessageInput />
    </Container>
  );
}
