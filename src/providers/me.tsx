import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { UserDoc } from '@/fire/docs';
import { assertDefined } from '@/utils/assert-defined';

import { useAuth } from './auth';
import { useCollections } from './collections';

type State = UserDoc;

const useMeProvider = () => {
  const { user } = useAuth();
  assertDefined(user);

  const { usersCollection } = useCollections();

  const [state, setState] = useState<State>();

  useEffect(() => {
    usersCollection.findOne(user.uid).then(setState);
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
