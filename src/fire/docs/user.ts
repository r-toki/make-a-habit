import { collection, getFirestore, Timestamp } from 'firebase/firestore';

import { UsersCollection } from '../collections';
import { HabitsCollection } from '../collections/habits';
import { FireDocument } from '../lib/fire-document';

export type UserData = { name: string; createdAt: Timestamp; updatedAt: Timestamp };

export interface UserDoc extends UserData {}
export class UserDoc extends FireDocument<UserData> {
  habitsCollection = new HabitsCollection(collection(getFirestore(), this.ref.path, 'habits'));

  static create(collection: UsersCollection, id: string, { name }: Pick<UserData, 'name'>) {
    const createdAt = Timestamp.now();

    return new UserDoc(
      this.makeCreateInput(collection, id, {
        name,
        createdAt,
        updatedAt: createdAt,
      })
    );
  }

  rebuild() {
    return new UserDoc({ id: this.id, ref: this.ref, data: () => this.data });
  }
}
