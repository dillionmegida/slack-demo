import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';

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

export default function ChannelHeader() {
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
}
