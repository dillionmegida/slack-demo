import { useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import AuthContext from 'src/contexts/AuthContext';
import UserInterface from 'src/interfaces/UserInterface';
import connectUser from 'src/queries/connectUser';

import { StreamChat } from 'stream-chat';
import {
  ChannelList,
  Chat,
  Window,
  Channel,
  ChannelHeader,
} from 'stream-chat-react';

const API_KEY = process.env.REACT_APP_STREAM_API_KEY as string;

export default function Homepage() {
  const { user } = useContext(AuthContext);
  const [chatClient, setChatClient] = useState<any>(null);

  const filters = {
    type: 'team',
    members: { $in: [(user as UserInterface)._id] },
  };

  useEffect(() => {
    const initChat = async () => {
      if (!user) return;

      const client = new StreamChat(API_KEY);

      const res = await connectUser(user._id);

      if (res.status === 'error') return toast.error(res.message);

      client.connectUser(
        {
          id: user._id,
          name: user.name,
          image: user.image,
        },
        res.token
      );

      setChatClient(client);

      // add user to general channel
      client
        .channel('team', 'general', {
          name: 'General',
          image: 'https://dillionmegida.com/img/deee.jpg',
        })
        .addMembers([user._id]);
    };

    initChat();

    return () => {
      chatClient.disconnectUser();
    };
  }, [user]);

  if (!chatClient) return null;

  return (
    <div>
      <Chat client={chatClient}>
        <ChannelList filters={filters} />
        <Channel>
          <Window>
            <ChannelHeader />
          </Window>
        </Channel>
      </Chat>
    </div>
  );
}
