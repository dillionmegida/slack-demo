import { MessageList, MessageInput } from 'stream-chat-react';
import styled from 'styled-components';
import ChannelHeader from './ChannelHeader';

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

export default function ChannelChatPreview() {
  return (
    <Container>
      <ChannelHeader />
      <MessageList />
      <MessageInput />
    </Container>
  );
}
