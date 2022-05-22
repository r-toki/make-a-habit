import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { UserDoc } from '../fire/docs';
import { usersCollection } from '../fire/root-collections';
import { assertDefined } from '../utils/assert-defined';
import { useAuth } from './auth';

type State = UserDoc;

const useMeProvider = () => {
  const { uid } = useAuth();
  assertDefined(uid);

  const [state, setState] = useState<State>();

  useEffect(() => {
    usersCollection.findOne(uid).then(setState);
  }, []);

  return state;
};

const MeContext = createContext<State | undefined>(undefined);

type MeProviderProps = { children: ReactNode };

export const MeProvider: FC<MeProviderProps> = ({ children }) => {
  const state = useMeProvider();
  if (!state) return null;
  return <MeContext.Provider value={state}>{children}</MeContext.Provider>;
};

export const useMe = () => {
  const state = useContext(MeContext);
  assertDefined(state);
  return { me: state };
};
