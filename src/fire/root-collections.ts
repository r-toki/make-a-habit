import { collection } from 'firebase/firestore';

import { getDb } from '../config/firebase';
import { UsersCollection } from './collections';

export const usersCollection = new UsersCollection(collection(getDb(), 'users'));
