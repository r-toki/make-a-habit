import { collection, serverTimestamp, Timestamp } from 'firebase/firestore';

import { getDb } from '../../config/firebase';
import { FireDocument } from '../base/fire-document';
import { UsersCollection } from '../collections';
import { HabitsCollection } from '../collections/habits';

export type UserData = { name: string; createdAt: Timestamp; updatedAt: Timestamp };

export interface UserDoc extends UserData {}
export class UserDoc extends FireDocument<UserData> {
  habitsCollection = new HabitsCollection(collection(getDb(), this.ref.path, 'habits'));

  static create(collection: UsersCollection, id: string, { name }: Pick<UserData, 'name'>) {
    return new UserDoc(
      this.makeCreateInput(collection, id, {
        name,
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
      })
    );
  }
}
