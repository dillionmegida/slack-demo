import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';
import { destroyCookie } from 'src/utils/cookies';
import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';
import { StreamUserInterface } from 'src/interfaces/UserInterface';
import MultipleImages from '../MultipleImages';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #404040;
  width: 100%;
  height: 50px;
  padding: 0 20px;

  .channel-info {
    display: flex;
    align-items: center;

    &__text {
      margin-left: 10px;
    }

    h2 {
      margin: 0;
      color: #ccc;
      font-size: 14px;
    }

    &__images {
      margin-right: 10px;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__desc {
      margin: 5px 0 0;
      color: #ccc;
      font-size: 10px;
    }
  }

  .right-column {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;

    button {
      text-decoration: underline;
      border: none;
      background: none;
      cursor: pointer;
      color: #ccc;
      margin-left: 20px;
    }
  }

  .members {
    color: #ccc;
  }
`;

export default function MessageHeader() {
  const { channel } = useChatContext();
  const { user, setUser } = useContext(AuthContext);

  const membersState = channel?.state?.members || {};
  const members: StreamUserInterface[] = [];

  for (let id in membersState) {
    members.push(membersState[id]?.user as StreamUserInterface);
  }

  const logout = () => {
    destroyCookie('AUTH');
    setUser(null);
  };

  return (
    <Header>
      {channel && (
        <div className="channel-info">
          <MultipleImages sources={members.map(m => m.image)} />
          <div className="channel-info__text">
            <h2>{channel?.data?.name}</h2>
          </div>
        </div>
      )}
      <div className="right-column">
        {channel && (
          <span className="members">{channel?.data?.member_count} members</span>
        )}
        <button onClick={logout}>Logout</button>
      </div>
    </Header>
  );
}
