import { collection, getFirestore } from 'firebase/firestore';

import { UsersCollection } from './collections';

export const usersCollection = new UsersCollection(collection(getFirestore(), 'users'));
