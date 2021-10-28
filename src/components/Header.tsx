import styled from 'styled-components';
import { destroyCookie } from 'src/utils/cookies';
import { useContext } from 'react';
import AuthContext from 'src/contexts/AuthContext';

const SHeader = styled.header`
  padding: 0 0 10px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav ul {
    display: flex;
    align-items: center;

    a,
    button {
      text-decoration: underline;
    }

    button {
      border: none;
      background: none;
      cursor: pointer;
    }
  }
`;

export default function Header() {
  const { user, setUser } = useContext(AuthContext);

  const logout = () => {
    destroyCookie('AUTH');
    setUser(null);
  };

  return (
    <SHeader>
      <span>Slack</span>
      {user && (
        <nav>
          <ul>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </SHeader>
  );
}
