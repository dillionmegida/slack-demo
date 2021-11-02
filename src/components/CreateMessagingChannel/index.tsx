import { useContext, useEffect, useState } from 'react';
import AppContext from 'src/contexts/AppContext';
import AuthContext from 'src/contexts/AuthContext';
import { StreamUserInterface } from 'src/interfaces/UserInterface';
import { setStorageItem } from 'src/utils/storage';
import { capitalize } from 'src/utils/string';
import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';
import UserItem from './UserItem';

const Container = styled.div`
  width: 100%;
  header {
    height: 50px;
    margin-bottom: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #404040;

    h2 {
      color: white;
      margin: 0;
      font-size: 16px;
    }

    button {
      background: none;
      border: none;
      color: #ccc;
      cursor: pointer;
      font-size: 20px;
      transform: rotate(45deg);
      outline: none;
    }
  }

  .create-body {
    padding: 0 20px;

    h3 {
      color: #ccc;
    }

    .added-users {
      height: 20px;
      font-size: 14px;
      color: #ccc;
      margin-bottom: 30px;

      &__block {
        display: flex;
        align-items: center;
      }

      &__create-btn {
        border: 0;
        background-color: #ccc;
        color: #333;
        margin-left: 20px;
        padding: 5px;
        cursor: pointer;
      }
    }

    .loading-text {
      color: #ccc;
      font-size: 14px;
    }
  }
`;

export default function CreateMessagingChannel() {
  const { user } = useContext(AuthContext);
  const { setCreatingChannel } = useContext(AppContext);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [users, setUsers] = useState<StreamUserInterface[]>([]);
  const { client, setActiveChannel } = useChatContext();

  const [addedUsers, setAddedUsers] = useState<StreamUserInterface[]>([]);

  const handleAddUsers = (user: StreamUserInterface) => {
    if (addedUsers.find(addedUser => addedUser.id === user.id))
      return setAddedUsers(
        addedUsers.filter(addedUser => addedUser.id !== user.id)
      );

    setAddedUsers([...addedUsers, user]);
  };

  const cancelCreate = () => setCreatingChannel({ type: null, status: false });

  useEffect(() => {
    const getUsers = async () => {
      const response = await client.queryUsers({});

      const users = response.users.filter(
        u => u.id !== 'dillion-megida-stream' && u.id !== client?.user?.id
      );

      setUsers(users as unknown as StreamUserInterface[]);
      setLoadingUsers(false);
    };

    getUsers();
  }, []);

  const createChannel = async () => {
    const channel = client.channel('messaging', {
      name: [user?.name]
        .concat(addedUsers.map(u => capitalize(u.name)))
        .join(', '),
      members: [client?.user?.id as string, ...addedUsers.map(u => u.id)],
    });
    setStorageItem('last_opened_channel', channel.id);

    setActiveChannel(channel);

    setCreatingChannel({ type: null, status: false });
  };

  return (
    <Container>
      <header>
        <h2>Add messaging space</h2>
        <button onClick={cancelCreate}>+</button>
      </header>
      <div className="create-body">
        <h3>Add User(s)</h3>

        {loadingUsers ? (
          <p className="loading-text">Fetching users...</p>
        ) : !users.length ? (
          'No users'
        ) : (
          <>
            <div className="added-users">
              {addedUsers.length ? (
                <div className="added-users__block">
                  <div>
                    ---&gt; {addedUsers.map(u => capitalize(u.name)).join(', ')}
                  </div>
                  <button
                    className="added-users__create-btn"
                    onClick={createChannel}
                  >
                    Create
                  </button>
                </div>
              ) : (
                'No users added yet'
              )}
            </div>
            <ul>
              {users.map(u => (
                <UserItem
                  added={!!addedUsers.find(addedUser => addedUser.id === u.id)}
                  user={u}
                  handleAdd={handleAddUsers}
                  key={u.id}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </Container>
  );
}
