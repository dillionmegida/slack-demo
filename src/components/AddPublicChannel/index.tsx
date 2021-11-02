import { useContext, useState } from 'react';
import AppContext from 'src/contexts/AppContext';
import AuthContext from 'src/contexts/AuthContext';
import { useChatContext } from 'stream-chat-react';
import styled from 'styled-components';
import BrowseChannels from './BrowseChannels';
import CreateChannel from './CreateChannel';

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

    .tabs {
      display: flex;

      .tab {
        color: #ccc;
        padding: 15px 0;
        border-radius: 0;
        font-size: 16px;
        border-bottom: 1px solid transparent;

        &:first-child {
          margin-right: 20px;
        }

        &.active {
          border-color: #ccc;
        }
      }
    }

    .cancel-btn {
      background: none;
      border: none;
      color: #ccc;
      cursor: pointer;
      font-size: 20px;
      outline: none;
    }
  }

  .channel-body {
    padding: 0 20px;
  }
`;

const TABS = [
  { id: 'browse', name: 'Browse public channels' },
  { id: 'create', name: 'Create public channel' },
];

export default function AddPublicChannel() {
  const { user } = useContext(AuthContext);
  const { setCreatingChannel } = useContext(AppContext);
  const { client, setActiveChannel } = useChatContext();

  const [activeTab, setActiveTab] = useState(TABS[0].id);

  const cancelCreate = () => setCreatingChannel({ type: null, status: false });

  return (
    <Container>
      <header>
        <div className="tabs">
          {TABS.map(t => (
            <button
              onClick={() => setActiveTab(t.id)}
              className={`tab ${activeTab === t.id && 'active'}`}
              key={t.id}
            >
              {t.name}
            </button>
          ))}
        </div>
        <button className="cancel-btn" onClick={cancelCreate}>
          +
        </button>
      </header>
      <div className="channel-body">
        {activeTab === 'create' && <CreateChannel />}
        {activeTab === 'browse' && <BrowseChannels />}
      </div>
    </Container>
  );
}
