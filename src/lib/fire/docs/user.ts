import { FireDocument } from '../base/fire-document';
import { UsersCollection } from '../collections';

export type UserData = { name: string };

export interface UserDoc extends UserData {}
export class UserDoc extends FireDocument<UserData> {
  static create(collection: UsersCollection, id: string, { name }: UserData) {
    return new UserDoc(this.makeCreateInput(collection, id, { name }));
  }
}
