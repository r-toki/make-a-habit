import { collection, getFirestore } from 'firebase/firestore';
import { createContext, FC, ReactNode, useContext } from 'react';

import { UsersCollection } from '@/fire/collections';
import { assertDefined } from '@/utils/assert-defined';

type State = { usersCollection: UsersCollection };

const CollectionsContext = createContext<State | undefined>(undefined);

type CollectionsProviderProps = { children: ReactNode };

export const CollectionsProvider: FC<CollectionsProviderProps> = ({ children }) => {
  const collections = { usersCollection: new UsersCollection(collection(getFirestore(), 'users')) };
  return <CollectionsContext.Provider value={collections}>{children}</CollectionsContext.Provider>;
};

export const useCollections = () => {
  const state = useContext(CollectionsContext);
  assertDefined(state);
  return state;
};
