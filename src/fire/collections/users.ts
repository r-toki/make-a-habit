import { CollectionReference } from 'firebase/firestore';

import { FireCollection } from '../base/fire-collection';
import { UserData, UserDoc } from '../docs';

export class UsersCollection extends FireCollection<UserData, UserDoc> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => new UserDoc(snap));
  }
}
