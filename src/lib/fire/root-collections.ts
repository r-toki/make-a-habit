import { collection, getFirestore } from 'firebase/firestore';

import { UsersCollection } from './collections/users';

export const usersCollection = new UsersCollection(collection(getFirestore(), 'users'));
