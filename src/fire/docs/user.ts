import { FireDocument } from 'fire-hose-web';
import { collection, Timestamp } from 'firebase/firestore';

import { UsersCollection } from '../collections';
import { HabitsCollection } from '../collections/habits';

export type UserData = { name: string; createdAt: Timestamp; updatedAt: Timestamp };

export interface UserDoc extends UserData {}
export class UserDoc extends FireDocument<UserData> {
  habitsCollection = new HabitsCollection(collection(this.ref, 'habits'));

  static create(collection: UsersCollection, id: string, { name }: Pick<UserData, 'name'>) {
    const createdAt = Timestamp.now();

    return new UserDoc(
      this.makeConstructorInput(collection, id, {
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
