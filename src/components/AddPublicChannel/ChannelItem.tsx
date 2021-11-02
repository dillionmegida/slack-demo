import styled from 'styled-components';
import { ReactNode } from 'react';
import { Channel } from 'stream-chat';

const Item = styled.li`
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;

  .image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .name {
    color: #ccc;
    font-weight: bold;
  }

  .desc {
    color: #ccc;
    font-size: 14px;
    margin: 10px 20px 10px 0;
    flex: 1;
  }

  button {
    width: 70px;
    height: 40px;
    border: 1px solid #ccc;
    padding: 10px;
    color: #ccc;
    margin-left: auto;

    &:hover {
      background-color: #ccc;
      color: #333;
    }
  }
`;

type Props = {
  channel: Channel;
  onJoin: (id: string) => void;
};

export default function ChannelItem({ channel, onJoin }: Props) {
  return (
    <Item>
      <div className="image">
        <img src={channel?.data?.image as string} alt="" />
      </div>
      <div>
        <span className="name">{channel?.data?.name}</span>
        <p className="desc">
          {(channel?.data?.description || 'No description') as ReactNode}
        </p>
      </div>
      <button onClick={() => onJoin(channel?.id as string)}>Join</button>
    </Item>
  );
}
