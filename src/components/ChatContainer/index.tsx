import styled from 'styled-components';
import ChannelChatPreview from '../ChannelChatPreview';
import TeamChannelList from '../TeamChannelList';
import { Channel } from 'stream-chat-react';

const Container = styled.div`
  background-color: #333;
  height: calc(100vh - 100px);
  display: flex;

  .left-column {
    width: 300px;
    border-right: 1px solid #ccc;
    padding: 20px;
  }

  .right-column {
    flex: 1;
    padding: 20px;
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
