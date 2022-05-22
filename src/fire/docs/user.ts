import { serverTimestamp, Timestamp } from 'firebase/firestore';

import { FireDocument } from '../base/fire-document';
import { UsersCollection } from '../collections';

export type UserData = { name: string; createdAt: Timestamp; updatedAt: Timestamp };

export interface UserDoc extends UserData {}
export class UserDoc extends FireDocument<UserData> {
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
