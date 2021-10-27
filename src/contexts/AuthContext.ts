import { createContext } from 'react';
import UserInterface from 'src/interfaces/UserInterface';

type ContextProps = {
  user: UserInterface | null;
  loadingUser: boolean;
  setUser: (u: UserInterface) => void;
};

const AuthContext = createContext<ContextProps>({
  user: null,
  loadingUser: false,
  setUser: () => {},
});

export default AuthContext;
