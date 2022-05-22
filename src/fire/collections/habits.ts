import { CollectionReference } from 'firebase/firestore';

import { FireCollection } from '../base/fire-collection';
import { HabitData, HabitDoc } from '../docs';

export class HabitsCollection extends FireCollection<HabitData, HabitDoc> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => new HabitDoc(snap));
  }
}
