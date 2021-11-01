import styled from 'styled-components';

const ListItem = styled.button`
  background-color: #333333;
  padding: 10px 20px;
  color: #ccc;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: 0;

  &:hover,
  &.active {
    background-color: #404040;
  }

  &.active {
    color: white;
    font-weight: bold;
  }
`;

export default function ChannelListItemPreview(props: any) {
  const { channel, setActiveChannel, activeChannel } = props;

  return (
    <ListItem
      className={activeChannel.cid === channel.cid ? 'active' : ''}
      onClick={() => setActiveChannel(channel)}
    >
      # {channel?.data?.id}
    </ListItem>
  );
}
