import styled from 'styled-components';
import ChannelChatPreview from '../ChannelChatPreview';
import TeamChannelList from '../TeamChannelList';
import { Channel } from 'stream-chat-react';
import AppContext, { CreatingChannel } from 'src/contexts/AppContext';
import { useState } from 'react';
import CreateMessagingChannel from '../CreateMessagingChannel';
import AddPublicChannel from '../AddPublicChannel';

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

export default function ChatContainer() {
  const [creatingChannel, setCreatingChannel] = useState<CreatingChannel>({
    type: null,
    status: false,
  });

  const rightContentToRender = {
    messaging: <CreateMessagingChannel />,
    team: <AddPublicChannel />,
    null: <ChannelChatPreview />,
  };


  const activeRightContentToRender = !creatingChannel.status ? (
    <ChannelChatPreview />
  ) : (
    rightContentToRender[`${creatingChannel.type}`]
  );

  return (
    <AppContext.Provider value={{ setCreatingChannel, creatingChannel }}>
      <Container>
        <div className="left-column">
          <TeamChannelList />
        </div>
        <div className="right-column">
          <Channel>{activeRightContentToRender}</Channel>
        </div>
      </Container>
    </AppContext.Provider>
  );
}
