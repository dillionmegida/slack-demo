import styled from 'styled-components';

const ListItem = styled.button`
  background-color: #333333;
  padding: 10px;
  color: #ccc;
  border: none;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  width: 100%;
  text-align: left;

  &:hover,
  &.active {
    background-color: white;
    color: #333;
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
