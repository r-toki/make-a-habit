import { FireDocument } from '../base/fire-document';
import { UsersCollection } from '../collections/users';

export type UserData = { name: string };

export interface UserDoc extends UserData {}
export class UserDoc extends FireDocument<UserData> {
  static create(collection: UsersCollection, { name }: UserData) {
    return this.makeCreateInput(collection, null, { name });
  }
}
