import { StreamUserInterface } from 'src/interfaces/UserInterface';
import { setStorageItem } from 'src/utils/storage';
import styled from 'styled-components';
import MultipleImages from '../MultipleImages';

const ListItem = styled.button`
  background-color: #333333;
  padding: 0 20px;
  color: #ccc;
  border: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
  border-radius: 0;
  display: flex;
  align-items: center;

  &:hover,
  &.active {
    background-color: #404040;
  }

  &.active {
    color: white;
    font-weight: bold;
  }

  .name {
    margin-left: 10px;
  }
`;

export default function MessageListItemPreview(props: any) {
  const { channel, setActiveChannel, activeChannel } = props;

  const membersState = channel?.state?.members || {};
  const members: StreamUserInterface[] = [];

  for (let id in membersState) {
    members.push(membersState[id]?.user as StreamUserInterface);
  }

  return (
    <ListItem
      className={activeChannel.cid === channel.cid ? 'active' : ''}
      onClick={() => {
        setStorageItem('last_opened_channel', channel.id);
        setActiveChannel(channel);
      }}
    >
      <MultipleImages size={20} sources={members.map(m => m.image)} />
      <span className="name">{channel?.data?.name}</span>
    </ListItem>
  );
}
