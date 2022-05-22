import { CollectionReference } from 'firebase/firestore';

import { HabitData, HabitDoc } from '../docs';
import { FireCollection } from '../lib/fire-collection';

export class HabitsCollection extends FireCollection<HabitData, HabitDoc> {
  constructor(ref: CollectionReference) {
    super(ref, (snap) => new HabitDoc(snap));
  }
}
