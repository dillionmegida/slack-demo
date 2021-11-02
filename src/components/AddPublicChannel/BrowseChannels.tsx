import { useContext, useEffect, useState } from 'react';
import AppContext from 'src/contexts/AppContext';
import { setStorageItem } from 'src/utils/storage';
import { Channel } from 'stream-chat';
import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';
import ChannelItem from './ChannelItem';

const Container = styled.div`
  h3 {
    color: #ccc;
  }

  .loading-text {
    color: #ccc;
    font-size: 14px;
  }
`;

export default function BrowseChannels() {
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [channels, setChannels] = useState<Channel[]>([]);
  const { client, setActiveChannel } = useChatContext();
  const { setCreatingChannel } = useContext(AppContext);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await client.queryChannels({});
      setChannels(response.filter(c => c.type === 'team'));
      setLoadingChannels(false);
    };

    fetchChannels();
  }, []);

  const joinChannel = (id: string) => {
    const channel = channels.find(c => c.id === id);

    if (!channel) return;

    channel.addMembers([client?.user?.id as string]);

    setStorageItem('last_opened_channel', channel.id);

    setActiveChannel(channel);

    setCreatingChannel({ type: null, status: false });
  };

  return (
    <Container>
      <h3>Browse Channels to join</h3>
      {loadingChannels ? (
        <p className="loading-text">Fetching channels...</p>
      ) : (
        <ul>
          {channels.map(c => (
            <ChannelItem onJoin={joinChannel} key={c.cid} channel={c} />
          ))}
        </ul>
      )}
    </Container>
  );
}
