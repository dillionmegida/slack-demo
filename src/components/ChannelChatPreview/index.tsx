import { MessageList, MessageInput } from 'stream-chat-react';
import styled from 'styled-components';
import ChannelHeader from './ChannelHeader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  position: relative;

  .chat-body {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    height: calc(100% - 50px);
    padding: 0 20px;
    overflow-y: auto;
  }

  .str-chat {
    &__list {
      width: 100%;
      height: calc(100% - 120px);
      padding: 0 20px;
      overflow-y: auto;
    }

    &__input-flat {
      position: absolute;
      bottom: 0;
      background: #333;
      padding: 0;
      left: 0;
      padding: 10px 20px;
    }

    &__message-simple__actions__action svg {
      fill: #ccc;
    }

    &__reaction-selector {
      background: #404040;
    }

    &__date-separator {
      padding: 15px 0;
      &-line {
        background: #404040;
      }
      &-date {
        color: #ccc;
      }
    }

    &__message-simple-name {
      color: #ccc;
    }

    &__message-simple-timestamp {
      color: #ccc;
    }
  }
`;

export default function ChannelChatPreview() {
  return (
    <Container>
      <ChannelHeader />
      <div className="chat-body">
        <MessageList />
        <MessageInput />
      </div>
    </Container>
  );
}
