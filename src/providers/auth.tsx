import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { assertDefined } from '../utils/assert-defined';

type State = { initialized: boolean; uid: string | undefined };

const useAuthProvider = () => {
  const [state, setState] = useState<State>({
    initialized: false,
    uid: undefined,
  });

  useEffect(() => {
    onAuthStateChanged(getAuth(), (authUser) => {
      if (authUser) setState({ initialized: true, uid: authUser.uid });
      else setState({ initialized: true, uid: undefined });
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
