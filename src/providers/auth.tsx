import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { assertDefined } from '../utils/assert-defined';

type State = { initialized: boolean; user: User | undefined };

const useAuthProvider = () => {
  const [state, setState] = useState<State>({
    initialized: false,
    user: undefined,
  });

  useEffect(() => {
    onAuthStateChanged(getAuth(), (authUser) => {
      if (authUser) setState({ initialized: true, user: authUser });
      else setState({ initialized: true, user: undefined });
    });
  }, []);

  return state;
};

const AuthContext = createContext<State | undefined>(undefined);

type AuthProviderProps = { children: ReactNode };

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const state = useAuthProvider();
  if (!state.initialized) return null;
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const state = useContext(AuthContext);
  assertDefined(state);
  return state;
};
