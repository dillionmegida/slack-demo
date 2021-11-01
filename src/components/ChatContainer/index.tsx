import styled from 'styled-components';
import ChannelChatPreview from '../ChannelChatPreview';
import TeamChannelList from '../TeamChannelList';
import { Channel } from 'stream-chat-react';

const Container = styled.div`
  background-color: #333;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;

  .left-column {
    width: 300px;
    border-right: 1px solid #ccc;
  }

  .right-column {
    flex: 1;
    height: 100%;

    .str-chat {
      height: 100%;
    }
  }
`;

export default function ChannelContainer() {
  return (
    <Container>
      <div className="left-column">
        <TeamChannelList />
      </div>
      <div className="right-column">
        <Channel>
          <ChannelChatPreview />
        </Channel>
      </div>
    </Container>
  );
}
