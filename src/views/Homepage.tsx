import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import AuthContext from 'src/contexts/AuthContext';
import getStreamToken from 'src/queries/getStreamToken';
import ChatContainer from 'src/components/ChatContainer';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

const API_KEY = process.env.REACT_APP_STREAM_API_KEY as string;

export default function Homepage() {
  const { user } = useContext(AuthContext);
  const [chatClient, setChatClient] = useState<any>(null);

  useEffect(() => {
    const initChat = async () => {
      if (!user) return;

      const client = new StreamChat(API_KEY);

      const res = await getStreamToken(user._id);

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

      // add user to general and random channel
      const generalChannel = client.channel('team', 'general', {
        name: 'General',
        image: 'https://dillionmegida.com/img/deee.jpg',
      });
      const randomChannel = client.channel('team', 'random', {
        name: 'Random',
        image:
          'https://i.picsum.photos/id/195/200/300.jpg?hmac=4jGQkshsI0i2q2zt0L5AnB3c8yyqVBkmkYR0zDKIpRQ',
      });

      generalChannel.create();
      generalChannel.addMembers([user._id]);

      randomChannel.create();
      randomChannel.addMembers([user._id]);
    };

    initChat();

    return () => {
      chatClient?.disconnectUser();
    };
  }, [user]);

  if (!chatClient) return null;

  return (
    <Chat client={chatClient} theme="">
      <ChatContainer />
    </Chat>
  );
}
