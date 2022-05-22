import { FireCollection } from '../base/fire-collection';
import { UserData, UserDoc } from '../docs/user';

export class UsersCollection extends FireCollection<UserData, UserDoc> {}
