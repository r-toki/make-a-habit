import { FireCollection } from 'fire-hose-web';
import { CollectionReference } from 'firebase/firestore';

import { UserData, UserDoc } from '../docs';

export class UsersCollection extends FireCollection<UserData, UserDoc> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => new UserDoc(snap));
  }
}
