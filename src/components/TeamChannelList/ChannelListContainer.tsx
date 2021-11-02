import { getStorageItem } from 'src/utils/storage';
import { ChannelListMessengerProps, useChatContext } from 'stream-chat-react';
import styled from 'styled-components';

const Container = styled.div`
  .loading-text,
  .no-messages-text {
    padding: 0 20px;
    font-size: 14px;
  }

  .loading-text {
    color: #ccc;
  }

  .no-messages-text {
    color: #999;
  }
`;

type Props = {
  type: 'messaging' | 'team';
  children?: any;
};

export default function ListContainer({
  loading,
  children,
  type,
}: Pick<ChannelListMessengerProps, 'loading'> & Props) {
  const { setActiveChannel, client } = useChatContext();

  const activeChannels = client.activeChannels;

  const lastOpenedChannel = getStorageItem('last_opened_channel');

  for (let cid in activeChannels) {
    const channel = activeChannels[cid];
    if (channel.id === lastOpenedChannel) {
      setActiveChannel(channel);
      break;
    }
  }

  const loadingText =
    type === 'messaging' ? 'Loading messages...' : 'Loading team channels...';

  const listItems = children?.props?.children ?? (
    <p className="no-messages-text">No messages</p>
  );

  return (
    <Container>
      {loading ? <div className="loading-text">{loadingText}</div> : listItems}
    </Container>
  );
}
