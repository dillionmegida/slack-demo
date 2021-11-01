import { createContext } from 'react';

export type CreatingChannel = {
  status: boolean;
  type: 'messaging' | 'team' | null;
};

type ContextProps = {
  creatingChannel: CreatingChannel;
  setCreatingChannel: (obj: CreatingChannel) => void;
};

const AppContext = createContext<ContextProps>({
  creatingChannel: { status: false, type: null },
  setCreatingChannel: () => {},
});

export default AppContext;
